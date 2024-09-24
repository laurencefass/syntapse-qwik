import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

type Message = {
    id: string;
    text: string;
};

const isServer = typeof global !== "undefined";
let serverState: any;

if (isServer) {
    const nodeGlobal = (global as any);
    nodeGlobal.serverState = nodeGlobal.serverState || {
        messages: [] as Message[],
        listeners: [],
    };
    serverState = nodeGlobal.serverState;
}

const streamMessages = server$(async function* (clientId: string) {
    while (serverState.listeners.includes(clientId)) {
        if (serverState.messages && serverState.messages?.length > 0) {
            yield serverState.messages;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
});

const submitMessage = server$((message: Message) => {
    if (!Array.isArray(serverState.messages)) {
        serverState.messages = [];
    }

    if (serverState.messages.length >= 10) {
        serverState.messages.shift();
    }
    serverState.messages.push(message);
});

const subscribe = server$((clientId: string) => {
    if (!serverState.listeners.includes(clientId)) {
        serverState.listeners.push(clientId);
    }
});

const unsubscribe = server$((clientId: string) => {
    serverState.listeners = serverState.listeners.filter((id: string) => id !== clientId);
});

export const StreamMessage = component$(() => {
    const generateClientId = () => `${Date.now()}_${Math.random().toString(36).substring(2)}`;
    const clientId = useSignal(generateClientId());
    const messageInput = useSignal('');
    const receivedMessages = useSignal<Message[]>([]);
    const isSubscribed = useSignal(false);

    useVisibleTask$(async ({ track }) => {
        track(() => isSubscribed.value);

        if (isSubscribed.value) {
            await subscribe(clientId.value);
            const response = await streamMessages(clientId.value);
            for await (const messages of response) {
                receivedMessages.value = messages;
            }
        } else {
            await unsubscribe(clientId.value);
        }
    });

    return (
        <div id="stream-message" class="bordered">
            <h4>Realtime cross-client messaging system using qwik + generators no websockets</h4>
            <div>
                <input
                    type="text"
                    bind:value={messageInput}
                    placeholder="Enter a message"
                />
                <button
                    onClick$={async () => {
                        const newMessage: Message = { id: clientId.value, text: messageInput.value };
                        await submitMessage(newMessage);
                        messageInput.value = '';
                    }}
                >
                    Send Message
                </button>
                <button
                    onClick$={() => {
                        isSubscribed.value = true;
                    }}
                >
                    Subscribe
                </button>
                <button
                    onClick$={() => {
                        isSubscribed.value = false;
                    }}
                >
                    Unsubscribe
                </button>

                <div class="bordered messages">
                    {receivedMessages.value?.reverse().map((msg, index) => (
                        <div class={`message ${msg.id === clientId.value ? "self" : "other"}`} key={index}>
                            <strong>{msg.id === clientId.value ? "You" : "Other"}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

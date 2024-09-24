import { component$, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

const isServer = typeof global !== "undefined";
let serverState: any;

if (isServer) {
    const nodeGlobal = (global as any);
    nodeGlobal.serverState = nodeGlobal.serverState || {
        randomValue: 0,
        handle: null,
        listeners: [],
    };
    serverState = nodeGlobal.serverState;
    console.log("node global object", nodeGlobal);
}

const isListener = (clientId: string) => {
    return serverState.listeners.includes(clientId);
}

const streamRandom = server$(async function* (clientId: string) {
    while (serverState.handle && isListener(clientId)) {
        yield serverState.randomValue;
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
});

const startStream = server$(() => {
    if (!serverState.handle) {
        serverState.handle = setInterval(() => {
            serverState.randomValue = Math.floor(Math.random() * 1000);
            console.log("New random value:", serverState.randomValue);
        }, 1000);
    }
});

const stopStream = server$(() => {
    if (serverState.handle) {
        clearInterval(serverState.handle);
        serverState.handle = null;
    }
});

const subscribe = server$((clientId: string) => {
    if (!serverState.listeners) {
        serverState.listeners = [];
    }
    if (!serverState.listeners.includes(clientId)) {
        serverState.listeners.push(clientId);
        console.log(`Client ${clientId} subscribed`);
    }
});

const unsubscribe = server$((clientId: string) => {
    if (!serverState.listeners) {
        serverState.listeners = [];
    }
    serverState.listeners = serverState.listeners.filter((id: string) => id !== clientId);
    console.log(`Client ${clientId} unsubscribed`);
});

export const StreamSubcribe = component$(() => {
    const generateClientId = () => `${Date.now()}_${Math.random().toString(36).substring(2)}`;

    const randomNumber = useSignal('');
    const isStreaming = useSignal(false);
    const isSubscribed = useSignal(false);
    const clientId = useSignal(generateClientId());

    useTask$(async ({ track }) => {
        track(() => isStreaming.value);
        console.log("useTask$ called");
    });

    useVisibleTask$(async ({ track }) => {
        track(() => isStreaming.value);
        track(() => isSubscribed.value);
        console.log("useVisibleTask$ called", isStreaming.value, isSubscribed.value);

        if (isSubscribed.value) {
            await subscribe(clientId.value);
        } else {
            await unsubscribe(clientId.value);
        }

        if (isStreaming.value) {
            const response = await streamRandom(clientId.value);
            for await (const value of response) {
                console.log("Received value:", value);
                randomNumber.value = String(value);
            }
        } else {
            randomNumber.value = '';
        }
    });

    return (
        <div id="stream-subsribe" class="bordered">
            <h4>Basic cross-device pub/sub feature with no websockets!</h4>
            <div>Using server-side TS generators to create a stream of numbers with server state to manage listeners on the stream</div>
            <div>
                <button
                    onClick$={async () => {
                        await startStream();
                        isStreaming.value = true;
                    }}
                >
                    Start Streaming
                </button>
                <button
                    onClick$={async () => {
                        await stopStream();
                        isStreaming.value = false;
                    }}
                >
                    Stop Streaming
                </button>
                {isStreaming.value === true && <>
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
                </>}
                <h4>Random Number: {randomNumber.value}</h4>
            </div>
        </div>
    );
});

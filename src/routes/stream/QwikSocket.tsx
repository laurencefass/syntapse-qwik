import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

let rooms: { [key: string]: string[] } = {};

// Emit message to a specific room
const emit = server$((room: string, message: string) => {
    if (!rooms[room]) {
        rooms[room] = [];
    }
    rooms[room].push(message);
});

// Listen for messages in a specific room
const on = server$(async function* (room: string) {
    let lastMessageIndex = 0;
    while (true) {
        if (rooms[room] && lastMessageIndex < rooms[room].length) {
            yield rooms[room].slice(lastMessageIndex);
            lastMessageIndex = rooms[room].length;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
});

export const QwikSocket = component$(() => {
    const messageInput = useSignal('');
    const receivedMessages = useSignal<string[]>([]);
    const currentRoom = useSignal('room1');  // Start in room1 by default
    const activeRoom = useSignal(''); // Track the active room
    const subscriptionActive = useSignal(false); // Track active subscription

    const subscribeToRoom = $(async (room: string) => {
        if (activeRoom.value === room && subscriptionActive.value) return;  // Avoid resubscription to the same room
        subscriptionActive.value = true; // Mark the subscription as active
        activeRoom.value = room;  // Track the active room

        receivedMessages.value = [];  // Reset messages when switching rooms

        const response = await on(room);
        for await (const newMessages of response) {
            if (activeRoom.value !== room) {
                subscriptionActive.value = false; // Stop subscription for inactive room
                return;  // Stop processing if room has changed
            }
            receivedMessages.value = [...receivedMessages.value, ...newMessages];
        }
    });

    useVisibleTask$(({ track }) => {
        track(() => currentRoom.value);
        subscribeToRoom(currentRoom.value);
    });

    return (
        <div>
            <h4>Current Room: {currentRoom.value}</h4>
            <input
                type="text"
                bind:value={messageInput}
                placeholder="Type your message"
            />
            <button
                onClick$={async () => {
                    await emit(currentRoom.value, messageInput.value);
                    messageInput.value = '';
                }}
            >
                Send Message
            </button>
            <button
                onClick$={() => {
                    currentRoom.value = 'room1';  // Join Room 1
                }}
            >
                Join Room 1
            </button>
            <button
                onClick$={() => {
                    currentRoom.value = 'room2';  // Join Room 2
                }}
            >
                Join Room 2
            </button>
            <ul>
                {receivedMessages.value.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
});

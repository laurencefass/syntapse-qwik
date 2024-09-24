import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

const isServer = typeof global !== "undefined";
let serverState: any;

if (isServer) {
    const nodeGlobal = (global as any);
    nodeGlobal.serverState = nodeGlobal.serverState || {
        randomValue: 0,
        handle: null,
    };
    serverState = nodeGlobal.serverState;
    console.log("node global object", nodeGlobal);
}

const streamRandom = server$(async function* () {
    while (serverState.handle) {
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

export const StreamRandom = component$(() => {
    const randomNumber = useSignal('');

    return (
        <div id="stream-random" class="bordered">
            <h4>Stream Random Numbers Synchronized Across Clients</h4>
            <div>This page is using generators to subscribe to a random value generated on the server. All connected clients will be sync'd to this value</div>
            <div>
                <button
                    onClick$={async () => {
                        await startStream();
                        const response = await streamRandom();
                        for await (const value of response) {
                            randomNumber.value = `${value}`;
                        }
                    }}
                >
                    Start Streaming
                </button>
                <button
                    onClick$={async () => {
                        await stopStream();
                    }}
                >
                    Stop Streaming
                </button>
                <h4>Random Number: {randomNumber.value}</h4>
            </div>
        </div>
    );
});

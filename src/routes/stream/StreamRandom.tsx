import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

const isServer = typeof global !== "undefined";
var serverState: any;

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
    console.log("startStream");
    if (!serverState.handle) {
        console.log("startStream - setting interval");
        serverState.handle = setInterval(() => {
            serverState.randomValue = Math.floor(Math.random() * 1000);
        }, 1000);
    }
});

const stopStream = server$(() => {
    console.log("startStream");
    if (serverState.handle) {
        console.log("startStream - clearing interval");
        clearInterval(serverState.handle);
        serverState.handle = null;
    }
});

export const StreamRandom = component$(() => {
    const randomNumber = useSignal('');

    return (
        <div class="bordered">
            <h4>Qwik can stream data indefinitely AND play/pause directly on the server!</h4>
            <div>
                <button
                    onClick$={async () => {
                        await startStream();
                        const response = await streamRandom();
                        console.log("response", response);
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
                <h4>random number: {randomNumber.value}</h4>
            </div>
        </div>
    );
});

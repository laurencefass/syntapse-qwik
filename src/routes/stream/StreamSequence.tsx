import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

// colocated server functions
const streamSequence = server$(
    async function* () {
        const array = [...Array(50).keys()];
        for (const value of array) {
            yield value;
            await new Promise((resolve) => {
                setTimeout(resolve, 100);
            });
        }
    }
);

export const StreamSequence = component$(() => {
    const message = useSignal('');
    return <div id="stream-sequence" class="bordered">
        <h4>Sequence generator</h4>
        <div>Basic demonstration of Qwik's streaming capabilities. Each number is being transmitted asynchronously by the server</div>
        <button
            onClick$={async () => {
                message.value = '';
                const response = await streamSequence();
                for await (const value of response) {
                    message.value += ` ${value}`;
                }
            }}
        >
            Stream Sequence
        </button>
        <h4>async sequence: {message.value}</h4>
    </div>
});
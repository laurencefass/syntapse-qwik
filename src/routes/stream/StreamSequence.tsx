import { component$, useSignal } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

// colocated server functions
const streamSequence = server$(
    async function* () {
        const array = [...Array(100).keys()];
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
    return <div class="bordered">
        <h4>Sequence generator</h4>
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
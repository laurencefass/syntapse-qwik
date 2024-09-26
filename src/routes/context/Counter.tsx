import { component$, useSignal } from '@builder.io/qwik';

export const CounterWidget = component$(() => {
    const count = useSignal(0);

    return (
        <div>
            <button onClick$={() => count.value--}>Decrement</button>
            <button onClick$={() => count.value++}>Increment</button>
            <h1>{count.value}</h1>
        </div>
    );
});
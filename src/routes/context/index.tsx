import { component$ } from "@builder.io/qwik";
import { CounterWidget } from "./Counter";

export default component$(() => {
    return (
        <div>
            <h2>Context demo</h2>
            <CounterWidget />
        </div>
    );
});

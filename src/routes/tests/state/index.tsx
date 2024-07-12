import {
  component$,
  useComputed$,
  useSignal,
  useStore,
  useTask$,
  // useVisibleTask$,
} from "@builder.io/qwik";

import { isServer } from '@builder.io/qwik/build';

type Counter = {
  count: number;
};

export default component$(() => {
  const counterStore = useStore<Counter>({ count: 0 });
  const name = useSignal('Qwik');
  const capitalizedName = useComputed$(() => {
    console.log("Parent.useComputed", name.value);
    return name.value.toUpperCase();
  });


  useTask$(() => {
    console.log("useTask: runs on server");
    if (isServer) return;
    console.log("useTask: runs on client?");
  });

  useTask$(async ({track}) => {
    track(() => name.value);
    console.log("useTask.track.name", name.value);
  });

  useTask$(async ({track, cleanup}) => {
    track(() => counterStore.count);
    console.log("useTask.track.count", counterStore.count);
    cleanup(() => console.log("useTask.cleanup.count"));
  });

//   useComputed$(async () => {
//     console.log("Parent.useComputed", counterStore.count);
//   });

  // eslint-disable-next-line qwik/no-use-visible-task
//   useVisibleTask$(() => {
//     console.log("useVisibleTask", counterStore.count);
//   });

  return (
    <div>
      <h2>Signal props passing example</h2>
      <p>
        This demo passes a signal to a child component which updates its value
      </p>
      <h3>Parent Component</h3>
      <p>Counter: {counterStore.count}</p>
      <p>Name: {name.value}</p>
      <p>Capitalized name: {capitalizedName.value}</p>
      <Increment counterStore={counterStore} />
      <Text name={name} />
    </div>
  );
});

type IncrementComponentProps = {
  counterStore: Counter;
};

const Increment = component$(({ counterStore }: IncrementComponentProps) => {
  return (
    <div>
      <h3>Increment a Counter</h3>
      <p>
        <button onClick$={() => counterStore.count++}>Increment</button>
      </p>
    </div>
  );
});

type TextComponentProps = {
    name: { value: string };
  };

const Text =  component$(({ name }: TextComponentProps) => {
    return (
      <div>
        <h3>Change some text</h3>
        <p>
            <input type="text" bind:value={name} />
        </p>
      </div>
    );
  });
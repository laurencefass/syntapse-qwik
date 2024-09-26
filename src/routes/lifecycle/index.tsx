import { component$, Resource, useResource$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  const count1 = useSignal(0);
  const count2 = useSignal(10);

  // When called on the server this blocks the rendering of the component until the resource is resolved
  // see https://github.com/QwikDev/qwik/issues/6914
  const resource = useResource$<number>(async ({ track }) => {
    track(() => count2.value);
    console.log('useResource entry');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('useResource exit, returning ', count2.value);
    return count2.value;
  })

  useVisibleTask$(async () => {
    console.log('useVisibleTask');
  })

  function logRender() {
    console.log("Qwik rendered the component");
    return null;
  }

  return (
    <div class="page">
      {logRender()}
      <h2>Qwik Component Lifecycle tests</h2>
      <div>
        <h4>Count1: {count1.value}</h4>
        <button onClick$={() => count1.value--}>Decrement</button>
        <button onClick$={() => count1.value++}>Increment</button>
      </div>
      <div>
        <div>Test 1</div>
        <div>Resource: <Resource
          value={resource}
          onPending={() => <>Loading...</>}
          onResolved={(resource) => <>{resource}</>}
        /></div>
        <div>Test2</div>
        <button onClick$={() => count2.value--}>Decrement</button>
        <button onClick$={() => count2.value++}>Increment</button>
      </div>
    </div>
  );
});

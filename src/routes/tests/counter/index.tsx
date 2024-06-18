import { component$, useStore } from "@builder.io/qwik";

export const Child = component$((props: { count: number, name: string }) => {
  return (
    <>
      <h3>{props.name} : {props.count} : {Math.random().toFixed(4)}</h3>
    </>
  );
});

export default component$(() => {
  const store = useStore({ a: 0, b: 0, c: 0 });

  return (
    <>
      <h1>Quick counter test</h1>
      <button onClick$={() => store.a++}>a++</button>
      <button onClick$={() => store.b++}>b++</button>
      <button onClick$={() => store.c++}>c++</button>
      <h3>store: {JSON.stringify(store)}</h3>
      <Child count={store.a} name="a"/>
      <Child count={store.b} name="b"/>
    </>
  );
});
import { component$, useSignal } from '@builder.io/qwik';
import { QFrame } from './QFrame';

export default component$(() => {
  console.log('Qwik Render');
  const count = useSignal(0);
  return (
    <QFrame>
      <div>Counter component</div>
      <button
        onClick$={() => {
          console.log('click', count.value);
          count.value++;
        }}
      >
        +1
      </button>
      Count: {count}
    </QFrame>
  );
});
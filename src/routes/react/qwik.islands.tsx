import { component$, useSignal } from '@builder.io/qwik';
import { QButton, QDisplay } from './react.islands';
 
export const Islands = component$(() => {
  console.log('Qwik Render');
  const count = useSignal(0);
  return (
    <main>
      <p>The button and the display are two separate React islands that communicate using signals</p>
      <QButton
        host:onClick$={() => {
          console.log('click', count.value);
          count.value++;
        }}
      >
        +1
      </QButton>
      <QDisplay count={count.value}></QDisplay>
    </main>
  );
});
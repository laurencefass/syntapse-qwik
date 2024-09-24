import { component$, useSignal } from '@builder.io/qwik';
import { QButton, QDisplay } from './react.islands';

export const Islands = component$(() => {
  console.log('Qwik Render');
  const count = useSignal(0);
  return (
    <div className="bordered">
      <h3>This next example is intercommunication between React Islands using signals</h3>
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
    </div>
  );
});
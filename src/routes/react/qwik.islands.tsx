import { component$, useSignal } from '@builder.io/qwik';
import { QButton, QDisplay } from './react.islands';

export const Islands = component$(() => {
  console.log('Qwik Render');
  const count = useSignal(0);
  return (
    <div class="bordered">
      <h3>This next example is intercommunication between React components (islands) using signals</h3>
      <div>The button and the display are two separate React islands that communicate using signals</div>
      <div>They can just as easily communicate with Qwik components for a seamless integration</div>
      <div>React components can be used where they are needed (i.e. integration with the ecosystem) allowing progressive adoption between frameworks</div>
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
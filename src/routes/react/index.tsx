import { component$, useSignal } from '@builder.io/qwik';
import { ReactGreeting } from './react.greeting';
import { ReactCounter } from './react.counter';
import { Islands } from './qwik.islands';
import { Tabs } from './qwik.tabs';
import { ReactSlider } from './react.slider';
 
export default component$(() => {
  const selected = useSignal(0);
  
  return (
    <main>
      <h3>This is a Qwik component which renders various React islands</h3>
      <p>This is a Qwik component. It loads 2 resumable React components!</p>
      <ReactGreeting />
      <ReactCounter />
      <p>This next example is intercommunication between React Islands using signals</p>
      <Islands />
      <p>This one uses Material UI to create tabs</p>
      <Tabs />
      <p>This re-exports a MUI Component as a Qwik component and sets eagerness to make it interactive</p>
      <ReactSlider />
    </main>
  );
});
import { component$ } from '@builder.io/qwik';
import { ReactGreeting } from './react.greeting';
import { ReactCounter } from './react.counter';
import { Islands } from './qwik.islands';
import { Tabs } from './qwik.tabs';
import { ReactSlider } from './react.slider';

export default component$(() => {
  return (
    <div class="page">
      <h2>Qwik React Integration</h2>
      <h3>Yes, Qwik can load React components!</h3>
      <h4>Unlike Next and other React meta-frameworks there is no distinction between client and server components. There are only components and interactivity is configured with an eagerness property</h4>
      <ReactGreeting />
      <ReactCounter />
      <Islands />
      <Tabs />
      <ReactSlider />
    </div>
  );
});
import { component$ } from '@builder.io/qwik';
import { ReactGreeting } from './react.greeting';
import { ReactCounter } from './react.counter';
import { Islands } from './qwik.islands';
import { Tabs } from './qwik.tabs';
import { ReactSlider } from './react.slider';
import { DocumentHead } from '@builder.io/qwik-city';

export const head: DocumentHead = () => {
  const url = `https://qwik${process.env["NODE_ENV"] === "development" ? "dev" : ""}.syntapse.co.uk`;
  return {
    title: 'Syntapse Qwik Streaming',
    links: [
      {
        rel: 'canonical',
        href: `${url}/react`,
      },
    ],
    meta: [
      {
        name: 'Qwik ♡ React',
        content: 'Qwik React allows you to use React within Qwik.',
      },
      {
        property: 'og:title',
        content: 'Qwik ♡ React',
      },
      {
        property: 'og:description',
        content: 'The advantage of using Qwik React is that you can use existing React components and libraries within Qwik.',
      },
      {
        property: 'og:image',
        content: `${url}/og/og-image.jpg?heading=Qwik React integration&subHeading=Qwik integration provides a full stack React framework`,
      },
    ],
  }
};


export default component$(() => {
  return (
    <div class="page">
      <h2>Qwik React Integration</h2>
      <h3>Yes, Qwik can load React components!</h3>
      <div>Unlike Next and other React meta-frameworks there is no clear distinction between client and server components</div>
      <div> There are only components and interactivity is configured with an eagerness property.</div>
      <div>Qwik effectively acts as a fullstack metaframework for React. You can <a target="_blank" href="https://qwik.dev/docs/integrations/react">read more</a> about how this magic works in the offical docs</div>
      <ReactGreeting />
      <ReactCounter />
      <Islands />
      <Tabs />
      <ReactSlider />
    </div>
  );
});
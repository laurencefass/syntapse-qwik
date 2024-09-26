import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { QwikLogo } from "../starter/icons/qwik";

import "./styles.scss"

// not currently used
export const useScreenWidth = () => {
  const screenWidth = useSignal(0);

  useVisibleTask$(() => {
    screenWidth.value = window.innerWidth;
    const handleResize = () => {
      screenWidth.value = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return screenWidth;
};


export const Nav = component$(() => {
  const showMenu = useSignal(false);

  const toggleShowMenu = $(() => {
    showMenu.value = showMenu.value === false ? true : false;
  });

  return (
    <>
      <a href="/" title="qwik">
        <QwikLogo height={50} width={143} />
      </a>
      <button class="trigram" onClick$={() => toggleShowMenu()}>☰</button>
      <nav class={`nav ${showMenu.value ? 'active' : ''}`}>
        <a href="/" class="link">
          Home
        </a>
        <a href="/react" class="link">
          React Integration
        </a>
        <a href="/stream" class="link">
          Streaming demo
        </a>
        <a href="/demo/flower" class="link">
          Flower Demo
        </a>
        <a href="/demo/todolist" class="link">
          Todo List Demo
        </a>
        <a href="https://qwik.dev/docs/components/overview/" target="_blank">
          Docs
        </a>
        <a
          href="https://qwik.dev/examples/introduction/hello-world/"
          target="_blank"
        >
          Examples
        </a>
        <a href="https://qwik.dev/tutorial/welcome/overview/" target="_blank">
          Tutorials
        </a>
      </nav>
    </>
  );
});

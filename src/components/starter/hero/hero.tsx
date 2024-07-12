import { component$, $ } from "@builder.io/qwik";
import styles from "./hero.module.css";
import SyntapseLogo from "../../../media/syntapse-logo-2.png?jsx";

export default component$(() => {
  const defaults = {
    spread: 360,
    ticks: 70,
    gravity: 0,
    decay: 0.95,
    startVelocity: 30,
    colors: ["006ce9", "ac7ff4", "18b6f6", "713fc2", "ffffff"],
    origin: {
      x: 0.5,
      y: 0.35,
    },
  };

  const loadConfetti = $(() => {
    return new Promise<(opts: any) => void>((resolve, reject) => {
      if ((globalThis as any).confetti) {
        return resolve((globalThis as any).confetti as any);
      }
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
      script.onload = () => resolve((globalThis as any).confetti as any);
      script.onerror = reject;
      document.head.appendChild(script);
      script.remove();
    });
  });

  const shoot = $(async () => {
    const confetti = await loadConfetti();

    function fire() {
      confetti({
        ...defaults,
        particleCount: 80,
        scalar: 1.2,
      });

      confetti({
        ...defaults,
        particleCount: 60,
        scalar: 0.75,
      });
    }

    setTimeout(fire, 0);
    setTimeout(fire, 100);
    setTimeout(fire, 200);
    setTimeout(fire, 300);
    setTimeout(fire, 400);
  });

  return (
    <div class={["container", styles.hero]}>
      <SyntapseLogo
        class={styles["hero-image"]}
        style={"max-height: 100%"}
        alt="Image thunder"
      />
      <h2>Syntapse Qwik Playground</h2>
      <h3>Resumable web apps</h3>
      <div class={styles["button-group"]}>
        <button onClick$={shoot}>Click to celebrate!</button>
        <a
          href="https://qwik.dev/docs"
          target="_blank"
          class="button button-dark"
        >
          Explore the docs
        </a>
      </div>
    </div>
  );
});

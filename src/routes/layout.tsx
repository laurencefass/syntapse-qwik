import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Footer from "../components/starter/footer/footer";

import styles from "./styles.css?inline";
import { Nav } from "~/components/nav";

import "./layout.scss"

import type { DocumentHead } from "@builder.io/qwik-city";
export const head: DocumentHead = () => {
  const url = `https://qwik${process.env["NODE_ENV"] === "development" ? "dev" : ""}.syntapse.co.uk`;

  return {
    title: 'Syntapse Qwik app',
    meta: [
      {
        name: 'Syntapse Qwik',
        content: "Qwik demo site",
      },
      {
        property: 'og:title',
        content: 'Syntapse Qwik',
      },
      {
        property: 'og:description',
        content: "Qwik demo site",
      },
      {
        property: 'og:image',
        content: `${url}/og/og-image.jpg`,
      },
    ],
  }
};


export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Nav />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});

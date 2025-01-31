import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="container container-green container-left">
    <h3>Resumability vs. Hydration</h3>
    <p>
      Hydration is the process where server-rendered HTML is converted into
      a fully interactive web application on the client side. When a user
      visits a site, the initial HTML is generated by the server and sent to
      the client. The client then downloads and executes JavaScript to
      "hydrate" the application, reattaching event listeners and
      initializing components to make the page interactive. This can be
      resource-intensive and slow, especially for large or complex
      applications, as it involves running much of the same code twice—once
      on the server and once on the client.
    </p>
    <p>
      Resumability, introduced by frameworks like Qwik, eliminates the need
      for hydration by allowing the application to "resume" from where the
      server left off. During server-side rendering, the application's state
      is serialized and embedded in the HTML. When the client loads the
      page, it picks up this state and only activates the necessary parts of
      the application, avoiding the need to reinitialize everything. This
      approach significantly reduces the amount of JavaScript that needs to
      be downloaded and executed, leading to faster load times and better
      performance.
    </p>
    <h3>Summary</h3>
    <ul>
      <li>
        <p>
            <b>Hydration</b>: Reinitializes the entire app on the client, causing performance overhead due to double execution.
        </p>
      </li>
      <li>
        <p>
        <b>Resumability</b>: Resumes from the server-rendered state,
        avoiding double execution and reducing JavaScript payload, resulting
        in faster, more efficient interactivity.
        </p>
      </li>
    </ul>
  </div>
  );
});

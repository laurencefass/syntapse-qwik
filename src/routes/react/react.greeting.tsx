/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { useEffect, useState } from "react";

// Create React component standard way
function Greeting() {
  const [value, setValue] = useState("Rendered on server. Hover to re-render on client");
  useEffect(() => {
    setValue(() => "Re-rendered on client");
  }, [])
  return <div className="bordered">
    <h3>React Greeting Component</h3>
    <p> This is a React component wrapped in qwikify$(). It loads 2 resumable React components (islands)</p>
    <h4>Qwik can render React components on server and update them on the client without lots of bootstrap code!</h4>
    <p>{value}</p>
  </div>;
}

// Convert React component to Qwik component
export const ReactGreeting = qwikify$(Greeting, { eagerness: 'hover' });
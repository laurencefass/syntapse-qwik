/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { useEffect, useState } from "react";

// Create React component standard way
function Greeting() {
  const [value, setValue] = useState("Component pre-rendered on server. Hover to re-render on client");

  useEffect(() => {
    setValue(() => "Re-rendered on client");
  }, [])

  return <div className="bordered">
    <h3>React Greeting Component</h3>
    <p> This is a React component wrapped in qwikify$(). By default it renders on the server.</p>
    <h4>Qwik can render React components on server and update them on the client without any bootstrap code!</h4>
    <div>It doesnt have server components or client components and doesnt have "use client". It can do both!</div>
    <h4 className="bordered">{value}</h4>
  </div>;
}

// Convert React component to Qwik component
export const ReactGreeting = qwikify$(Greeting, { eagerness: 'hover' });
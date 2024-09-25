/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { useEffect, useState } from 'react';

// Create React component standard way
function Counter() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState<string | undefined>("Pre-rendered on the server. Javascript not loaded. Hover to load!");

  useEffect(() => {
    console.log("Counter.useEffect");
    setValue("useEFfect ran on client - component active!");
  }, []);

  return <div className="bordered">
    <h3>Simple React Counter component</h3>
    <p>The client-side Javascript in the useEffect[] won't load until hover!</p>
    <p>The reason this works is because they component is set to load on hover. This is only one of the directives available to control the loading of React (and other) components </p>
    <button className="react" onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
    {value && <p>{value}</p>}
  </div>;
}

// Convert React component to Qwik component
export const ReactCounter = qwikify$(Counter, { eagerness: 'hover' });
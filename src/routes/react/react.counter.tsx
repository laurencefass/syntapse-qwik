/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { useEffect, useState } from 'react';

// Create React component standard way
function Counter() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState<string | undefined>(undefined);
  useEffect(() => {
    console.log("Counter.useEffect");
    setValue("useEFfect ran on client - component active!");
  }, []);
  return <div className="bordered">
    <h3>Counter component</h3>
    <p>client Javascript won't load until hover!</p>
    <button className="react" onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
    {value && <p>{value}</p>}
  </div>;
}

// Convert React component to Qwik component
export const ReactCounter = qwikify$(Counter, { eagerness: 'hover' });
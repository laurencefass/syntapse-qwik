/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { useEffect, useState } from "react";

// Create React component standard way
function Greeting() {
  const [value, setValue] = useState("Rendered on server");
  useEffect(()=>{
    setValue(()=>"Re-rendered on client");
  }, [])
  return <>
    <h3>React Greeting Component</h3>
    <p>{value}</p>
  </>;
}
 
// Convert React component to Qwik component
export const ReactGreeting = qwikify$(Greeting, { eagerness: 'hover' });
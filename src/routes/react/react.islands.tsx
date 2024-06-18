/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { useEffect, type ReactNode } from "react";

function Button({ children }: { children?: ReactNode[] }) {
  useEffect(() => {
    console.log("Button.useEffect");
  }, []);
  return <button>{children}</button>;
}

function Display({ count }: { count: number }) {
  useEffect(() => {
    console.log("Display.useEffect");
  }, []);
  return <div       
    style={{
        display: 'inline-block',
        border: '1px solid black',
        borderRadius: '10px',
        marginLeft: "10px",
        padding: '22px',
    }}>
        Count: {count}
    </div>;
}

export const QButton = qwikify$(Button);
export const QDisplay = qwikify$(Display);

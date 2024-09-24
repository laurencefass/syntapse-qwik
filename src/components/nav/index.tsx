import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../starter/icons/qwik";

const navStyle = {
  position: "fixed",
  top: "0px",
  right: "0px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "2rem",
  gap: "20px",
  background: "rgba(0, 0, 0, 0.5)",
  borderRadius: "10px"
} as any;

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.2rem",
} as any;

export const Nav = component$(() => {
  return (
    <>
      <a href="/" title="qwik">
        <QwikLogo height={50} width={143} />
      </a>
      <nav style={navStyle}>
        <a href="/" style={linkStyle}>
          Home
        </a>
        <a href="/react" style={linkStyle}>
          React Integration
        </a>
        <a href="/stream" style={linkStyle}>
          Streaming demo
        </a>
        <a href="/demo/flower" style={linkStyle}>
          Flower Demo
        </a>
        <a href="/demo/todolist" style={linkStyle}>
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

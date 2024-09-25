import { type RequestHandler } from "@builder.io/qwik-city";
import { fetchFont, ImageResponse, html } from "og-img";

export const onGet: RequestHandler = async ({ request, send }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const heading = searchParams.get("heading") || "Syntapse Qwik";
  const subHeading =
    searchParams.get("subHeading") || "Deliver instant apps that scale";

  const host = `https://qwik${process.env["NODE_ENV"] === "development" ? "dev" : ""}.syntapse.co.uk`;
  const image = `${host}/code-background.png`;

  send(
    new ImageResponse(
      html`
        <div
          style="box-sizing: border-box; display: flex; flex-direction: column; border: height: 100vh; width: 100vw"
        >
          <img
            position="absolute"
            zIndex="-1"
            top="0px"
            left="0px"
            height="100%"
            width="100%"
            src=${image}
          />
          <div
            style="z-index: 100; position: absolute; color: white; height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;"
          >
            <h1
              style="font-weight: bold; text-align: center; max-width: 60%;font-size: 5em"
            >
              ${heading}
            </h1>
            <h2
              style="font-weight: bold;  text-align: center; max-width: 60%; font-size: 2.5em"
            >
              ${subHeading}
            </h2>
          </div>
        </div>
      ` as React.ReactNode,
      {
        width: 960,
        height: 520,
        fonts: [
          {
            name: "Roboto",
            data: await fetchFont(
              "https://qwik.syntapse.co.uk/fonts/Roboto-Medium.ttf"
            ),
            weight: 700,
            style: "normal",
          },
        ],
      }
    )
  );
};

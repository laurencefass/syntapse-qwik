import type { RequestHandler } from '@builder.io/qwik-city';
import { fetchFont, ImageResponse, html } from 'og-img';
 
export const onGet: RequestHandler = async ({ send }) => {
  send(
    new ImageResponse(
      html`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: purple; height: 100%; width: 100%">
                <h1>Qwik SEO success!</h1>
                <img width="80%" height="60%" src="https://qwik.syntapse.co.uk/og-image.png" />
                <h2 style="color:white">Test 123</h2>
            </div>
      `,
      {
        width: 960,
        height: 480,
        fonts: [
          {
            name: 'Roboto',
            // Use `fs` (Node.js only) or `fetch` to read font file
            data: await fetchFont(
              'https://qwik.syntapse.co.uk/fonts/Roboto-Medium.ttf'
            ),
            weight: 400,
            style: 'normal',
          },
        ],
      }
    )
  );
};
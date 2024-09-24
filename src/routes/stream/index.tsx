import { component$ } from '@builder.io/qwik';
import { StreamSequence } from './StreamSequence';
import { StreamRandom } from './StreamRandom';
import { StreamSubcribe } from './StreamSubscribe';
import { StreamMessage } from './StreamMessage';

import "./styles.scss";

export default component$(() => {
    return (
        <div class="page">
            <div class="bordered">
                <h1>Qwik async data streaming</h1>
                <h4>Qwik can stream async data from the server to the client without SSE (server side events) and websockets!</h4>
                <h4>This is the only TS framework I know of that has this capability.</h4>
                <div>All examples derived from <a target="_blank" href="https://qwik.dev/docs/server$/#streaming-responses">Qwik server$ documentation</a>. Streams can be started and stopped using server$ generator functions colocated with components</div>
                <div class="jump-menu">
                    <div>Jump to:</div>
                    <a href="#stream-sequence">Stream Sequence</a>
                    <a href="#stream-random">Stream Random</a>
                    <a href="#stream-subsribe">Stream Subscribe</a>
                    <a href="#stream-message">Stream Message</a>
                </div>
            </div>
            <StreamSequence />
            <StreamRandom />
            <StreamSubcribe />
            <StreamMessage />
        </div>
    );
});

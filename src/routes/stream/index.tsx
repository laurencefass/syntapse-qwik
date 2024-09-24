import { component$ } from '@builder.io/qwik';
import { StreamSequence } from './StreamSequence';
import { StreamRandom } from './StreamRandom';
import { QwikSocket } from './QwikSocket';

export default component$(() => {
    return (
        <div class="page">
            <h1>Qwik data streaming examples</h1>
            <h4>Qwik can stream data from the server to the client without SSE nor sockets!</h4>
            <div>Streams can be started and stopped using server$ functions easily colocated with components</div>
            <QwikSocket />
            <StreamSequence />
            <StreamRandom />
        </div>
    );
});

import { component$, useSignal } from '@builder.io/qwik';
import { QTabs } from './react.tabs';

export const Tabs = component$(() => {
  console.log('Qwik Render');
  const selected = useSignal(0);

  return <div class="bordered">
    <QTabs
      selected={selected.value}
      onSelected$={(v) => (selected.value = v)}
    >
      <h3>
        Selected tab: {selected.value}
      </h3>
    </QTabs>
  </div>
});
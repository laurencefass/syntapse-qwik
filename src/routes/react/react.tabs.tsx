/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Box } from '@mui/material';

function ReactTabs({
  selected,
  onSelected,
  children,
}: {
  selected: number;
  onSelected: (v: number) => any;
  children?: React.ReactNode[];
}) {
  return <>
    <h3>This component loads Material ui tabs. It only loads javascript on hover</h3>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={selected}
        onChange={(e, v) => onSelected(v)}
        aria-label="basic tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      {children}
    </Box>
  </>
}

export const QTabs = qwikify$(ReactTabs, { eagerness: 'hover' });
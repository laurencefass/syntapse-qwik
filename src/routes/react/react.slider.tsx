/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { Slider } from '@mui/material';
export const ReactSlider = qwikify$<typeof Slider>(
  Slider,
  { eagerness: 'hover' }
);
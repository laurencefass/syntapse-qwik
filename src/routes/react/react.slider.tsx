/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { Slider } from '@mui/material';

export const ReactSlider = qwikify$<typeof Slider>(
  (props) => {
    return (
      <div className="bordered">
        <h3>Slider Component</h3>
        <p>This re-exports a MUI Component as a Qwik component and sets eagerness to add interactivity on hover</p>
        <Slider {...props} />
      </div>
    );
  },
  { eagerness: 'hover' }
);
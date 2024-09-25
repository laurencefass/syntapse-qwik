/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';

export const ReactSlider = qwikify$<typeof Slider>(
  (props) => {
    const [message, setMessage] = useState("Component inactive. Hover to activate");

    useEffect(() => {
      setMessage("Component is now active!");
    }, []);

    return (
      <div className="bordered">
        <h3>Slider Component</h3>
        <p>This re-exports a MUI Component as a Qwik component and sets eagerness to add interactivity on hover</p>
        <Slider {...props} />
        <h4>{message}</h4>
      </div>
    );
  },
  { eagerness: 'hover' }
);
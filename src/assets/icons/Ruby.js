import React, { forwardRef } from 'react';
import { BLACK } from '../colors';

export const Ruby = forwardRef((props, ref) => {
  return (
    <svg
      viewBox="0 0 64 80"
      ref={ref}
      {...props}
    >
      <g>
        <path 
          d="m 32,52.000023 -20,-25 10,-15 20,0 10,15 z"
          fill="none"
          stroke={BLACK}
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeDasharray="none"
          strokeOpacity="1"
        />
        <path
          d="m 37,12.000023 5,15 -10,25"
          fill="none"
          stroke={BLACK}
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeDasharray="none"
          strokeOpacity="1"
        />
        <path
          d="m 27,12.000023 -5,15 10,25"
          fill="none"
          stroke={BLACK}
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeDasharray="none"
          strokeOpacity="1"
        />
        <path
          d="m 52,27.000023 -40,0"
          fill="none"
          stroke={BLACK}
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeDasharray="none"
          strokeOpacity="1"
        />
      </g>
    </svg>
  );
});


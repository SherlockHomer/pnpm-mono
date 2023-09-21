/* eslint-disable react/prop-types */
import * as React from 'react';

export function Button(
  props = {
    onClick: () => {},
  }
) {
  return (
    <>
      <button
        style={{
          transform: 'scale(1.5)',
          marginTop: '10px',
          marginBottom: '10px',
        }}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
}
export default Button;

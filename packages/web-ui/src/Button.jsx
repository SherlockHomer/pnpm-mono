/* eslint-disable react/prop-types */
import * as React from 'react';
// https://github.com/styled-components/styled-components/issues/738
// import styled from 'styled-components/dist/styled-components.js';
import styles from './Button.module.css';

export function Button(
  props = {
    onClick: () => {},
  }
) {
  return (
    <>
      <button
        data-cy='button'
        className={`${styles.button} ${styles.button_like}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
}
export default Button;

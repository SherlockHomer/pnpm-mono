/* eslint-disable react/prop-types */
import * as React from 'react';
// https://github.com/styled-components/styled-components/issues/738
import styled from 'styled-components/dist/styled-components.js';
import styles from './Button.module.css';

const DyingButton = styled.button({
  background: 'yellowgreen',
  marginBottom: '20px',
});

export function Button(
  props = {
    onClick: () => {},
  }
) {
  return (
    <>
      <button className={`${styles.button} ${styles.button_like}`} onClick={props.onClick}>
        {props.children}
      </button>
      <DyingButton>I am dying btn from styled component</DyingButton>
    </>
  );
}
export default Button;

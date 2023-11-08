import React, { useRef, useEffect, useLayoutEffect } from 'react';

const UseEffectTest = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    console.log('useEffect is after useLayoutEffect');
    inputRef.current.value = 'another user';
  });

  useLayoutEffect(() => {
    // DOM 突变之后和浏览器绘制新更改之前同步触发
    // it fires synchronously after all DOM mutations.
    // Prefer the standard `useEffect` when possible to avoid blocking visual updates.
    //  This hook is especially useful for performing DOM measurement like scroll height, scroll width, scroll position and other style on any DOM element.
    console.log('useLayoutEffect first');
    console.log(inputRef.current.value);
  });
  return (
    <div>
      <input type='text' ref={inputRef} />
    </div>
  );
};
export default UseEffectTest;

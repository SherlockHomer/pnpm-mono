import React from 'react';
import { useFPS } from '@repo/web-lib/dist/hooks/Index';
import './fpsPanel.css';

export default function fpsPanel(): JSX.Element {
  const [fps] = useFPS();

  return (
    <div className='panel'>
      <div className='close'></div>
      <div className='content'>{fps}fps</div>
    </div>
  );
}

import { getFPS } from '../animation/fps/Index.js';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useFPS(
  initOpen?: boolean
): [number, Dispatch<SetStateAction<boolean>>] {
  const [fps, setFps] = useState<number>(60);
  const [open, toggleFps] = useState<boolean>(initOpen ?? true);

  useEffect(() => {
    if (!open) {
      return;
    }
    const closeFn = getFPS((value: number) => {
      setFps(value);
    });
    return () => {
      closeFn();
    };
  }, [open]);
  return [fps, toggleFps];
}

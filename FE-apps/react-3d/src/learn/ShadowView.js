import { useEffect, useRef } from 'react';

// Shadow dom lost click event，原生执行的话 document 会转给 Shadow
// React 下不会
function ShadowView({ children }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const host = nodeRef.current;
    //  <React.StrictMode> 导致 无法直接挂在 host 上
    const root = document.createElement('div');
    if (host) {
      const shadowRoot = root.attachShadow({ mode: 'open' });
      // 将子元素移动到 Shadow DOM 中
      [].slice.call(host.children).forEach((child) => {
        shadowRoot.appendChild(child);
      });
    }
    host.appendChild(root);
    return () => {};
  }, []);

  return <div ref={nodeRef}>{children}</div>;
}

export default ShadowView;

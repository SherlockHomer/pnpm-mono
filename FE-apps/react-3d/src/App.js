// import { tap } from '@mono/web-lib';
import { useState } from 'react';
import FpsPanel from './component/fpsPanel';
import ShadowView from './learn/ShadowView';
import logo from './logo.svg';

import './App.css';

function App() {
  const [txt, changeText] = useState('');
  return (
    <div className='App'>
      <header className='header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <main>
        <input value={txt} onChange={(e) => changeText(e.target.value)} />
        <FpsPanel />
        <ShadowView>
          <div
            onClick={() => {
              console.log('shadow');
            }}
          >
            {txt}
          </div>
        </ShadowView>
      </main>
    </div>
  );
}

export default App;

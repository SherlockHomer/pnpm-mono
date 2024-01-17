// import { tap } from '@mono/web-lib';
import FpsPanel from './component/fpsPanel';
import EarthAndMoon from './component/animation/earthAndMoon';
import logo from './logo.svg';

import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <main>
        <FpsPanel />
        <EarthAndMoon />
      </main>
    </div>
  );
}

export default App;

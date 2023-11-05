import { Button } from '@mono/web-ui';
import tap from '@mono/web-lib';
import ShadowView from './learn/ShadowView';
import logo from './logo.svg';

import './App.css';
function App() {
  return (
    <div
      className='App'
      onClick={() => {
        console.log('app click');
      }}
    >
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div>I am {tap('from web-lib')}</div>
        <Button>I like using compose in dev! Huzzha!!!</Button>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <ShadowView>
          <h2
            onClick={() => {
              console.log('shadow dom inner click');
            }}
          >
            shadow dom
          </h2>
        </ShadowView>
      </header>
    </div>
  );
}

export default App;

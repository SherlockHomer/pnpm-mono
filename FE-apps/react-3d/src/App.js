import { Button } from '@mono/web-ui';
import tap from '@mono/web-lib';
import logo from './logo.svg';

import './App.css';
function App() {
  return (
    <div className='App'>
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
      </header>
    </div>
  );
}

export default App;

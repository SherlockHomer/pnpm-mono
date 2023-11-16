import { Button } from '@mono/web-ui';
import tap from '@mono/web-lib';
import ShadowView from './learn/ShadowView';
import UseEffectTest from './learn/UseEffectTest';
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
      <header className='header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <div className='mobile-test'>
        <div>I am div, font-size inherited from body.</div>
        <div className='remDiv'>
          I am using rem unit, it&apos;s inhreted from html
        </div>
        <div className='remBlock'></div>
      </div>
      <section className='App-header'>
        <div>I am {tap('from web-lib')}</div>
        <Button>I like using compose in dev! Huzzha!!!</Button>
        <UseEffectTest />
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
      </section>
    </div>
  );
}

export default App;

import { useState, useCallback, useEffect } from 'react';
import Wallet from './components/wallet/index';
import { initWeb3 } from './lib/web3/index';
import {
  INIT,
  NONE_WALLET,
  PENDING,
  REJECTED,
  CONNECTED,
} from './lib/web3/constant/walletStatus';
import logo from './logo.svg';
import './App.css';

function App() {
  let [web3Status, setWeb3] = useState(INIT);

  useEffect(() => {
    auth();
  }, []);

  const formatStatus = useCallback(() => {
    switch (web3Status) {
      case INIT:
        return 'Web3 加载中';
      case REJECTED:
        return '钱包拒绝授权 😢';
      case PENDING:
        return 'Web3 申请授权钱包 👛';
      case CONNECTED:
        return 'Web3 钱包连接成功 🔗';
      case NONE_WALLET:
        return 'Web3 钱包加载失败 😭，你是不是还没下载钱包啊';
      default:
        return 'Web3 加载中';
    }
  }, [web3Status]);

  function auth () {
    initWeb3().then((status) => {
      setWeb3(status);
    });
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        {formatStatus(web3Status)}
        {web3Status === REJECTED ? (
          <button type='button' onClick={auth}>
            Auth again
          </button>
        ) : null}
      </header>
      {web3Status === CONNECTED ? <Wallet /> : null}
    </div>
  );
}

export default App;

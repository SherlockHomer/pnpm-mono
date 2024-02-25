import { ethers } from 'ethers';
import {
  NONE_WALLET,
  PENDING,
  REJECTED,
  CONNECTED,
} from './constant/walletStatus';

let provider;
let signer = null;
let walletStatus;

export function initWeb3() {
  return connectToChain()
    .then(() => {
      if (provider) {
        walletStatus = CONNECTED;
      } else {
        walletStatus = NONE_WALLET;
      }
    })
    .catch((err) => {
      if (err?.error?.code === -32002) {
        walletStatus = PENDING;
      } else if (err?.code === 'ACTION_REJECTED') {
        walletStatus = REJECTED;
      }
    })
    .then(() => {
      return walletStatus;
    });
}

async function connectToChain() {
  if (window.ethereum == null) {
    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed,
    // so they only have read-only access
    console.log('MetaMask not installed; using read-only defaults');
    provider = ethers.getDefaultProvider();
  } else {
    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    provider = new ethers.BrowserProvider(window.ethereum);

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    signer = await provider.getSigner();
  }
}

/**
 * 获取 👛 钱包状态
 *
 * @export
 */
export function getWalletStatus() {
  return walletStatus;
}

/**
 * 获取读操作模块 ethers provider
 *
 * @export
 * @returns
 */
export function getProvider() {
  return provider;
}

/**
 * 获取写操作模块 ethers signer
 *
 * @export
 */
export function getSigner() {
  return signer;
}

// Don't use cloudVp to avoid timeout
import mempoolJS from '@mempool/mempool.js';
// import axios from 'axios';
// import getUTXOs from './__mocks__/getUTXOs.js';


const getUTXOsFrom = async (address, after_txid, limit) => {
  try {
    const {
      bitcoin: { addresses },
    } = mempoolJS({
      hostname: 'mempool.space',
    });

    // commitid d875bc250de0f110830042763554200fafcb0b41 上有第二个属性
    const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address });
    if (limit) {
      return addressTxsUtxo.slice(0, limit);
    }
    return addressTxsUtxo;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getUTXOsFrom };

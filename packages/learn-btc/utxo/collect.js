import bitcoin, { Transaction } from 'bitcoinjs-lib';
import * as tinysecp from 'tiny-secp256k1';
import ecpair from 'ecpair';
import { HDNodeWallet } from 'ethers';
import { taprootTweakPrivKey } from '@scure/btc-signer';
import accounts, { getAccountByLabel } from '../config/accounts.js';
import { getUTXOsFrom } from '../util/mempool/utxo.js';
import { calculateFee } from '../util/tx.js';
bitcoin.initEccLib(tinysecp); // 一个用于比特币密钥对的库
const ECPair = ecpair.ECPairFactory(tinysecp); // ecpair 椭圆曲线密钥对

async function addDustUTXOsAndSign(network, psbt, account, inputNumber) {
  const UTXOs = await getUTXOsFrom(
    account.btcAddress,
    'f6c6ed9a6aea3db12403cd93ce030973170be09d72734ddf1e8ad5e6ea453f57',
    10
  );
  if (UTXOs.length === 0) {
    console.log(
      'no UTXOs found for: ',
      account.label,
      'in address: ',
      account.btcAddress
    );
    return;
  }
  console.log('UTXOs:', UTXOs);
  const btcWallet = HDNodeWallet.fromPhrase(
    account.mnemonic,
    '',
    `m/86'/0'/0'/0/0`
    // `m/86'/1'/0'/0/0` // for testnet
  );

  const internalPubkey = Buffer.from(btcWallet.publicKey.slice(4), 'hex');
  const privateKey = Buffer.from(btcWallet.privateKey.slice(2), 'hex');
  const tweakedPrivateKey = taprootTweakPrivKey(privateKey);
  const keypair = ECPair.fromPrivateKey(Buffer.from(tweakedPrivateKey), {
    network,
  });

  for (let index = 0; index < UTXOs.length; index++) {
    const utxo = UTXOs[index];
    // todo: check params
    const payment = bitcoin.payments.p2tr({
      address: account.btcAddress,
      // pubkey: Buffer.from(btcWallet.publicKey),
      internalPubkey, // to check
      network,
    });
    psbt.addInput({
      hash: utxo.txid,
      // index: inputNumber,
      index: utxo.vout,
      // check
      sighashType:
        Transaction.SIGHASH_SINGLE | Transaction.SIGHASH_ANYONECANPAY,
      // check
      witnessUtxo: {
        value: utxo.value,
        script: payment.output,
      },
      tapInternalKey: payment.internalPubkey,
    });
    psbt.signInput(inputNumber, keypair, [
      Transaction.SIGHASH_SINGLE | Transaction.SIGHASH_ANYONECANPAY,
    ]);
    psbt.finalizeInput(inputNumber);
  }
}
async function main() {
  // const network = bitcoin.networks.testnet;
  const network = bitcoin.networks.bitcoin; // official network
  const destination = getAccountByLabel('mj').btcAddress;

  const psbt = new bitcoin.Psbt({ network });
  const inputNumber = 0;
  // add dusts from every account
  for (let index = 0; index < accounts.length; index++) {
    let fromAccount = accounts[index];
    await addDustUTXOsAndSign(network, psbt, fromAccount, inputNumber);
  }
  console.log(psbt);
  psbt.addOutput({
    value: 546 * inputNumber - calculateFee(psbt),
    address: destination,
  });

  const tx = psbt.extractTransaction();
  console.log(tx);
  const rawTx = tx.toBuffer();
  const signedTx = rawTx.toString('hex');

  console.log('destination:', destination, signedTx);
}

main();

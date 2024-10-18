import bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { hex } from '@scure/base';
import * as btc from '@scure/btc-signer';
import mempoolJS from '@mempool/mempool.js';
import { tapTweakHash, tweakKey } from 'bitcoinjs-lib/src/payments/bip341.js';
import { schnorr } from '@noble/curves/secp256k1';
import bs58 from 'bs58';
import accounts, { getAccountByLabel } from '../../config/accounts.js';

bitcoin.initEccLib(ecc);
const ECPair = ECPairFactory(ecc);
const {
  bitcoin: { addresses, transactions },
} = mempoolJS({
  // hostname: "mempool.space",
  hostname: 'mempool-testnet.fractalbitcoin.io',
  // network: 'signet',
});

const toXOnly = (pubKey) =>
  pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);

const network = bitcoin.networks.bitcoin;

const wif = getAccountByLabel('invest btc').wif;

// 发送方密钥对，invest btc account
const fromInternalKey = ECPair.fromWIF(wif, network);
// tapScript密钥对，这个随意设置，双方知道就行，这里直接使用发送方密钥对
const tapInternalKey = ECPair.fromWIF(wif, network);
// commit接收方，reveal发送方密钥对
const leafKey = ECPair.fromWIF(wif, network);

console.log(
  'from internal key... base58',
  bs58.encode(fromInternalKey.privateKey)
);

// 1. 通过密钥拿到发送方地址
// pubkey: c74620836231d756058bebf18077552989a854c2b2b1f50213c97b0f64f62c3f
const { address: fromAddress, output } = bitcoin.payments.p2tr({
  internalPubkey: toXOnly(fromInternalKey.publicKey),
  network,
});
// 2. 获取发送方的UTXO
// const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address: fromAddress });
// const unspent = addressTxsUtxo[0];
const unspent = {
  txid: '6af0352c97e45253f79203fa3a0024e87c8386d58208119cb619f380fc58b144',
  vout: 0,
  value: 9994454,
};
console.log('unspent...', unspent);

const psbt = new bitcoin.Psbt({ network });
// 3. 构造commit输入
psbt.addInput({
  hash: unspent.txid,
  index: unspent.vout,
  witnessUtxo: {
    value: unspent.value,
    script: output,
  },
  tapInternalKey: toXOnly(tapInternalKey.publicKey),
});

const guard_fee = 5000;
const fee = 546;
// 4. 构造commit找零
psbt.addOutput({
  value: unspent.value - guard_fee - fee,
  address: fromAddress,
  tapInternalKey: toXOnly(tapInternalKey.publicKey),
});

// 5. 构造写入铭文的tapRoot的scriptTree
// const pubKey = hex.encode(leafKey.publicKey);

// const leafScriptAsm = `${hex.encode(toXOnly(leafKey.publicKey))} OP_CHECKSIG OP_0 OP_IF ${Buffer.from('ord').toString('hex')} 01 ${Buffer.from('text/plain;charset=utf-8').toString('hex')} OP_0 ${Buffer.from('Hello, guard fee!').toString('hex')} OP_ENDIF`;
const leafScriptAsm = `${hex.encode(toXOnly(leafKey.publicKey))} OP_CHECKSIG OP_0 OP_IF ${Buffer.from('cat20 fee').toString('hex')} OP_ENDIF`;
const leafScript = bitcoin.script.fromASM(leafScriptAsm);
const scriptTree = {
  output: leafScript,
};

// 6. 生成reveal消费凭证
const redeem = {
  output: leafScript,
  redeemVersion: 0xc0,
};

// 7. 生成拥有铭文的tapRoot收款地址和witness
const { address: guardFeeAddr, witness: guardFeeWitness } =
  bitcoin.payments.p2tr({
    internalPubkey: toXOnly(tapInternalKey.publicKey),
    scriptTree,
    redeem,
    network,
  });
console.log(`guardFeeAddr: ${guardFeeAddr}`);

// 8. 构造铸造铭文的output
psbt.addOutput({
  value: guard_fee,
  address: guardFeeAddr,
  tapInternalKey: toXOnly(tapInternalKey.publicKey),
  tapTree: {
    leaves: [
      {
        leafVersion: redeem.redeemVersion,
        script: redeem.output,
        depth: 0,
      },
    ],
  },
});

// 9. 对交易input进行签名
// 5f86cec916815f9730389a8c9b2851feb425e0a8bb8070fa9eb9166874e652e6
const tweakedPrivateKey1 = btc.taprootTweakPrivKey(fromInternalKey.privateKey);
console.log('tweakedPrivateKey1...', hex.encode(tweakedPrivateKey1));

const publicKey = toXOnly(fromInternalKey.publicKey);
console.log('publicKey...', publicKey);

const tweak = tapTweakHash(publicKey);
const tweakNumber = schnorr.utils.bytesToNumberBE(tweak);

// 85872fbf31bea8d365621cffa4bcaa5317b08cf6d98e1ae56e845d514ec77646
// 60396462751986359171193939973871084614663875595881269682890002775429104498246n
// 111545578546853187831167941068473045852421314639163116074231878411944144571813n
console.log('tweak...', tweak.toString('hex'), tweakNumber);

// 47454415993620428488272623094353124491550206837795218198974365723982423787138n
// const seckey = fromInternalKey.privateKey;

// for normal utxo
const tweakKeypair = fromInternalKey.tweak(tweak);
console.log('tweakKeypair...', hex.encode(tweakKeypair.privateKey));

// const tweakedPrivateKey = ecc.privateAdd(fromInternalKey.privateKey, tweak);
// console.log('tweakedPrivateKey...', hex.encode(tweakedPrivateKey));

const fromKeypair = tweakKeypair;
// const fromKeypair = ECPair.fromPrivateKey(Buffer.from(tweakedPrivateKey), { network });
console.log(
  'fromKeypair.privateKey base58:',
  bs58.encode(fromKeypair.privateKey)
);

// bitcoin.payments.p2tr({
//   internalPubkey: toXOnly(tweakKeypair.publicKey),
//   network,
// }).address;
// publicKey: 03c74620836231d756058bebf18077552989a854c2b2b1f50213c97b0f64f62c3f
// bc1p3e9jwwhxe56ndxfka7gc02920k0p68957cfey8x0wfkrfeky8p7q99vded
// todo: why fromKeypair
psbt.signInput(0, fromKeypair);
psbt.finalizeInput(0);
const tx = psbt.extractTransaction();
const rawTx = tx.toBuffer();
const txHex = rawTx.toString('hex');
console.log(tx, txHex);

// 10. 广播txHex拿到txid：
// 95afc5d7450bff8c5f1c9d37425adbe738436486ba6c5741e75c421469b9853b
// const txid = await transactions.postTx({ txHex });
// console.log(txid);
const txid = '95afc5d7450bff8c5f1c9d37425adbe738436486ba6c5741e75c421469b9853b';

// todo: how to get internalPubkey here
const { output: guardFeeOutput, internalPubkey: guardFeeInternalPubkey } =
  bitcoin.payments.p2tr({
    address: guardFeeAddr,
    network,
  });
// 11. 创建reveal交易
const guard_commit_psbt = new bitcoin.Psbt({ network });
guard_commit_psbt.addInput({
  hash: txid,
  index: 1,
  witnessUtxo: {
    value: guard_fee,
    script: guardFeeOutput,
  },
  tapLeafScript: [
    {
      leafVersion: redeem.redeemVersion,
      script: redeem.output,
      controlBlock: guardFeeWitness[guardFeeWitness.length - 1],
    },
  ],
});

const guard_output_size = 546;
// const leafScriptAsmForGuardOutput = `${hex.encode(toXOnly(leafKey.publicKey))} OP_CHECKSIG OP_0 OP_IF ${Buffer.from('ord').toString('hex')} 01 ${Buffer.from('text/plain;charset=utf-8').toString('hex')} OP_0 ${Buffer.from('Hello, guard output!').toString('hex')} OP_ENDIF`;
const leafScriptAsmForGuardOutput = `${hex.encode(toXOnly(leafKey.publicKey))} OP_CHECKSIG OP_0 OP_IF ${Buffer.from('cat20 guard').toString('hex')} OP_ENDIF`;
const leafScriptForGuardOutput = bitcoin.script.fromASM(
  leafScriptAsmForGuardOutput
);
const scriptTreeForGuardOutput = {
  output: leafScriptForGuardOutput,
};

// 11. 生成reveal消费凭证
const redeemForGuardOutput = {
  output: leafScriptForGuardOutput,
  redeemVersion: 0xc0,
};

// 11. 生成拥有铭文的tapRoot收款地址和witness
const { address: guardOutputAddr, witness: guardOutputWitness } =
  bitcoin.payments.p2tr({
    internalPubkey: toXOnly(tapInternalKey.publicKey),
    scriptTree: scriptTreeForGuardOutput,
    redeem: redeemForGuardOutput,
    network,
  });
console.log(`guardOutputAddr: ${guardOutputAddr}`);

// 12. 创建铭刻output
guard_commit_psbt.addOutput({
  value: guard_output_size,
  address: guardOutputAddr,
  tapInternalKey: toXOnly(tapInternalKey.publicKey),
  tapTree: {
    leaves: [
      {
        leafVersion: redeemForGuardOutput.redeemVersion,
        script: redeemForGuardOutput.output,
        depth: 0,
      },
    ],
  },
});

// 12. guard commit - charge output
const guard_commit_charge = guard_fee - fee - guard_output_size;
guard_commit_psbt.addOutput({
  value: guard_commit_charge,
  address: fromAddress,
});

// 13. 使用commit交易接收方密钥对签名，这里签名时对应scriptTree中的OP_CHECKSIG参数
guard_commit_psbt.signInput(0, leafKey);
guard_commit_psbt.finalizeAllInputs();
const guard_commit_tx = guard_commit_psbt.extractTransaction();
const guard_commit_rawTx = guard_commit_tx.toBuffer();
const guard_commit_txHex = guard_commit_rawTx.toString('hex');

console.log('guard_commit_txHex...', guard_commit_txHex);

const guard_commit_txid =
  '66d3b6eea95b48cd69c907f3123cced976821c0432e7eaaf22cb95239c8eefdc';

// 15. guard reveal tx
// from user
const token_unspent = {
  txid: 'd58c2955d488ad82ebe6160902ced41a83c2bc2e64f651cc0ad9bed89c87bb91',
  vout: 0,
  value: 400000,
};

const guard_reveal_psbt = new bitcoin.Psbt({ network });
guard_reveal_psbt.addInput({
  hash: token_unspent.txid,
  index: token_unspent.vout,
  witnessUtxo: {
    value: token_unspent.value,
    script: output,
  },
  tapInternalKey: toXOnly(tapInternalKey.publicKey),
});

// guard reveal guard input
guard_reveal_psbt.addInput({
  hash: guard_commit_txid,
  index: 0,
  witnessUtxo: {
    value: guard_output_size,
    script: bitcoin.payments.p2tr({
      address: guardOutputAddr,
      network,
    }).output,
  },
  tapLeafScript: [
    {
      leafVersion: redeemForGuardOutput.redeemVersion,
      script: redeemForGuardOutput.output,
      controlBlock: guardOutputWitness[guardOutputWitness.length - 1],
    },
  ],
});

// guard reveal fee input
guard_reveal_psbt.addInput({
  hash: guard_commit_txid,
  index: 1,
  witnessUtxo: {
    value: guard_commit_charge,
    script: output,
  },
  tapInternalKey: toXOnly(tapInternalKey.publicKey),
});

guard_reveal_psbt.addOutput({
  value: 546,
  address: bitcoin.payments.p2tr({
    internalPubkey: toXOnly(leafKey.publicKey),
    network,
  }).address,
  tapInternalKey: toXOnly(leafKey.publicKey),
});

// todo: recharge
guard_reveal_psbt.addOutput({
  value: token_unspent.value - 546 - 1000, // 1000 for fee
  address: bitcoin.payments.p2tr({
    internalPubkey: toXOnly(leafKey.publicKey),
    network,
  }).address,
  tapInternalKey: toXOnly(leafKey.publicKey),
});

guard_reveal_psbt.signInput(0, fromKeypair); // guard reveal token input
guard_reveal_psbt.signInput(1, leafKey); // guard reveal input
guard_reveal_psbt.signInput(2, fromKeypair); // guard reveal fee input

guard_reveal_psbt.finalizeAllInputs();
const guard_reveal_tx = guard_reveal_psbt.extractTransaction();
const guard_reveal_rawTx = guard_reveal_tx.toBuffer();
const guard_reveal_txHex = guard_reveal_rawTx.toString('hex');

console.log('guard_reveal_txHex...', guard_reveal_txHex);
// broadcast 3bb6ba53f45c294226013f21b6ab42057b75bd0b5e92117772414fa01951ec7f

import { getFeeRate } from './mempool/gasfee.js';

// 计算交易大小
export function estimateTxSize(psbt) {
  // 计算估算大小
  const outputSize = 34; // 每个输出大约34字节
  const inputSize = 180; // 每个输入大约180字节
  const baseSize = 10; // 基础开销大约10字节
  const inputsCount = psbt.txInputs.length;
  const outputsCount = psbt.txOutputs.length;
  const estimatedSize =
    baseSize + inputsCount * inputSize + outputsCount * outputSize;
  return estimatedSize;
}

// 计算总费用
export async function calculateFee(psbt) {
  const feeRate = await getFeeRate();
  const txSize = estimateTxSize(psbt);
  const totalFee = feeRate * txSize; // 费用率 * 交易大小
  console.log(`Estimated transaction size: ${txSize} bytes`);
  console.log(`Fee rate: ${feeRate} sat/byte`);
  console.log(`Total estimated fee: ${totalFee} satoshis`);
  return totalFee;
}

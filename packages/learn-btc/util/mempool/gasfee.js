import mempoolJS from '@mempool/mempool.js';

// 获取当前费用率
export async function getFeeRate() {
  const {
    bitcoin: { fees },
  } = mempoolJS();

  const feesRecommended = await fees.getFeesRecommended();
  return feesRecommended;
}

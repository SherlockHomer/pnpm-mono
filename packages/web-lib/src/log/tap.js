const tap = (x, fn = (x) => x) => {
  // 输出结果，默认是参数本身
  console.log(fn(x));
  let a = '';
  return x;
};

export default tap;

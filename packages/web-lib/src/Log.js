const tap = (x, fn = (x) => x) => {
  // 输出结果，默认是参数本身
  console.log(fn(x));
  return x;
};

export default tap;

/* eslint-disable no-throw-literal */
function reduce(arr, callbackFn, init) {
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    throw 'func show be called by array';
  }
  let start = init ? 0 : 1;
  let result = init || arr[0];
  for (; start < arr.length; start++) {
    result = callbackFn(result, arr[start], start, arr);
  }
  return result;
}

export { reduce };

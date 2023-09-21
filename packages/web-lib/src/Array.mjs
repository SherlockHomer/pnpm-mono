/* eslint-disable no-throw-literal */
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callbackFn, init) {
    if (Object.prototype.toString.call(this) !== '[object Array]') {
      throw 'func show be called by array';
    }
    const arr = this;
    let start = init ? 0 : 1;
    let result = init || arr[0];
    for (; start < arr.length; start++) {
      result = callbackFn(result, arr[start], start, arr);
    }
    return result;
  };
}

// 用到 arguments
(function () {
  /* eslint-disable no-new-wrappers */
  const { deepClone } = require('./Index');

  function Foo() {
    this.a = 1;
  }
  Foo.prototype.b = 1;
  Foo.c = function () {};

  const map = new Map();
  map.set('a', 1);
  map.set('b', 2);
  const set = new Set();
  set.add(1);
  set.add(2);
  const objects = {
    '`arguments` objects': arguments,
    arrays: ['a', ''],
    'array-like objects': { 0: 'a', length: 1 },
    booleans: false,
    'boolean objects': Object(false),
    'date objects': new Date(),
    'Foo instances': new Foo(),
    objects: { a: 0, b: 1, c: 2 },
    'objects with object values': { a: /a/, b: ['B'], c: { C: 1 } },
    'objects from another document': {},
    maps: map,
    'null values': null,
    numbers: 0,
    'number objects': Object(0),
    regexes: /a/gim,
    sets: set,
    strings: 'a',
    'string objects': Object('a'),
    'undefined values': undefined,
  };

  objects.arrays.length = 3;

  // eslint-disable-next-line no-unused-vars
  // const uncloneable = {
  //   'DOM elements': body,
  //   functions: Foo,
  //   'async functions': asyncFunc,
  //   'generator functions': genFunc,
  //   'the `Proxy` constructor': Proxy,
  // };

  // 1. 普通数据类型对比相同
  // 2. 对象内容地址不同，对象各个值也进行深度比较
  test('test deepClone', () => {
    const cloned = deepClone(objects);
    expect(objects).not.toBe(cloned);
    expect(JSON.stringify(objects)).toStrictEqual(JSON.stringify(cloned));
  });
})();

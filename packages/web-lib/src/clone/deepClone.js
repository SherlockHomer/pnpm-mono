/* eslint-disable no-unused-vars */
// basic type
const UNDEFINED_TYPE = '[object Undefined]';
const NULL_TYPE = '[object Null]';
const NUMBER_TYPE = '[object Number]';
const STRING_TYPE = '[object String]';
const BOOLEAN_TYPE = '[object Boolean]';
const BIGINT_TYPE = '[object BigInt]';
const SYMBOL_TYPE = '[object Symbol]';

// not deep type
const FUNCTION_TYPE = '[object Function]';
const REGEXP_TYPE = '[object RegExp]';
const ERROR_TYPE = '[object Error]';

// deep type
const ARRAY_TYPE = '[object Array]';
const MAP_TYPE = '[object Map]';
const SET_TYPE = '[object Set]';
const WEAKMAP_TYPE = '[object WeakMap]';
const WEAKSET_TYPE = '[object WeakSet]';
const OBJECT_TYPE = '[object Object]';

const deepTag = [
  ARRAY_TYPE,
  MAP_TYPE,
  SET_TYPE,
  WEAKMAP_TYPE,
  WEAKSET_TYPE,
  OBJECT_TYPE,
];

const isDeepTag = function (type) {
  return deepTag.indexOf(type) > -1;
};
const getType = function (target) {
  return {}.toString.call(target);
};
const cloneNormalTarget = function (target) {
  const type = getType(target);
  if (type === UNDEFINED_TYPE || type === NULL_TYPE) {
    return target;
  }
  if (type === FUNCTION_TYPE) {
    // 箭头函数 also
    // eslint-disable-next-line no-new-func
    return new Function('return ' + target.toString())();
  }
  if (type === REGEXP_TYPE) {
    return new target.constructor(target.source, /\w*$/.exec(target));
  }
  if (type === SYMBOL_TYPE) {
    return Object(Symbol.prototype.valueOf.call(target));
  }
  if (type === ERROR_TYPE) {
    return new Error(target.message);
  }
  // normal like Number(1) | new Number(1)
  // 过滤基础类型中用了 new 来构造的类型
  if (typeof target === 'object') {
    return new target.constructor(target.valueOf());
  } else {
    return target.constructor(target);
  }
};
// 1. WeakMap for cycle reference
// 2. one part is normal, just clone. And some use new, some don't
// 3. one part is reference, build deep obj and clone deep
function deepClone(target, wm = new WeakMap()) {
  const type = getType(target);
  if (!isDeepTag(type)) {
    return cloneNormalTarget(target);
  }
  if (wm.has(target)) {
    return wm.get(target);
  }
  const constructor = target.constructor;
  const clone = new constructor();
  if (type === MAP_TYPE || type === WEAKMAP_TYPE) {
    for (const [key, value] of target) {
      clone.set(key, deepClone(value, wm));
    }
  } else if (type === SET_TYPE || type === WEAKSET_TYPE) {
    for (const value of target) {
      clone.add(deepClone(value, wm));
    }
  } else if (type === ARRAY_TYPE || type === OBJECT_TYPE) {
    for (const key in target) {
      if (Object.hasOwn(target, key)) {
        clone[key] = deepClone(target[key], wm);
      }
    }
    if (target.length) {
      clone.length = target.length;
    }
  }
  wm.set(target, clone);
  return clone;
}

module.exports = deepClone;

/* eslint-disable */
// 根据 node_modules/.pnpm/core-js-pure@3.33.0/node_modules/core-js-pure/internals/function-bind.js 26:20 中的 NATIVE_BIND 逻辑，需要改动下现有的 .bind 为空

Function.prototype.bindOrigin = Function.prototype.bind;
Function.prototype.bind = function () {};
const bindCore = require('core-js-pure/actual/function/bind');

let Child_prototype = null;

function inherit(subType, superType) {
  let prototype = Object.create(superType.prototype);
  // used to check new bindFn().__proto__
  Child_prototype = prototype;
  subType.prototype = prototype;
  subType.prototype.constructor = subType;
}
function Parent(name) {
  this.name = name;
}
Parent.parentStaticProp = 'parentStaticProp';
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
  console.log(this.value);
}
inherit(Child, Parent);

/* test data */
var value = 'global value';
let foo = {
  value: 'foo value',
};
/* test data end */

Function.prototype.self_bind = function (context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    );
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var boundFunction = function bound() {
    var bindArgs = Array.prototype.slice.call(arguments);
    args = args.concat(bindArgs);
    return this instanceof self
      ? self.call(self, args)
      : self.apply(context, args);
  };
  // no1. create mode
  // var fNOP = function () {};
  // fNOP.prototype = this.prototype; // 错误 原生的 bind 并没有多包一层
  // boundFunction.prototype = new fNOP();
  // new_self_bindFoo.__proto__ === Child_prototype; // will get false

  // no2. directly use prototype
  boundFunction.prototype = this.prototype;

  // no3. undefined, let result as same as original bind
  // this instanceof bound got an error:
  // Function has non-object prototype 'undefined' in instanceof check
  // boundFunction.prototype = undefined;
  return boundFunction;
};

// origin bind
var bindFoo = Child.bindOrigin(foo, 'daisy');
console.log('原生 bindFoo.prototype: ', bindFoo.prototype);

let bindFoo_obj = bindFoo('18');
console.log('bindFoo("18") return', bindFoo_obj);

console.info('接下来测试 原生、自定义、corejs 三种方式的 new bindFn() 的原型');

let new_bindFoo = new bindFoo('18');
console.log('原生 new bindFoo("18") __proto__: ', new_bindFoo.__proto__);

// self bind
var self_bindFoo = Child.self_bind(foo, 'sher');
let new_self_bindFoo = new self_bindFoo(30);
console.log(
  '自定义 new self_bindFoo(30) __proto__: ',
  new_self_bindFoo.__proto__
);

new_self_bindFoo.__proto__ === Child_prototype;
new_bindFoo.__proto__ === Child_prototype;

// core-js bind
var core_bindFoo = bindCore(Child, foo, 'sher');
let new_core_bindFoo_obj = new core_bindFoo(30);
console.log(
  'CoreJS new core_bindFoo(30) __proto__: ',
  new_core_bindFoo_obj.__proto__
);
// core_bindFoo.prototype.corejsChange = function () {};
// console.log('Child.prototype:', Child.prototype);
console.log('core_bindFoo.prototype:', core_bindFoo.prototype);

new_core_bindFoo_obj.__proto__ === Child_prototype;
new_bindFoo.__proto__ === Child_prototype;

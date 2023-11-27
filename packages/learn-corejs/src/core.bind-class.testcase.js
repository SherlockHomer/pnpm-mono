/* eslint-disable */
// 根据 node_modules/.pnpm/core-js-pure@3.33.0/node_modules/core-js-pure/internals/function-bind.js 26:20 中的 NATIVE_BIND 逻辑，需要改动下现有的 .bind 为空

Function.prototype.bindOrigin = Function.prototype.bind;
Function.prototype.bind = function () {};

const bindCore = require('core-js-pure/actual/function/bind');

class Parent {
  constructor(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }
  static parentStaticProp = 'parentStaticProp';
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    console.log(this.value);
    this.age = age;
  }
  static childProp = 'childProp';
}
var value = 'global value';
let foo = {
  value: 'foo value',
};

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
    return this instanceof self ? new self(args) : self.apply(context, args);
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
var bindFoo = Child.bindOrigin(null, 'daisy');
console.log('原生 bindFoo.prototype: ', bindFoo.prototype);

console.info(
  '接下来测试 原生、自定义、corejs 三种方式的 new bindFn() 的原型，因为用到了 new ，所以 foo 没用了'
);

let new_bindFoo = new bindFoo(null);
console.log('原生 new bindFoo("18") __proto__: ', new_bindFoo.__proto__);

// self bind
var self_bindfoo = Child.self_bind(null, 'sher');
let new_self_bindfoo = new self_bindfoo(30);
console.log(
  '自定义 new self_bindfoo(30) __proto__: ',
  new_self_bindfoo.__proto__
);

// core-js bind
var core_bindFoo = bindCore(Child, null, 'sher');
let new_core_bindFoo = new core_bindFoo(30);
console.log(
  'CoreJS new core_bindFoo(30) __proto__: ',
  new_core_bindFoo.__proto__
);
// core_bindFoo.prototype.corejsChange = function () {};
// console.log('Child.prototype:', Child.prototype);
console.log('core_bindFoo.prototype:', core_bindFoo.prototype);

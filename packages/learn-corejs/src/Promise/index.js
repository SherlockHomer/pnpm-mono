const PENDING = 'pending';
const FUIFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
  this.state = PENDING;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const self = this;
  function resolve(value) {
    setTimeout(function () {
      if (self.state === PENDING) {
        self.state = FUIFILLED;
        self.data = value;
        for (let i = 0; i < self.onFulfilledCallbacks.length; i++) {
          self.onFulfilledCallbacks[i](value);
        }
      }
    }, 0);
  }
  function reject(reason) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = REJECTED;
        self.data = reason;
        for (let i = 0; i < self.onRejectedCallbacks.length; i++) {
          self.onRejectedCallbacks[i](reason);
        }
      }
    }, 0);
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  let promise2;
  const promise1 = this;
  return (promise2 = new Promise(function (resolve, reject) {
    function doFulFilled(value) {
      if (typeof onFulfilled === 'function') {
        try {
          const x = onFulfilled(value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(value);
      }
    }
    function doRejected(reason) {
      if (typeof onRejected === 'function') {
        try {
          const x = onRejected(reason);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(reason);
      }
    }
    if (promise1.state === FUIFILLED) {
      setTimeout(() => {
        doFulFilled(promise1.data);
      });
    } else if (promise1.state === REJECTED) {
      setTimeout(() => {
        doRejected(promise1.data);
      });
    } else if (promise1.state === PENDING) {
      promise1.onFulfilledCallbacks.push(function (value) {
        doFulFilled(value);
      });
      promise1.onRejectedCallbacks.push(function (reason) {
        doRejected(reason);
      });
    }
  }));
};

function promiseResolutionProcedure(promise, x, resolve, reject) {
  if (!x) {
    return resolve(x);
  }
  if (x === promise) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  if (x instanceof Promise) {
    if (x.state === FUIFILLED) {
      resolve(x.data);
    } else if (x.state === REJECTED) {
      reject(x.data);
    } else if (x.state === PENDING) {
      x.then(function (value) {
        promiseResolutionProcedure(promise, value, resolve, reject);
      }, reject); // when x rejected, use promise(promose2).reject
    }
    return;
  }
  if (typeof x === 'object' || typeof x === 'function') {
    let isCalled = false;
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          function (value) {
            if (isCalled) return;
            isCalled = true;
            // return is must for caller
            return promiseResolutionProcedure(promise, value, resolve, reject);
          },
          function (reason) {
            if (isCalled) return;
            isCalled = true;
            return reject(reason);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (isCalled) return;
      isCalled = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

module.exports = Promise;

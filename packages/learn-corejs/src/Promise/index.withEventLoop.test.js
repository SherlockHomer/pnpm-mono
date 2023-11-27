global.Promise = null;
// core-js 取得还是 global.window.queueMicrotask() 的微任务
const Promise = require('core-js-pure/actual/promise');

const logResult = [];
function getResult() {
  setTimeout(() => {
    logResult.push(1);
  }, 0);

  new Promise((resolve, reject) => {
    logResult.push(2);
    resolve('p1');

    new Promise((resolve, reject) => {
      logResult.push(3);

      setTimeout(() => {
        resolve('setTimeout2');
        logResult.push(4);
      }, 0);
      resolve('p2');
    }).then((data) => {
      logResult.push(data);
    });

    setTimeout(() => {
      resolve('setTimeout1');

      logResult.push(5);
    }, 0);
  }).then((data) => {
    logResult.push(data);
  });

  logResult.push(6);
}

const browserResult = [2, 3, 6, 'p2', 'p1', 1, 4, 5];

it('should get the same result like in browser', async () => {
  getResult();
  await new Promise((resolve) => {
    setTimeout(resolve, 10);
  });
  console.log(logResult);
  expect(logResult).toEqual(browserResult);
});

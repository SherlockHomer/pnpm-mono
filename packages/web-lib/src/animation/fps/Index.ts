/**
 *  * use it to create a loop for calc fps
 *
 * @param {(fps: number) => void} callback
 * @returns fn to break loop
 */
function getFPS(callback: (fps: number) => void) {
  let prevTime = +new Date();
  let frames = 0;
  let open = true;
  requestAnimationFrame(function loop() {
    let now = +new Date();
    frames++;
    if (now > prevTime + 1000) {
      const fps = Math.round((frames * 1000) / (now - prevTime));
      prevTime = now;
      callback(fps);
      frames = 0;
    }
    if (open) {
      requestAnimationFrame(loop);
    }
  });
  const closeFn = function () {
    open = false;
  };
  return closeFn;
}

export { getFPS };

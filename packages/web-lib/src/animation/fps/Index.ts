function getFps(callback: (fps: number) => void) {
  let prevTime = +new Date();
  let frames = 0;
  requestAnimationFrame(function loop() {
    let now = +new Date();
    frames++;
    if (now > prevTime + 1000) {
      const fps = Math.round((frames * 1000) / (now - prevTime));
      prevTime = now;
      callback(fps);
      console.log(4555);
      frames = 0;
    }
    requestAnimationFrame(loop);
  });
}

export { getFps };

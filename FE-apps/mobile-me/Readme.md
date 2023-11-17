### 样式体验

tailwind 靠 lint 提示，很需要熟练度，且和我过往自定义的已熟悉的 common css 命名习惯不同导致效率不高

css module 能提示，但是经常要写 styles.xxx, 再搭配 common 样式 className 就容易出现换行丑陋的情况

```js
<div
  className={`row justify-content-center ${styles['global-nav-container']}`}
></div>
```

https://github.com/csstools/sanitize.css#features

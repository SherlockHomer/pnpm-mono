### 关于统一 rollup 配置

- 统一装载 rollup 插件，包括 @rollup/babel
- babel 本身的插件放在根目录，放在 rollup 包不合适，理由
  - babel 是转换代码的，rollup 是代码打包器，rollup 是调用 babel 的存在，babel 应该更加独立
- babelrc 放在 rollup-react 是不合理的，理由
  - With monorepo setups, the core thing to understand is that Babel treats your working directory as its logical "root", _which causes problems if you want to run Babel tools within a specific sub-package without having Babel apply to the repo as a whole._ Babel 安装全局或者 rollup-react ，但运行时是在子包目录，当子包没有 babelrc 是会报错的。

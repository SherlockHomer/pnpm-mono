[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### commit rules

- start with revert|feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release

### 关于 eslint

一定要有 IDE 扩展程序

- [x] 阶段1: 严格模式：仅 root 安装ESLint，configs/x 同步 root，
  - 通过 syncpack 管理
  - 利于 lint-staged 触发的 唯一eslint 处理

### syncpack

find mismatches version in every package.json of subpackages & fix them, be care `npx syncpack list-mismatches` `npx syncpack fix-mismatches`

[watch more](https://jamiemason.github.io/syncpack/fix-mismatches)

### builds

#### docker build react-3d-nginx

- ⚠️ 指定 build.Dockerfile 后会指定 build.Dockerfile.dockerignore ，会忽略根目录的 .dockeringore，像 node_modules 这种就需要重写 docker build . --target react-3d-nginx --tag react-3d-ng:latest -f ./docker/build.Dockerfile
- 改进 v1：基础的 mono-dep 总包下，子包自己实现 dockerfile
  - [x] root/package.json/docker:mono:container for mono-dep
  - [x] 例如 react-3d 下实现了 Dockerfile(for build) && Dockerfile.dev(for dev)，查看 react-3d/package.json/docker:xxx:container
  - [x] react-3d/compose.yml 用于启动 dev 服务，更加便捷且有热更，_当依赖的内容没有通过 volumes 挂载时，热更会失败，需要 compose build_
  - [ ] root/docker/build.Dockerfile prune

### types intellisense

### cypress

> install it in root project avoid install cypress binary twice but sometimes when you need to use ci, you can use `npm install --ignore-scripts` to aviod cypress postinstall

when you use cypress in your subpackage, you may need this. add this in your tsconfig.json `"compilerOptions": {     "types": ["cypress"] }`

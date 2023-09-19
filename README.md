### 关于 eslint

一定要有 IDE 扩展程序

- 阶段1: configs/安装相同 eslint，可以通过 syncpack 管理 （更直接的方案可以是 删除 configs 下的 eslint ，在 root 下安装，这样符合 lint-staged 触发的 唯一eslint 处理 ）
  - eslint 触发后在具体文件上会按照当前文件所在的 .eslintrc ，所以不同项目规则不同是可以生效的。
- 阶段2: 应用项目各自安装 eslint，这样不同项目不同规则，还能兼容老版本的 eslint

### syncpack

find mismatches version in every package.json of subpackages & fix them, be care `npx syncpack list-mismatches` `npx syncpack fix-mismatches`

[watch more](https://jamiemason.github.io/syncpack/fix-mismatches)

### builds

<!-- build react-3d-nginx -->

- ⚠️ 指定 build.Dockerfile 后会指定 build.Dockerfile.dockerignore ，会忽略根目录的 .dockeringore，像 node_modules 这种就需要重写 docker build . --target react-3d-nginx --tag react-3d-ng:latest -f ./docker/build.Dockerfile

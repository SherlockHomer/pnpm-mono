# install again when src codes has been changed is wasteful
FROM node:16.20-slim AS base-package-config
WORKDIR /app-config
# move all package.json
RUN --mount=type=bind,target=/docker-context \
  cd /docker-context/; \
  find . -name "package.json" -mindepth 0 -maxdepth 4 -exec cp --parents "{}" /app-config/ \;
# get pnpm stuff
COPY ./pnpm-lock.yaml /app-config
COPY ./pnpm-workspace.yaml /app-config


FROM node:16.20-slim AS mono-dep
ARG PNPM_VERSION=8.6.2
RUN npm --no-update-notifier install -g pnpm@${PNPM_VERSION}
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
COPY --from=base-package-config /app-config /app

# todo: 实现 turbo prune 的仅依赖获取
# 安装依赖
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
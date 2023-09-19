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
RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
COPY --from=base-package-config /app-config /app

# 安装依赖
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


# 加入源码
FROM mono-dep AS mono
COPY . /app


# stage mono 包括所有其他包的源码
FROM mono AS react-3d
RUN npx nx build @mono/react-3d


# Final Stage，只要 react-3d build
FROM nginx AS react-3d-nginx

EXPOSE 3000

COPY --from=mono /app/FE-apps/react-3d/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=react-3d /app/FE-apps/react-3d/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

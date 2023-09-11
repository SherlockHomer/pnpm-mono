# node env for react-project and use nginx as server
FROM node:16.20-slim AS base
RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile


FROM base AS prod
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


# stage 包括所有其他包的源码
FROM prod AS react-3d
RUN npx nx build @mono/react-3d


# Final Stage，只要 react-3d build
FROM nginx AS react-3d-nginx

EXPOSE 3000

COPY --from=base /app/FE-apps/react-3d/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=react-3d /app/FE-apps/react-3d/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

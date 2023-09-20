# 加入源码
# todo: 实现 turbo prune 的仅依赖获取
FROM mono-dep AS mono
COPY . /app

# stage mono 包括所有其他包的源码
FROM mono AS react-3d
RUN npx nx build @mono/react-3d


# Final Stage，只要 react-3d build
FROM nginx:1.25.2-alpine AS react-3d-ng

EXPOSE 3000

COPY --from=mono /app/FE-apps/react-3d/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=react-3d /app/FE-apps/react-3d/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

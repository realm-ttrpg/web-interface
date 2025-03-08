FROM node:22 AS build
WORKDIR /build
COPY package.json /build/
COPY package-lock.json /build/
COPY tsconfig.json /build/
COPY src /build/src
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci
RUN npm run build:local

FROM nginx:alpine
EXPOSE 80
COPY --from=build /build/html /usr/share/nginx/html

FROM node:alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tsconfig* index.html vite.config.ts tailwind.config.js postcss.config.js ./
COPY src src
RUN yarn build

FROM nginx:alpine AS runner

COPY --from=builder /app/dist/client /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
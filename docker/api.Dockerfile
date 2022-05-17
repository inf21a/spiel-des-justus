FROM node:alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tsconfig* ./
COPY src src
RUN yarn build:server

FROM node:alpine AS runner
WORKDIR /app

COPY package.json .
COPY --from=builder /app/node_modules ./node_modules
RUN yarn install --production

COPY --from=builder /app/dist/server ./dist/server

ENV NODE_ENV=production

EXPOSE 80

CMD ["yarn", "start:server"]
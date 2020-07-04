FROM mhart/alpine-node:12 AS builder
RUN apk add --no-cache make gcc g++ python
ENV HUSKY_SKIP_INSTALL=1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --no-optional --no-audit --no-progress
COPY . .
RUN npm run build:server
RUN npm run build:client
RUN npm prune --only=production


FROM mhart/alpine-node:slim-12 AS runtime
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/public ./public
CMD ["node", "dist/server.js"]

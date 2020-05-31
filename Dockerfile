FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --no-optional --no-audit --no-progress
COPY . .
RUN npm run build:server
RUN npm run build:client


FROM node:lts-alpine AS runtime
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --no-optional --no-audit --no-progress --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/public ./public
USER node
CMD ["node", "dist/server.js"]

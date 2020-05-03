FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run-script build


FROM node:alpine AS runtime

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/public ./public

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
USER node

CMD ["node", "dist/server"]

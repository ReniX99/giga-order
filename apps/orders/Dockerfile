FROM node:22.20-alpine3.21 AS development

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

WORKDIR /app/apps/orders
RUN pnpx prisma generate

WORKDIR /app
RUN pnpm run build-orders


FROM node:22.20-alpine3.21 AS production

WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY --from=development app/dist ./dist
COPY --from=development app/apps/orders/prisma ./prisma
# COPY --from=development app/apps/orders/generated ./generated
COPY --from=development app/apps/orders/prisma.config.ts ./


EXPOSE 3001

CMD ["sh", "-c", "pnpx prisma migrate deploy && pnpm run start:prod"]
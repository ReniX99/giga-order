FROM node:22.20-alpine3.21 AS development

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm run build


FROM node:22.20-alpine3.21 AS production

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY --from=development app/dist ./dist

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
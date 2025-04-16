# Estágio de construção
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY nx.json .
COPY tsconfig*.json ./
COPY apps/backend/package.json apps/backend/

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm nx build backend

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/backend ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/main.js"]

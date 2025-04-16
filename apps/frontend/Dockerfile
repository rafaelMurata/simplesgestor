# Estágio de construção
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY nx.json .
COPY tsconfig*.json ./
COPY apps/frontend/package.json apps/frontend/

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm nx build frontend

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/frontend ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["pnpm", "nx", "dev", "frontend"]

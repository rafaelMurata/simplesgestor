/**
 * Script para configurar o Prisma e garantir que esteja usando o schema correto
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Caminho para o schema do Prisma
const prismaSchemaPath = path.resolve(__dirname, '../libs/database/prisma/schema.prisma');

// Verificar se o arquivo existe
if (!fs.existsSync(prismaSchemaPath)) {
  console.error('Erro: Arquivo schema.prisma não encontrado em:', prismaSchemaPath);
  process.exit(1);
}

try {
  console.log('Gerando cliente Prisma a partir do schema em:', prismaSchemaPath);
  execSync(`npx prisma generate --schema="${prismaSchemaPath}"`, { stdio: 'inherit' });
  console.log('Cliente Prisma gerado com sucesso!');
} catch (error) {
  console.error('Erro ao gerar cliente Prisma:', error.message);
  process.exit(1);
}

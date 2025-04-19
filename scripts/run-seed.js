/**
 * Script para executar o seed do banco de dados com as configurações corretas
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const loadEnvFile = require('./load-env');

// Carregar variáveis de ambiente do arquivo .env.local na raiz
const { envPath } = loadEnvFile();
console.log(`Usando configurações de ambiente de: ${envPath}`);

// Verificar se a URL do banco de dados está configurada corretamente
if (!process.env.DATABASE_URL) {
  console.error('Erro: DATABASE_URL não está definida nas variáveis de ambiente.');
  process.exit(1);
}

// Mostrar as credenciais que estão sendo usadas
console.log(`Usando conexão com o banco de dados: ${process.env.DATABASE_URL.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);

// Caminho para o schema do Prisma
const prismaSchemaPath = path.resolve(__dirname, '../libs/database/prisma/schema.prisma');

// Verificar se o arquivo existe
if (!fs.existsSync(prismaSchemaPath)) {
  console.error('Erro: Arquivo schema.prisma não encontrado em:', prismaSchemaPath);
  process.exit(1);
}

try {
  console.log('Gerando cliente Prisma a partir do schema em:', prismaSchemaPath);
  execSync(`npx prisma generate --schema="${prismaSchemaPath}"`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      PRISMA_SCHEMA_ENGINE_BINARY: path.resolve(__dirname, '../node_modules/.prisma/client'),
      PRISMA_QUERY_ENGINE_BINARY: path.resolve(__dirname, '../node_modules/.prisma/client'),
      PRISMA_MIGRATION_ENGINE_BINARY: path.resolve(__dirname, '../node_modules/.prisma/client'),
      PRISMA_INTROSPECTION_ENGINE_BINARY: path.resolve(__dirname, '../node_modules/.prisma/client'),
      PRISMA_FMT_BINARY: path.resolve(__dirname, '../node_modules/.prisma/client'),
      PRISMA_CLI_QUERY_ENGINE_TYPE: 'binary',
      PRISMA_CLIENT_ENGINE_TYPE: 'binary'
    }
  });
  console.log('Cliente Prisma gerado com sucesso!');

  // Criar um arquivo temporário que carrega o .env.local antes de executar o seed
  const tempSeedFile = path.resolve(__dirname, '../temp-seed.js');
  fs.writeFileSync(tempSeedFile, `
    require('${path.resolve(__dirname, 'load-env')}')();
    require('ts-node/register');
    require('./libs/database/prisma/seed.ts');
  `);

  console.log('Executando o seed do banco de dados...');
  execSync(`node ${tempSeedFile}`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_PATH: path.resolve(__dirname, '../node_modules'),
      TS_NODE_PROJECT: path.resolve(__dirname, '../tsconfig.json')
    }
  });

  // Remover o arquivo temporário
  fs.unlinkSync(tempSeedFile);

  console.log('Seed executado com sucesso!');
} catch (error) {
  console.error('Erro ao executar o seed:', error.message);
  process.exit(1);
}

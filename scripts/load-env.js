/**
 * Script para carregar variáveis de ambiente do arquivo .env.local na raiz do projeto
 */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function loadEnvFile() {
  const rootDir = path.resolve(__dirname, '..');
  const envLocalPath = path.join(rootDir, '.env.local');
  const envPath = path.join(rootDir, '.env');

  // Priorizar .env.local, se não existir usar .env
  if (fs.existsSync(envLocalPath)) {
    console.log('Carregando variáveis de ambiente de .env.local');
    dotenv.config({ path: envLocalPath });
  } else if (fs.existsSync(envPath)) {
    console.log('Carregando variáveis de ambiente de .env');
    dotenv.config({ path: envPath });
  } else {
    console.log('Arquivos .env.local e .env não encontrados. Criando .env.local com valores padrão.');
    const defaultEnv = `# Configurações centralizadas para todo o projeto SimplesGestor

# Banco de dados
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/simplesgestor"

# Aplicações
NEXT_PUBLIC_FRONTEND_URL="http://localhost:4201/auth/login"
BACKEND_URL="http://localhost:4000"
SITE_URL="http://localhost:4200"

# JWT
JWT_SECRET="sua-chave-secreta-para-tokens-jwt"
JWT_EXPIRES_IN="24h"
/**
 * Script para carregar variáveis de ambiente do arquivo .env.local na raiz do projeto
 */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function loadEnvFile() {
  const rootDir = path.resolve(__dirname, '..');
  const envLocalPath = path.join(rootDir, '.env.local');
  const envPath = path.join(rootDir, '.env');

  // Priorizar .env.local, se não existir usar .env
  if (fs.existsSync(envLocalPath)) {
    console.log('Carregando variáveis de ambiente de .env.local');
    dotenv.config({ path: envLocalPath });
  } else if (fs.existsSync(envPath)) {
    console.log('Carregando variáveis de ambiente de .env');
    dotenv.config({ path: envPath });
  } else {
    console.log('Arquivos .env.local e .env não encontrados. Criando .env.local com valores padrão.');
    const defaultEnv = `# Configurações centralizadas para todo o projeto SimplesGestor

# Banco de dados
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/simplesgestor"

# Aplicações
NEXT_PUBLIC_FRONTEND_URL="http://localhost:4201/auth/login"
BACKEND_URL="http://localhost:4000"
SITE_URL="http://localhost:4200"

# JWT
JWT_SECRET="sua-chave-secreta-para-tokens-jwt"
JWT_EXPIRES_IN="24h"

# Node
NODE_ENV="development"`;

    fs.writeFileSync(envLocalPath, defaultEnv);
    dotenv.config({ path: envLocalPath });
  }

  // Verificar se DATABASE_URL está definida
  if (!process.env.DATABASE_URL) {
    console.warn('AVISO: DATABASE_URL não está definida no arquivo de ambiente.');
    process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/simplesgestor";
  }

  return {
    envPath: fs.existsSync(envLocalPath) ? envLocalPath : envPath
  };
}

module.exports = loadEnvFile;
# Node
NODE_ENV="development"`;

    fs.writeFileSync(envLocalPath, defaultEnv);
    dotenv.config({ path: envLocalPath });
  }

  // Verificar se DATABASE_URL está definida
  if (!process.env.DATABASE_URL) {
    console.warn('AVISO: DATABASE_URL não está definida no arquivo de ambiente.');
    process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/simplesgestor";
  }

  return {
    envPath: fs.existsSync(envLocalPath) ? envLocalPath : envPath
  };
}

module.exports = loadEnvFile;

/**
 * Script para configurar e testar a conexão com o banco de dados PostgreSQL
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
const rootDir = path.resolve(__dirname, '..');
const envLocalPath = path.join(rootDir, '.env.local');
const envPath = path.join(rootDir, '.env');

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
  console.log('Carregando variáveis de ambiente de .env.local');
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('Carregando variáveis de ambiente de .env');
} else {
  console.log('Nenhum arquivo .env encontrado.');
  process.exit(1);
}

// Extrair informações da conexão
const DATABASE_URL = process.env.DATABASE_URL || '';
if (!DATABASE_URL) {
  console.error('DATABASE_URL não está definida nas variáveis de ambiente.');
  process.exit(1);
}

// Parse da URL do banco de dados
let dbHost, dbUser, dbPass, dbName, dbPort;
try {
  const matches = DATABASE_URL.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  if (matches && matches.length >= 6) {
    dbUser = matches[1];
    dbPass = matches[2];
    dbHost = matches[3];
    dbPort = matches[4];
    dbName = matches[5];
  } else {
    throw new Error('Formato da DATABASE_URL inválido');
  }
} catch (error) {
  console.error('Erro ao analisar DATABASE_URL:', error.message);
  console.error('Certifique-se de que a URL está no formato: postgresql://user:password@host:port/dbname');
  process.exit(1);
}

console.log(`
Configuração do banco de dados:
- Host: ${dbHost}
- Porta: ${dbPort}
- Banco: ${dbName}
- Usuário: ${dbUser}
`);

// Verificar se o PostgreSQL está instalado
try {
  console.log('Verificando instalação do PostgreSQL...');
  execSync('which psql', { stdio: 'ignore' });
  console.log('PostgreSQL encontrado.');
} catch (error) {
  console.error('PostgreSQL não encontrado. Por favor, instale o PostgreSQL antes de continuar.');
  console.error('Em sistemas baseados em Debian/Ubuntu, você pode executar:');
  console.error('  sudo apt-get update && sudo apt-get install postgresql postgresql-contrib');
  process.exit(1);
}

// Verificar se o banco de dados existe
console.log(`Verificando se o banco de dados '${dbName}' existe...`);
try {
  // Verificar se conseguimos conectar ao PostgreSQL
    console.log(`Tentando conectar ao PostgreSQL com usuário "${dbUser}"...`);
    try {
      const testConnectionCmd = `PGPASSWORD=${dbPass} psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -c "SELECT 1" ${dbName}`;
      execSync(testConnectionCmd, { stdio: 'ignore' });
      console.log(`Conexão bem-sucedida ao banco de dados '${dbName}'!`);
    } catch (error) {
      console.log(`Não foi possível conectar diretamente ao banco '${dbName}', tentando conectar ao PostgreSQL...`);
      try {
        // Tentar conectar à base postgres para verificar se as credenciais estão corretas
        const testPostgresCmd = `PGPASSWORD=${dbPass} psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -c "SELECT 1" postgres`;
        execSync(testPostgresCmd, { stdio: 'ignore' });

        // Verificar se o banco de dados existe
        console.log(`Verificando se o banco de dados '${dbName}' existe...`);
        const checkDbCmd = `PGPASSWORD=${dbPass} psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -c "SELECT 1 FROM pg_database WHERE datname='${dbName}'" postgres`;
        const result = execSync(checkDbCmd, { encoding: 'utf8' });

        if (result.trim().includes('1')) {
          console.log(`Banco de dados '${dbName}' já existe.`);
        } else {
          console.log(`Banco de dados '${dbName}' não existe. Criando...`);
          const createDbCmd = `PGPASSWORD=${dbPass} psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -c "CREATE DATABASE ${dbName};"`;
          execSync(createDbCmd, { stdio: 'inherit' });
          console.log(`Banco de dados '${dbName}' criado com sucesso.`);
        }
      } catch (pgError) {
        console.error('Erro ao conectar ao PostgreSQL. Verifique suas credenciais:');
        console.error(`- Usuário: ${dbUser}`);
        console.error(`- Senha: ******`);
        console.error(`- Host: ${dbHost}`);
        console.error(`- Porta: ${dbPort}`);
        console.error('\nVerifique se:');
        console.error('1. O servidor PostgreSQL está em execução');
        console.error('2. As credenciais (usuário/senha) estão corretas');
        console.error('3. O host e porta estão corretos');
        console.error('4. O usuário tem permissão para criar bancos de dados');
        console.error('\nTente conectar manualmente para testar:');
        console.error(`psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -d postgres`);
        process.exit(1);
      }
  }
} catch (error) {
  console.error('Erro ao conectar ao PostgreSQL:');
  console.error('Verifique se:');
  console.error('1. O servidor PostgreSQL está em execução');
  console.error('2. As credenciais (usuário/senha) estão corretas');
  console.error('3. O host e porta estão corretos');
  console.error('4. O usuário tem permissão para criar bancos de dados');
  process.exit(1);
}

// Executar migrações do Prisma
console.log('Executando migrações do Prisma...');
try {
  const prismaSchemaPath = path.resolve(rootDir, 'prisma/schema.prisma');

  // Verificar se existe pasta de migrations
  const migrationsPath = path.resolve(rootDir, 'prisma/migrations');
  if (!fs.existsSync(migrationsPath)) {
    console.log('Criando primeira migração...');
    execSync(`npx prisma migrate dev --name init --schema=prisma/schema.prisma`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL
      }
    });
  }else {
    console.log('Aplicando migrações existentes...');
    execSync(`npx prisma migrate dev --schema=prisma/schema.prisma`, { stdio: 'inherit' });
  }

  console.log('Migrações do Prisma aplicadas com sucesso!');
} catch (error) {
  console.error('Erro ao executar migrações do Prisma:', error.message);
  process.exit(1);
}

console.log('\nBanco de dados configurado com sucesso!');
console.log('Você pode executar o seed do banco de dados com:');
console.log('  npm run seed');

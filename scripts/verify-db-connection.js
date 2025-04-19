/**
 * Script para verificar a conexão com o banco de dados PostgreSQL.
 * Este script tenta se conectar diretamente ao PostgreSQL usando as credenciais fornecidas
 * e imprime informações detalhadas sobre o resultado.
 */
const { execSync } = require('child_process');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

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

// Obter credenciais do .env ou usar valores padrão
const dbUser = process.env.DB_USER || 'simplesgestor';
const dbPass = process.env.DB_PASSWORD || 'senhasegura123';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbName = process.env.DB_NAME || 'simplesgestor';

console.log('\n=== Verificação de Conexão com o PostgreSQL ===\n');
console.log('Tentando conectar com as seguintes credenciais:');
console.log(`- Host: ${dbHost}`);
console.log(`- Porta: ${dbPort}`);
console.log(`- Usuário: ${dbUser}`);
console.log(`- Senha: ${'*'.repeat(dbPass.length)}`);
console.log(`- Banco de dados: ${dbName}`);
console.log('\nExecutando teste de conexão...\n');

// Tentar conectar ao banco específico
try {
  console.log(`1. Testando conexão direta ao banco '${dbName}'...`);
  const cmd = `PGPASSWORD=${dbPass} psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} -c "SELECT version()" -t`;
  const result = execSync(cmd, { encoding: 'utf8' });
  console.log('\n✓ SUCESSO! Conectado ao banco de dados.');
  console.log('\nVersão do PostgreSQL:');
  console.log(result.trim());
} catch (error) {
  console.log('\n✗ Falha ao conectar diretamente ao banco de dados especificado.');

  // Tentar conectar ao postgres (banco padrão)
  try {
    console.log('\n2. Testando conexão ao banco padrão "postgres"...');
    const cmd = `PGPASSWORD=${dbPass} psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -d postgres -c "SELECT version()" -t`;
    const result = execSync(cmd, { encoding: 'utf8' });
    console.log('\n✓ SUCESSO! Conectado ao banco padrão "postgres".');
    console.log('\nVersão do PostgreSQL:');
    console.log(result.trim());

    // Verificar se o banco específico existe
    console.log(`\n3. Verificando se o banco '${dbName}' existe...`);
    const checkDbCmd = `PGPASSWORD=${dbPass} psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -d postgres -c "SELECT 1 FROM pg_database WHERE datname='${dbName}'" -t`;
    const dbExists = execSync(checkDbCmd, { encoding: 'utf8' }).trim();

    if (dbExists.includes('1')) {
      console.log(`\n✓ O banco de dados '${dbName}' existe.`);
      console.log('\nPROBLEMA POTENCIAL: Permissões insuficientes para acessar o banco de dados.');
    } else {
      console.log(`\n✗ O banco de dados '${dbName}' NÃO existe.`);
      console.log('\nSOLUÇÃO: Crie o banco de dados com:');
      console.log(`PGPASSWORD=${dbPass} psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -d postgres -c "CREATE DATABASE ${dbName};"`);
    }
  } catch (pgError) {
    console.log('\n✗ Falha ao conectar ao banco padrão "postgres".');
    console.log('\nERRO DE CONEXÃO CRÍTICO:');
    console.log('1. Verifique se o servidor PostgreSQL está rodando');
    console.log('2. Verifique se as credenciais estão corretas');
    console.log('3. Verifique se o host e porta estão corretos');
    console.log('\nComando sugerido para testar manualmente:');
    console.log(`psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -d postgres`);
  }
}

console.log('\n=== Verificação de Conexão Concluída ===\n');

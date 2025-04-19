/**
 * Script para compilar a biblioteca auth diretamente
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações
const SRC_DIR = path.resolve(__dirname, '../libs/auth/src');
const DIST_DIR = path.resolve(__dirname, '../dist/libs/auth');
const PACKAGE_JSON = path.resolve(__dirname, '../libs/auth/package.json');

console.log('Iniciando compilação manual da biblioteca auth...');

// Criar diretório de saída
try {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
} catch (err) {
  console.error('Erro ao criar diretório de saída:', err);
  process.exit(1);
}

// Certificar que shared-models existe
try {
  console.log('Verificando se shared-models está compilado...');
  if (!fs.existsSync(path.resolve(__dirname, '../dist/libs/shared-models'))) {
    console.log('Biblioteca shared-models não encontrada, compilando primeiro...');
    execSync('nx build shared-models', { stdio: 'inherit' });
  }
} catch (err) {
  console.error('Erro ao verificar ou compilar shared-models:', err);
  // Continua com a compilação do auth de qualquer forma
}

// Compilar TypeScript
try {
  console.log('Compilando TypeScript...');
  execSync('npx tsc -p libs/auth/tsconfig.lib.json', { stdio: 'inherit' });
} catch (err) {
  console.error('Erro na compilação TypeScript:', err);
  process.exit(1);
}

// Copiar package.json
try {
  console.log('Copiando package.json...');
  const packageJson = require(PACKAGE_JSON);
  fs.writeFileSync(
    path.join(DIST_DIR, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
} catch (err) {
  console.error('Erro ao copiar package.json:', err);
}

// Copiar arquivos necessários
try {
  console.log('Copiando arquivos adicionais...');
  if (fs.existsSync(path.resolve(__dirname, '../libs/auth/README.md'))) {
    fs.copyFileSync(
      path.resolve(__dirname, '../libs/auth/README.md'),
      path.join(DIST_DIR, 'README.md')
    );
  }
} catch (err) {
  console.error('Erro ao copiar arquivos adicionais:', err);
}

console.log('Compilação concluída com sucesso!');

console.log('Dica: Se a compilação com NX continuar falhando, use este script com:');
console.log('  npm run build:auth:manual');

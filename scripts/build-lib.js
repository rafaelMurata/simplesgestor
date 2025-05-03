/**
 * Script para compilar a biblioteca auth sem usar Nx
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Compilando biblioteca auth com TypeScript diretamente...');

try {
  // Compilar com TypeScript
  execSync('npx tsc -p libs/auth/tsconfig.lib.json', { stdio: 'inherit' });

  // Copiar o arquivo de tipos
  fs.copyFileSync(
    path.join(__dirname, '../libs/auth/src/index.d.ts'),
    path.join(__dirname, '../dist/libs/auth/index.d.ts')
  );

  console.log('Biblioteca auth compilada com sucesso!');
} catch (error) {
  console.error('Erro ao compilar biblioteca auth:', error.message);
  process.exit(1);
}

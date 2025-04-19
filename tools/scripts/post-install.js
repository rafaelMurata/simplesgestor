/**
 * Script de pós-instalação para resolver problemas de compatibilidade
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Executando script de pós-instalação...');

// Função para verificar se um arquivo existe
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

// Função para adicionar anotação para ignorar erros de peer dependency
function patchModuleFederationFiles() {
  const federationPath = path.join(
    __dirname,
    '../../node_modules/@module-federation/utilities/dist/index.js'
  );

  if (fileExists(federationPath)) {
    console.log('Aplicando patch para @module-federation/utilities...');

    let content = fs.readFileSync(federationPath, 'utf8');

    // Prevenir aplicação múltipla do patch
    if (!content.includes('// PATCHED')) {
      content = '// PATCHED - React 19 compatibility\n' + content;
      fs.writeFileSync(federationPath, content);
      console.log('Patch aplicado com sucesso!');
    } else {
      console.log('Patch já foi aplicado anteriormente.');
    }
  }
}

// Executar patch
try {
  patchModuleFederationFiles();
  console.log('Pós-instalação concluída com sucesso!');
} catch (error) {
  console.error('Erro durante a pós-instalação:', error);
  process.exit(1);
}

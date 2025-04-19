const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Diretórios principais
const rootDir = path.resolve(__dirname, '..');
const libsDir = path.resolve(rootDir, 'libs');
const appsDir = path.resolve(rootDir, 'apps');

// Prefixos de importação para substituir
const oldPrefixes = [
  '@app/shared-models',
  '@app/auth',
  '@app/database',
  '@app/ui',
  '../../../shared-models/src',
  '../../shared-models/src',
  '../../../../shared-models/src',
  '../shared-models/src'
];

// Novos prefixos correspondentes
const newPrefixes = {
  '@app/shared-models': '@simplesgestor/shared-models',
  '@app/auth': '@simplesgestor/auth',
  '@app/database': '@simplesgestor/database',
  '@app/ui': '@simplesgestor/ui',
  '../../../shared-models/src': '@simplesgestor/shared-models',
  '../../shared-models/src': '@simplesgestor/shared-models',
  '../../../../shared-models/src': '@simplesgestor/shared-models',
  '../shared-models/src': '@simplesgestor/shared-models'
};

// Função principal
async function fixImports() {
  console.log('Iniciando correção de importações para o padrão @simplesgestor/*...');

  try {
    // Encontrar todos os arquivos TypeScript/JavaScript nos diretórios libs e apps
    const files = findAllTsJsFiles();

    let totalFixes = 0;

    // Verificar e corrigir importações nos arquivos
    for (const file of files) {
      const fixes = fixFileImports(file);
      totalFixes += fixes;
    }

    console.log(`Correção de importações concluída! Foram feitas ${totalFixes} alterações em importações.`);
  } catch (error) {
    console.error('Erro ao corrigir importações:', error);
    process.exit(1);
  }
}

// Encontrar todos os arquivos TypeScript/JavaScript
function findAllTsJsFiles() {
  const pattern = `{${libsDir},${appsDir}}/**/*.{ts,tsx,js,jsx}`;
  const files = glob.sync(pattern, { ignore: '**/node_modules/**' });
  console.log(`Encontrados ${files.length} arquivos para verificação.`);
  return files;
}

// Corrigir importações em um arquivo específico
function fixFileImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixCount = 0;

    // Procurar e substituir todos os padrões antigos
    for (const oldPrefix of oldPrefixes) {
      const newPrefix = newPrefixes[oldPrefix];

      // Padrão para encontrar importações/exportações
      const importRegex = new RegExp(`(from|import|export)\\s+['"]${oldPrefix}(\\/[^'"]*)?['"]`, 'g');

      // Substituir utilizando uma função de callback para manter caminhos adicionais
      content = content.replace(importRegex, (match, statement, subPath = '') => {
        fixCount++;
        return `${statement} '${newPrefix}${subPath}'`;
      });
    }

    // Se houve mudanças, salvar o arquivo
    if (content !== originalContent) {
      console.log(`Corrigindo importações em: ${path.relative(process.cwd(), filePath)} (${fixCount} alterações)`);
      fs.writeFileSync(filePath, content, 'utf8');
      return fixCount;
    }

    return 0;
  } catch (error) {
    console.error(`Erro ao processar arquivo ${filePath}:`, error);
    return 0;
  }
}

// Executar o script
fixImports();

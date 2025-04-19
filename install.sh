#!/bin/bash

# Script de instalação simplificado para o projeto SimplesGestor

echo "Iniciando instalação do SimplesGestor..."

# Limpar instalação anterior
echo "Removendo node_modules existentes..."
rm -rf node_modules
rm -rf dist

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1)

if [ $NODE_MAJOR -lt 16 ]; then
  echo "ERRO: Este projeto requer Node.js versão 16 ou superior."
  echo "Você está usando a versão $NODE_VERSION"
  echo "Por favor, atualize o Node.js e tente novamente."
  exit 1
fi

# Instalar dependências
echo "Instalando dependências..."
npm install --no-package-lock --legacy-peer-deps

# Verificar se pacotes essenciais estão instalados
if ! npm list glob | grep -q glob; then
  echo "Instalando pacote glob para scripts de padronização..."
  npm install glob --save-dev
fi

if ! npm list tsconfig-paths | grep -q tsconfig-paths; then
  echo "Instalando pacote tsconfig-paths para resolver caminhos de importação..."
  npm install tsconfig-paths --save-dev
fi

# Corrigir a configuração do Nx
echo "Corrigindo configuração do Nx workspace..."
npx nx g @nx/workspace:fix-configuration

# Padronizar importações
echo "Padronizando importações para usar o namespace @simplesgestor/..."
npm run fix:imports

# Compilar bibliotecas
echo "Compilando bibliotecas compartilhadas..."
echo "Limpando diretório dist/libs antes de reconstruir..."
rm -rf dist/libs
npm run build:models
npm run build:auth:manual

echo "Instalação concluída!"
echo "Para iniciar a aplicação, execute: npm run start:all"

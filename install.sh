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

# Compilar biblioteca auth
echo "Compilando biblioteca de autenticação..."
npx nx build auth

echo "Instalação concluída!"
echo "Para iniciar a aplicação, execute: npm run start:all"

const { composePlugins, withNx } = require('@nx/webpack');
const { join } = require('path');

// Configuração do webpack personalizada para o backend
module.exports = composePlugins(withNx(), (config) => {
  // Otimizações específicas para NestJS no modo de produção
  if (config.mode === 'production') {
    config.optimization = {
      ...config.optimization,
      minimize: true, // Minificar código em produção
    };
  }

  return {
    ...config,
    output: {
      path: join(__dirname, '../../dist/apps/backend'),
    },
    // Adicione configurações de resolução para tsconfig-paths
    resolve: {
      ...config.resolve,
      extensions: ['.ts', '.js', '.json'],
    },
    // Manter módulos Node.js como externos para evitar problemas de compatibilidade
    externals: [
      ...Object.keys(require('../../package.json').dependencies || {}),
      ...Object.keys(require('../../package.json').devDependencies || {}),
    ].filter(
      (dep) => !dep.includes('@simplesgestor') && !dep.includes('@nestjs')
    ),
  };
});

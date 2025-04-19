module.exports = {
    apps: [
      {
        name: 'backend',
        script: 'npx',
        args: 'nx run backend:serve',
      },
      {
        name: 'frontend',
        script: 'npx',
        args: 'nx run frontend:dev',
      },
      {
        name: 'site',
        script: 'npx',
        args: 'nx run site:dev',
      }
    ],
  };

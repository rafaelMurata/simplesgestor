import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'apps/backend/tsconfig.spec.json'
    }
  }
};

export default config;

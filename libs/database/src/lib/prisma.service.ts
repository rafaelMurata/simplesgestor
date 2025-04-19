import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Serviço Prisma que gerencia a conexão com o banco de dados
 * Implementa OnModuleInit e OnModuleDestroy para gerenciar o ciclo de vida da conexão
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env['NODE_ENV'] === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  /**
   * Conecta ao banco de dados quando o módulo é inicializado
   */
  async onModuleInit() {
    await this['$connect']();
  }

  /**
   * Desconecta do banco de dados quando o módulo é destruído
   */
  async onModuleDestroy() {
    await this['$disconnect']();
  }

  /**
   * Limpa todos os dados do banco de dados (usar apenas em testes)
   */
  async cleanDatabase() {
    if (process.env['NODE_ENV'] !== 'test') {
      throw new Error('cleanDatabase só pode ser executado em ambiente de teste');
    }

    const models = Reflect.ownKeys(this).filter((key) => {
      return typeof key === 'string' &&
        !key.startsWith('_') &&
        !['$on', '$connect', '$disconnect', '$use', '$transaction', '$queryRaw', '$executeRaw'].includes(key as string);
    });

    return this['$transaction'](
      // @ts-ignore - tipos dinâmicos
      models.map((model) => this[model as string].deleteMany())
    );
  }
}

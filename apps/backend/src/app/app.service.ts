import { Injectable } from '@nestjs/common';

/**
 * Serviço principal da aplicação
 */
@Injectable()
export class AppService {
  /**
   * Retorna informações de saúde da API
   */
  getHealth() {
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env['NODE_ENV'] || 'development'
    };
  }
}

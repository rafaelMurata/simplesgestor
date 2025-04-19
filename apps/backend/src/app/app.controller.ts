import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controlador principal da API
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint de verificação de integridade da API
   */
  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }
}

import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo global para serviços de banco de dados
 * @Global para que o serviço Prisma esteja disponível em toda a aplicação
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}

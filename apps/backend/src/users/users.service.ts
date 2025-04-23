import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Partial<User>): Promise<User> {
    return this.prisma.user.create({
      data: data as any,
    });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: data as any,
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    await this.prisma.user.delete({
      where: { id }
    });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('login', () => {
    it('should return a token and user if the credentials are correct', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: await bcrypt.hash('password123', 10),
        planType: 'FREE'
      };
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      const result = {
          user: {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            planType: mockUser.planType
          },
        token: 'mocked-token',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(result);
      jest.spyOn(authService, 'validateUser').mockResolvedValue(result.user as unknown as User);
      const req = { user: mockUser };

      const response = await authController.login({}, req);

      expect(response).toEqual(result);
    });

    it('should throw an UnauthorizedException if the credentials are wrong', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      jest.spyOn(authService, 'validateUser').mockRejectedValue(new UnauthorizedException('Credenciais inválidas'));
      const req = { user: null };

      await expect(authController.login({}, req)).rejects.toThrow(UnauthorizedException);
      
    });
  });
});
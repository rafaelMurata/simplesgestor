export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO para criar um novo usuário
 */
export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

/**
 * DTO para atualizar um usuário existente
 */
export interface UpdateUserDto {
  email?: string;
  name?: string;
}

/**
 * DTO para resposta de autenticação
 */
export interface AuthResponseDto {
  user: User;
  accessToken: string;
}

/**
 * DTO para login
 */
export interface LoginDto {
  email: string;
  password: string;
}
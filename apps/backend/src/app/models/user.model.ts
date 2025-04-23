/**
 * Modelo de usuário para uso em toda a aplicação
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  planId?: string;
}

/**
 * DTO para criar um novo usuário
 */
export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
  planId?: string;
}

/**
 * DTO para atualizar um usuário existente
 */
export interface UpdateUserDto {
  email?: string;
  name?: string;
  planId?: string;
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
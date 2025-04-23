import { planType } from './enums';

/**
 * Plan Model
 */
export interface Plan {
  id: string;
  name: string;
  price: number;
  features: {
    maxProjects: number;
    maxUsers: number;
    storage: string;
    support: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}




/**
 * DTO para criar um novo plano
 */
export interface CreatePlanDto {
  name: string;
  price: number;
  features: {
    maxProjects: number;
    maxUsers: number;
    storage: string;
    support: string;
  };
  isActive: boolean;
}

/**
 * DTO para atualizar um plano existente
 */
export interface UpdatePlanDto {
  name?: string;
  price?: number;
  features?: {
    maxProjects?: number;
    maxUsers?: number;
    storage?: string;
    support?: string;
  };
  isActive?: boolean;
}
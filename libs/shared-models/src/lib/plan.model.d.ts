/**
 * Tipos de planos disponíveis
 */
export declare enum PlanType {
    FREE = "Free",
    BASIC = "Basic",
    ADVANCED = "Advanced",
    PREMIUM = "Premium"
}
/**
 * Interface para features do plano
 */
export interface PlanFeatures {
    maxProjects: number;
    maxUsers: number;
    storage: string;
    support: 'email' | 'priority' | '24/7';
    [key: string]: any;
}
/**
 * Modelo de plano para uso em toda a aplicação
 */
export interface Plan {
    id: string;
    name: PlanType;
    price: number;
    features: PlanFeatures;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * DTO para criar um novo plano
 */
export interface CreatePlanDto {
    name: PlanType;
    price: number;
    features: PlanFeatures;
    isActive?: boolean;
}
/**
 * DTO para atualizar um plano existente
 */
export interface UpdatePlanDto {
    name?: PlanType;
    price?: number;
    features?: Partial<PlanFeatures>;
    isActive?: boolean;
}

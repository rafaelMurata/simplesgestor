import { subscriptionStatus } from './enums';

/**
 * Modelo de assinatura para uso em toda a aplicação
 */
export interface Subscription {
  id: string;
  userId: string;
  status: typeof subscriptionStatus;
  startDate: Date;
  endDate?: Date;
  externalId?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO para criar uma nova assinatura
 */
export interface CreateSubscriptionDto {
  userId: string;
  status: typeof subscriptionStatus;
  startDate?: Date;
  endDate?: Date;
  externalId?: string;
}

/**
 * DTO para atualizar uma assinatura existente
 */
export interface UpdateSubscriptionDto {
  status?: typeof subscriptionStatus;
  endDate?: Date;
  externalId?: string;
}

/**
 * Interface para histórico de pagamentos
 */
export interface PaymentHistory {
  id: string;
  subscriptionId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDate: Date;
  paymentMethod: string;
  externalTransactionId?: string;
}
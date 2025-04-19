export * from './lib/user.model';
export * from './lib/plan.model';
export * from './lib/subscription.model';
export * from './lib/responses.model';

// Exportar todos os modelos em um único objeto
import * as UserModels from './lib/user.model';
import * as PlanModels from './lib/plan.model';
import * as SubscriptionModels from './lib/subscription.model';
import * as ResponseModels from './lib/responses.model';

export const Models = {
  User: UserModels,
  Plan: PlanModels,
  Subscription: SubscriptionModels,
  Response: ResponseModels
};

export * from './lib/user.model';
export * from './lib/plan.model';
export * from './lib/subscription.model';
export * from './lib/responses.model';
import * as UserModels from './lib/user.model';
import * as PlanModels from './lib/plan.model';
import * as SubscriptionModels from './lib/subscription.model';
import * as ResponseModels from './lib/responses.model';
export declare const Models: {
    User: typeof UserModels;
    Plan: typeof PlanModels;
    Subscription: typeof SubscriptionModels;
    Response: typeof ResponseModels;
};

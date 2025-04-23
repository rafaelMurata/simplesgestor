export enum PlanType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED',
  PREMIUM = 'PREMIUM',
}

export interface JwtPayload {
  sub: string;
  email: string;
  name?: string;
  planType: PlanType;
  iat?: number;
  exp?: number;
}

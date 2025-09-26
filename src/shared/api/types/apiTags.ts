export const ApiTags = {
  CLIENTS: 'clients',
  ORDERS: 'orders',
  USERS: 'users',
} as const;

export type ApiTag = (typeof ApiTags)[keyof typeof ApiTags];

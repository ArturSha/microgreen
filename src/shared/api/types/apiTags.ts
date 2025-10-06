export const ApiTags = {
  CLIENTS: 'clients',
  ORDERS: 'orders',
  USERS: 'users',
  PRODUCT: 'product',
} as const;

export type ApiTag = (typeof ApiTags)[keyof typeof ApiTags];

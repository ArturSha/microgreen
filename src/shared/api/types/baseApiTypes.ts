export interface BaseGetParams {
  q?: string;
  metafields?: boolean;
  sort?: string | string[];
  dir?: number[];
  totals?: boolean;
  max?: number;
  skip?: number;
}

export interface PaginationMeta {
  total: number;
  count: number;
  skip: number;
  max: number;
}

export interface RestDBResponse<T> {
  data: T[];
  totals: PaginationMeta;
}

export type MongoUpdateOperators<T> = {
  $set?: Partial<T>;
  $inc?: Partial<Record<keyof T, number>>;
  $push?: Partial<Record<keyof T, unknown>>;
  $pull?: Partial<Record<keyof T, unknown>>;
};

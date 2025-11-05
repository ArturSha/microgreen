export interface BaseGetParams {
  metafields?: boolean;
  sort?: string | string[];
  dir?: number[];
}

export type MongoUpdateOperators<T> = {
  $set?: Partial<T>;
  $inc?: Partial<Record<keyof T, number>>;
  $push?: Partial<Record<keyof T, unknown>>;
  $pull?: Partial<Record<keyof T, unknown>>;
};

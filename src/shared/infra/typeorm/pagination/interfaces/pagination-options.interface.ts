import { FindConditions } from 'typeorm';

export interface IPaginationOptions<T> {
  page?: number | string;
  limit?: number | string;
  where?: FindConditions<T>[] | FindConditions<T>;
  sortBy?: { [P in keyof T]: 'DESC' | 'ASC' };
  relations?: string[];
}

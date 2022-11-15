import { FindConditions } from 'typeorm';

export interface IPaginationOptions<T> {
  page?: number | string;
  limit?: number | string;
  where?: FindConditions<T>[] | FindConditions<T>;
  sortBy?: { [column: string]: 'DESC' | 'ASC' };
  relations?: string[];
}

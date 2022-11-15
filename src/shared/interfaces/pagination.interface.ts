import { IPaginationMetadata } from './pagination-metadata.interface';

export interface IPagination<PaginationObject> {
  items: PaginationObject[];
  metadata: IPaginationMetadata;
}

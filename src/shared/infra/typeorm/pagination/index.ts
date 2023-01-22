import { Repository } from 'typeorm';

import { IPaginationMetadata } from '@shared/domain/models/pagination-metadata.interface';
import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { IPagination } from '@shared/domain/models/pagination.interface';

async function pagination<PaginationObject>(
  repository: Repository<PaginationObject>,
  paginationOptions: IPaginationOptions,
): Promise<IPagination<PaginationObject>> {
  const { relations } = paginationOptions;
  const limit = Number(paginationOptions.limit) || 50;
  const page = Number(paginationOptions.page) || 1;

  const [items, totalItems] = await repository.findAndCount({
    relations,
    take: limit,
    skip: (page - 1) * limit,
  });

  const totalPages = Math.ceil(totalItems / Number(limit));
  const quantityItemsReturned = items.length;

  const metadata: IPaginationMetadata = {
    totalItems,
    totalPages,
    currentPage: Number(page),
    itemsPerPage: Number(limit),
    quantityItemsReturned: quantityItemsReturned,
  };

  return {
    items,
    metadata,
  };
}

export default pagination;

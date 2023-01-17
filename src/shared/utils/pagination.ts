import { Repository } from 'typeorm';

import { IPaginationMetadata } from '../interfaces/pagination-metadata.interface';
import { IPagination } from '../interfaces/pagination.interface';
import { IPaginationOptions } from '../interfaces/pagination-options.interface';

async function pagination<PaginationObject>(
  repository: Repository<PaginationObject>,
  paginationOptions: IPaginationOptions<PaginationObject>,
): Promise<IPagination<PaginationObject>> {
  const { where, sortBy, relations } = paginationOptions;
  const limit = Number(paginationOptions.limit) || 50;
  const page = Number(paginationOptions.page) || 1;

  const [items, totalItems] = await repository.findAndCount({
    relations,
    where,
    order: sortBy,
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

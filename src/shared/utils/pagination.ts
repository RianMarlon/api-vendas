import { Repository, SelectQueryBuilder } from 'typeorm';

import { camelCaseToSnakeCase } from './camel-case-to-snake-case';

import { IPaginationMetadata } from '../interfaces/pagination-metadata.interface';
import { IPagination } from '../interfaces/pagination.interface';
import { IPaginationOptions } from '../interfaces/pagination-options.interface';

function tableName(alias: string, path: string): string {
  return `${alias}_${path.replace('.', '_')}`;
}

function tableWithField(alias: string, path: string): string {
  const pathSplitted = path.split('.');
  const field = pathSplitted.pop();

  if (pathSplitted.length > 0) {
    return `${alias}_${pathSplitted.join('_')}.${field}`;
  }

  return `${alias}.${field}`;
}

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

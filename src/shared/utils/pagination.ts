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
  repository:
    | Repository<PaginationObject>
    | SelectQueryBuilder<PaginationObject>,
  paginationOptions: IPaginationOptions<PaginationObject>,
): Promise<IPagination<PaginationObject>> {
  const { where, sortBy, relations } = paginationOptions;
  const limit = Number(paginationOptions.limit) || 50;
  const page = Number(paginationOptions.page) || 1;

  let queryBuilder: SelectQueryBuilder<PaginationObject>;

  if (repository instanceof Repository) {
    queryBuilder = repository
      .createQueryBuilder('e')
      .limit(limit)
      .offset((page - 1) * limit);
  } else {
    queryBuilder = repository;
    queryBuilder.limit(limit).offset((page - 1) * limit);
  }

  if (relations) {
    relations.forEach(relation => {
      queryBuilder.leftJoinAndSelect(
        tableWithField(queryBuilder.alias, relation),
        tableName(queryBuilder.alias, relation),
      );
    });
  }

  if (sortBy) {
    for (const key of Object.keys(sortBy)) {
      const tableWithFieldInSnakeCase = camelCaseToSnakeCase(
        tableWithField(queryBuilder.alias, key),
      );

      queryBuilder.addOrderBy(tableWithFieldInSnakeCase, sortBy[key]);
    }
  }

  if (where) {
    queryBuilder.andWhere({
      whereFactory: () => where,
    });
  }

  const items = await queryBuilder.getMany();
  const totalItems = await queryBuilder.getCount();
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

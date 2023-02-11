import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { IPagination } from '@shared/domain/models/pagination.interface';
import { ICreateProduct } from '../models/create-product.interface';
import { IProduct } from '../models/product.interface';

export interface IProductsRepository {
  findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<IPagination<IProduct>>;
  findAllByIds(ids: string[]): Promise<IProduct[]>;
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  create(productToCreate: ICreateProduct): Promise<IProduct>;
  update(
    id: string,
    productToUpdate: Partial<ICreateProduct>,
  ): Promise<IProduct>;
  updateProducts(productsToUpdate: IProduct[]): Promise<IProduct[]>;
  delete(id: string): Promise<void>;
}

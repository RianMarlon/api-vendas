import { In, Repository } from 'typeorm';

import { IPagination } from '@shared/domain/models/pagination.interface';
import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { dataSource } from '@shared/infra/typeorm';
import { pagination } from '@shared/infra/typeorm/pagination';

import Product from '../entities/product';
import { IProductsRepository } from '../../../domain/repositories/products-repository.interface';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  async findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<IPagination<Product>> {
    return await pagination<Product>(this.repository, paginationOptions);
  }

  async findAllByIds(ids: string[]): Promise<Product[]> {
    return await this.repository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findByName(name: string): Promise<Product | null> {
    return await this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async create(productToCreate: Product): Promise<Product> {
    const productCreated = this.repository.create(productToCreate);
    await this.repository.save(productCreated);

    return productCreated;
  }

  async update(
    id: string,
    productToUpdate: Partial<Product>,
  ): Promise<Product> {
    const productUpdated = this.repository.create({
      ...productToUpdate,
      id,
    });

    await this.repository.save(productUpdated);

    return productUpdated;
  }

  async updateProducts(productsToUpdate: Product[]): Promise<Product[]> {
    await this.repository.save(productsToUpdate);
    return productsToUpdate;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ProductsRepository;

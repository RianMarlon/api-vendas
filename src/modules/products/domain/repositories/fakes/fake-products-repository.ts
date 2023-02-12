import { UUID } from '@shared/utils/uuid';
import { IPaginationOptions } from '@shared/domain/models/pagination-options.interface';
import { IPagination } from '@shared/domain/models/pagination.interface';

import { IProductsRepository } from '@modules/products/domain/repositories/products-repository.interface';
import { IProduct } from '../../models/product.interface';
import { ICreateProduct } from '../../models/create-product.interface';

class FakeProductsRepository implements IProductsRepository {
  private products: IProduct[] = [];

  async findAll(
    paginationOptions: IPaginationOptions,
  ): Promise<IPagination<IProduct>> {
    const limit = Number(paginationOptions.limit) || 50;
    const page = Number(paginationOptions.page) || 1;

    const items = this.products.slice((page - 1) * limit, limit * page);
    const totalPages = Math.ceil(this.products.length / Number(limit));
    const quantityItemsReturned = items.length;

    return {
      items,
      metadata: {
        totalItems: this.products.length,
        totalPages,
        currentPage: Number(page),
        itemsPerPage: Number(limit),
        quantityItemsReturned: quantityItemsReturned,
      },
    } as IPagination<IProduct>;
  }

  async findAllByIds(ids: string[]): Promise<IProduct[]> {
    return this.products.filter(product => ids.includes(product.id));
  }

  async findByName(name: string): Promise<IProduct | null> {
    return this.products.find(product => product.name === name) || null;
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.products.find(product => product.id === id) || null;
  }

  async create(productToCreate: ICreateProduct): Promise<IProduct> {
    const uuid = new UUID();
    const product = {
      id: uuid.generate(),
      ...productToCreate,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IProduct;

    this.products.push(product);

    return product;
  }

  async update(
    id: string,
    productToUpdate: Partial<ICreateProduct>,
  ): Promise<IProduct> {
    const indexOfProduct = this.products.findIndex(
      product => product.id === id,
    );
    const newProduct = {
      ...this.products[indexOfProduct],
      ...productToUpdate,
      updatedAt: new Date(),
    } as IProduct;

    this.products[indexOfProduct] = newProduct;

    return newProduct;
  }

  async updateProducts(productsToUpdate: IProduct[]): Promise<IProduct[]> {
    return productsToUpdate.map(productToUpdate => {
      const productIndex = this.products.findIndex(
        product => product.id === productToUpdate.id,
      );

      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...productToUpdate,
          updatedAt: new Date(),
        };
        return this.products[productIndex];
      }

      return productToUpdate;
    });
  }

  async delete(id: string): Promise<void> {
    const indexOfProduct = this.products.findIndex(
      product => product.id === id,
    );
    this.products.splice(indexOfProduct, 1);
  }
}

export default FakeProductsRepository;

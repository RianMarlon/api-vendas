import { getRepository } from 'typeorm';

import Product from '../entities/product';

class ProductsRepository {
  private readonly repository = getRepository(Product);

  async findByName(name: string): Promise<Product | undefined> {
    return await this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<Product | undefined> {
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

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ProductsRepository;

import { inject, injectable } from 'tsyringe';

import { IPagination } from '@shared/infra/typeorm/pagination/interfaces/pagination.interface';

import { ICustomer } from '../domain/models/customer.interface';
import { ICustomersRepository } from '../domain/repositories/customers-repository.interface';

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(
    page?: number | string,
    limit?: number | string,
  ): Promise<IPagination<ICustomer>> {
    return await this.customersRepository.findAll({ page, limit });
  }
}

export default ListCustomersService;

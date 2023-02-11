import 'reflect-metadata';

import FakeProductsRepository from '@modules/products/domain/repositories/fakes/fake-products-repository';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/fake-customers-repository';
import CreateOrderService from '../create-order-service';
import FakeOrdersRepository from '@modules/orders/domain/repositories/fakes/fake-orders-repository';

let fakeProductsRepository: FakeProductsRepository;
let fakeCustomersRepository: FakeCustomersRepository;
let fakeOrdersRepository: FakeOrdersRepository;
let createOrderService: CreateOrderService;

describe('CreateOrderService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeCustomersRepository,
      fakeProductsRepository,
    );
  });

  it('should create a new order', async () => {
    const products = [];
    products.push(
      await fakeProductsRepository.create({
        name: 'Teste',
        price: 25,
        quantity: 15,
      }),
    );
    products.push(
      await fakeProductsRepository.create({
        name: 'Teste',
        price: 45,
        quantity: 30,
      }),
    );

    const customer = await fakeCustomersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
    });

    const order = await createOrderService.execute({
      customerId: customer.id,
      products: products.map(product => ({
        id: product.id,
        quantity: 5,
      })),
    });

    expect(order).toMatchObject({
      customer,
      ordersProducts: products.map(product => ({
        productId: product.id,
        price: product.price,
        quantity: 5,
      })),
    });
    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('createdAt');
    expect(order).toHaveProperty('updatedAt');
  });

  it('should throw an error when the customer not exists', async () => {
    const products = [];
    products.push(
      await fakeProductsRepository.create({
        name: 'Teste',
        price: 25,
        quantity: 15,
      }),
    );

    await fakeCustomersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
    });

    products.push(
      await fakeProductsRepository.create({
        name: 'Teste',
        price: 45,
        quantity: 30,
      }),
    );

    await expect(
      createOrderService.execute({
        customerId: 'teste',
        products: products.map(product => ({
          id: product.id,
          quantity: 5,
        })),
      }),
    ).rejects.toEqual({
      message: 'Could not find any customer with the given id',
      statusCode: 404,
    });
  });

  it('should throw an error when not found a product with the id', async () => {
    const products = [];
    products.push(
      await fakeProductsRepository.create({
        name: 'Teste',
        price: 25,
        quantity: 15,
      }),
    );
    const customer = await fakeCustomersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
    });

    await expect(
      createOrderService.execute({
        customerId: customer.id,
        products: [
          {
            id: products[0].id,
            quantity: 5,
          },
          { id: 'teste', quantity: 5 },
        ],
      }),
    ).rejects.toEqual({
      message: 'Could not find product teste',
      statusCode: 404,
    });
  });

  it('should throw an error when not found any product', async () => {
    await fakeProductsRepository.create({
      name: 'Teste',
      price: 25,
      quantity: 15,
    });

    const customer = await fakeCustomersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
    });

    await expect(
      createOrderService.execute({
        customerId: customer.id,
        products: [
          {
            id: 'teste',
            quantity: 5,
          },
        ],
      }),
    ).rejects.toEqual({
      message: 'Could not find any product with the given id',
      statusCode: 404,
    });
  });

  it('should throw an error when quantity prodcut in stock is letter than quantity of order', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Teste',
      price: 25,
      quantity: 15,
    });

    const customer = await fakeCustomersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
    });

    await expect(
      createOrderService.execute({
        customerId: customer.id,
        products: [
          {
            id: product.id,
            quantity: 10,
          },
          {
            id: product.id,
            quantity: 10,
          },
        ],
      }),
    ).rejects.toEqual({
      message: `The quantity 20 is not available for ${product.id}`,
      statusCode: 400,
    });
  });
});

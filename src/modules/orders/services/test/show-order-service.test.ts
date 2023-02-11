import 'reflect-metadata';

import FakeOrdersRepository from '@modules/orders/domain/repositories/fakes/fake-orders-repository';
import ShowOrderService from '../show-order-service';

let fakeOrdersRepository: FakeOrdersRepository;
let showOrderService: ShowOrderService;

describe('ShowOrderService', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    showOrderService = new ShowOrderService(fakeOrdersRepository);
  });

  it('should return order data by id', async () => {
    const orderCreated = await fakeOrdersRepository.create({
      customer: {
        id: 'teste',
        name: 'teste',
        email: 'teste@teste.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      products: [
        {
          productId: 'teste',
          quantity: 10,
          price: 10,
        },
      ],
    });

    const orderFounded = await showOrderService.execute(orderCreated.id);
    expect(orderFounded).toMatchObject(orderCreated);
    expect(orderFounded).toHaveProperty('id');
    expect(orderFounded).toHaveProperty('createdAt');
    expect(orderFounded).toHaveProperty('updatedAt');
  });

  it('should throw an error when not exists an order with the id', async () => {
    await fakeOrdersRepository.create({
      customer: {
        id: 'teste',
        name: 'teste',
        email: 'teste@teste.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      products: [
        {
          productId: 'teste',
          quantity: 10,
          price: 10,
        },
      ],
    });

    await expect(showOrderService.execute('teste')).rejects.toEqual({
      message: 'Order not found',
      statusCode: 404,
    });
  });
});

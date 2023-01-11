import { Request, Response, Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ListProductsController from '../controllers/list-products-controller';
import ShowProductController from '../controllers/show-product-controller';
import CreateProductController from '../controllers/create-product-controller';
import UpdateProductController from '../controllers/update-product-controller';
import DeleteProductController from '../controllers/delete-product-controller';

const listProductsController = new ListProductsController();
const showProductController = new ShowProductController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

const productsRouter = Router();

productsRouter.get('/', (request: Request, response: Response) =>
  listProductsController.handleRequest(request, response),
);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request: Request, response: Response) =>
    showProductController.handleRequest(request, response),
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().integer().required(),
    },
  }),
  (request: Request, response: Response) =>
    createProductController.handleRequest(request, response),
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      price: Joi.number().precision(2).optional(),
      quantity: Joi.number().integer().optional(),
    },
  }),
  (request: Request, response: Response) =>
    updateProductController.handleRequest(request, response),
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request: Request, response: Response) =>
    deleteProductController.handleRequest(request, response),
);

export default productsRouter;

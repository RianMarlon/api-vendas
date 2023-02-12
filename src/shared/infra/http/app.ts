import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/app-error';

import rateLimiter from './middlewares/rate-limiter';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    if (error instanceof SyntaxError) {
      return response.status(400).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export { app };

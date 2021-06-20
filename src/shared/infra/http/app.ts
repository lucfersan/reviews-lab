import 'reflect-metadata';
import { config } from 'dotenv-flow';
config({ silent: true });

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { HttpException } from '@shared/errors/HttpException';
import '@shared/container';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof HttpException) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

export { app };

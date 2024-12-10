import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Express, Request } from 'express';
import { Container } from 'typedi';

useContainer(Container);

function getCorsOptions(req: Request, callback: CallableFunction) {
  const getOriginValue = () => {
    const value = String(req.headers.origin).includes('http://localhost');

    if(value) {
      return true;
    }
    return false;
  };

  const corsOptions = {
    preflightContinue: false,
    origin: getOriginValue(),
    credentials: true,
    optionsSuccessStatus: 200,
  };
  callback(null, corsOptions);
}

export const routingControllerOptions = {
  routePrefix: `/api/v1/`,
  controllers: [__dirname + '/controllers/**/*{.js,.ts}'],
  middlewares: [__dirname + '/middlewares/**/*{.js,.ts}'],
  interceptors: [__dirname + '/interceptors/**/*{.js,.ts}'],
  validation: { validationError: { target: false, value: false } },
  classTransformer: true,
  cors: getCorsOptions,
  defaultErrorHandler: false,
  defaults: {
    nullResultCode: 404,
    undefinedResultCode: 204,
    paramOptions: {
      required: true,
    },
  },
};

export const app: Express = createExpressServer(routingControllerOptions);
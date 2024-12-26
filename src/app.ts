import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Express, Request } from 'express';
import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { logger } from './libs';
import { config } from 'dotenv';
import session from 'express-session';
import "./configs/passport";
import passport from "passport";

config();

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

// Initialize sequelize
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: Number(process.env.DB_PORT),
  models: [__dirname + '/models/**/*{.js,.ts}'],
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export const app: Express = createExpressServer(routingControllerOptions);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

(async () => {
  await connectDB();
})();
import { HttpError } from 'routing-controllers';
import { ObjectGeneric } from 'src/interfaces';

export class ThrowableErrorHandler extends HttpError {
  public httpCode: number;
  public message: string;
  public dataObject: ObjectGeneric | undefined;

  constructor(httpCode: number, message: string, data?: ObjectGeneric) {
    super(httpCode, message);
    this.name = 'CustomError';
    this.httpCode = httpCode;
    this.message = message;
    this.dataObject = data;
  }
}
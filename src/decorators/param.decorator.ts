import { validateSync } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { plainToClass } from 'class-transformer';
import { Action, createParamDecorator } from 'routing-controllers';
import { ThrowableErrorHandler } from '../libs/error.handler';
import { DecryptBodyOptions } from '../interfaces';

export function ParamDecorator(options: DecryptBodyOptions) {
  return createParamDecorator({
    value: (action: Action) => {
      const token = action.request.body;
      const decryptedToken = token;
      let validateResult;
      let decryptedObj;

      if (Array.isArray(decryptedToken)) {
        decryptedObj = decryptedToken.map((obj) => plainToClass(options.class, obj));
        validateResult = decryptedObj.map((obj) => validateSync(obj));
      } else {
        decryptedObj = plainToClass(options.class, decryptedToken);
        validateResult = validateSync(decryptedObj);
      }

      if (validateResult.length > 0) {
        throw new ThrowableErrorHandler(StatusCodes.BAD_REQUEST, 'ValidationError', validateResult[0]);
      } else {
        return decryptedObj;
      }
    },
  });
}

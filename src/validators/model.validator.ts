import { BaseValidator } from './base.validator';
import { Service } from 'typedi';
import { validate, validateOrReject, ValidationError } from 'class-validator';
import { ObjectGeneric } from '../interfaces';

@Service()
export class ModelValidator extends BaseValidator {
  // public static async validateAttributes(
  //   model: BaseModel,
  //   reject = true,
  //   opts?: ObjectGeneric,
  // ): Promise<ValidationError[] | void> {
  //   try {
  //     if (reject === true) {
  //       return await validateOrReject(model, opts);
  //     } else {
  //       const validateResult = await validate(model, opts);

  //       return validateResult;
  //     }
  //   } catch (errors) {
  //     return Promise.reject(errors);
  //   }
  // }
}

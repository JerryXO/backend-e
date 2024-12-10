import { OK } from 'http-status-codes';
import { ResponseBody, ComposeBodyAttrs } from '../interfaces';

export class ResponseBuilder {
  public static composeBody(attrs: ComposeBodyAttrs): ResponseBody {
    // default attributes of response body
    const bodyBase = {
      error: false,
      statusCode: OK,
      message: 'Success!',
    };

    // add additional attributes as well as overwrite existing ones with given values
    Object.assign(bodyBase, attrs);

    return bodyBase;
  }
}

import httpStatus from 'http-status';

/***
 * refere these links for more details
 *      - https://expressjs.com/en/guide/error-handling.html
 *      - https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7
 *      - https://stackoverflow.com/questions/27794750/node-js-with-express-throw-error-vs-nexterror
 ***/
export class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return httpStatus.BAD_REQUEST;
    }
    if (this instanceof NotFound) {
      return httpStatus.NOT_FOUND;
    }
    return httpStatus.INTERNAL_SERVER_ERROR;
  }
}

export class BadRequest extends GeneralError {}
export class NotFound extends GeneralError {}

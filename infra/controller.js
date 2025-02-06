import {
  InternalServerError,
  MethodNotAllowedError,
  BadRequestError,
} from "infra/errors";

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(error, request, response) {
  const publicErrorObject = error.statusCode
    ? error
    : new InternalServerError({
        statusCode: error.statusCode,
        cause: error,
      });

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onBadRequestHandler(request, response) {
  const publicErrorObject = new BadRequestError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: [onNoMatchHandler, onBadRequestHandler],
    onError: onErrorHandler,
  },
};

export default controller;

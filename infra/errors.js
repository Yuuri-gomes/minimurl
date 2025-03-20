class ApiError extends Error {
  constructor({ name, message, action, statusCode, cause }) {
    super(message, { cause });
    this.name = name;
    this.action = action;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class InternalServerError extends ApiError {
  constructor({ cause, statusCode }) {
    super({
      name: "InternalServerError",
      message: "Um erro interno não esperado aconteceu.",
      action: "Entre em contato com o suporte.",
      statusCode: statusCode || 500,
      cause,
    });
  }
}

export class ServiceError extends ApiError {
  constructor({ cause, message }) {
    super({
      name: "ServiceError",
      message: message || "Serviço indisponível no momento.",
      action: "Verifique se o serviço está disponível.",
      statusCode: 503,
      cause,
    });
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor() {
    super({
      name: "MethodNotAllowedError",
      message: "Método não permitido para este endpoint.",
      action: "Verifique se o método HTTP enviado é válido para este endpoint.",
      statusCode: 405,
    });
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Requisição inválida.") {
    super({
      name: "BadRequestError",
      message,
      action: "Verifique os dados enviados na requisição.",
      statusCode: 400,
    });
  }
}

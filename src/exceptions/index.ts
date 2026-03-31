import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  constructor(message = "Invalid request.", details?: any) {
    super(message, 400, "BAD_REQUEST", details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized. Authentication is required.", details?: any) {
    super(message, 401, "UNAUTHORIZED", details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to access this resource.", details?: any) {
    super(message, 403, "FORBIDDEN", details);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found.", details?: any) {
    super(message, 404, "NOT_FOUND", details);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Data conflict. The resource already exists.", details?: any) {
    super(message, 409, "CONFLICT", details);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(
    message = "The request was well-formed but was unable to be followed due to semantic errors.",
    details?: any,
  ) {
    super(message, 422, "UNPROCESSABLE_ENTITY", details);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "An internal server error occurred.", details?: any) {
    super(message, 500, "INTERNAL_SERVER_ERROR", details);
  }
}

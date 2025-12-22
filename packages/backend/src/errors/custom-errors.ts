export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class BookCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BookCreationError';
  }
}

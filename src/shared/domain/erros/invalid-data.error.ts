export class InvalidDatasError extends Error {
  static readonly message = 'Invalid data';

  constructor() {
    super(InvalidDatasError.message);
    this.name = 'InvalidCredentialsError';
  }
}

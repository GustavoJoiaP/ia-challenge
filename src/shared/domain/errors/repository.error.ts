export class RepositoryError extends Error {
  constructor(
    message: string,
    public readonly operation: string,
    public readonly entity: string,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = 'RepositoryError';
  }
}

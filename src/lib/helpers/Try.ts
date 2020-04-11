
export class Success<TSuccess> implements Try<TSuccess, void> {
  constructor(public value: TSuccess) {}
}

export class Failure<TFailure> implements Try<void, TFailure> {
  constructor(public value: TFailure) {}
}

export interface Try<TSuccess, TFailure> {
  value: TSuccess | TFailure
}

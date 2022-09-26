import CustomError from "./CustomError.js";

export class KeyError extends CustomError {
  constructor(key: string | Symbol) {
    super(`Key <${String(key)}> is not available.`);
  }
}

export class WindowsListError extends CustomError {
  constructor() {
    super("There was an issue during retrieving windows list. Try again.");
  }
}

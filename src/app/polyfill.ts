
declare global {
  interface Array<T> {
      isArray: boolean;
  }
}

Array.prototype.isArray = true;

export { };

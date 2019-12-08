function UserError(message: string) {
  Error.call(this);

  if ((Error as any).captureStackTrace) {
    (Error as any).captureStackTrace(this, this.constructor);
  }

  this.name = this.constructor.name;
  this.message = message;
}

UserError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: UserError,
    configurable: true,
    enumerable: false,
    writable: true
  }
});

Object.setPrototypeOf(UserError, Error);

export default UserError as ErrorConstructor;

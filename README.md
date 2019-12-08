# user_error

[![tag](https://img.shields.io/github/release/denomod/user_error)](https://github.com/denomod/user_error/releases)
[![Build Status](https://github.com/denomod/user_error/workflows/ci/badge.svg?branch=master)](https://github.com/denomod/user_error/actions)
[![license](https://img.shields.io/github/license/denomod/user_error)](https://github.com/denomod/user_error/blob/master/LICENSE)
[![](https://img.shields.io/badge/deno-v0.26.0-green.svg)](https://github.com/denoland/deno)

UserError is a base class that makes JavaScript errors a lot more useful.
It gives you:

- An `Error` subclass that actually works
- Support for checking error types using `instanceof`
- A correct `name` property on error objects
- Cleaner stack traces

## Usage

```ts
import UserError from "https://deno.land/x/user_error/mod.ts";

class MyError extends UserError {
  constructor(message) {
    super(message);
  }
}
```

## Rationale

To see the problems UserError solves for you, let's try to subclass `Error` directly and see what happens.

```ts
class MyError extends Error {
  constructor(message) {
    super(message);
  }
}

const boom = () => {
  throw new MyError("boom!");
};

try {
  boom();
} catch (error) {
  error instanceof Error; // true  (correct)
  error instanceof MyError; // false (wrong, should be true)
  error.name; // Error (wrong, should be MyError)
}
```

In this example, subclassing `Error` is useless;
we can't really differentiate an instance of `MyError` from any other `Error` in the system.
This inability to subclass `Error` has led to a number of other workarounds,
most often adding some kind of `code` property to error objects,
so you end up doing stuff like this:

```ts
if (error.code === SomeErrorCode)
  // ...
```

In addition to this problem, errors created in this way include extra noise in their stack trace:

```log
Error: boom!                              << should be "MyError: boom!"
    at MyError.Error (native)             << noise
    at new MyError (test.js:3:7)          << noise
    at boom (test.js:10:9)
    at Object.<anonymous> (test.js:14:3)
```

UserError aims to fix these problems. Now, when we run the example it looks like this:

```ts
import UserError from "https://deno.land/x/user_error/mod.ts";

class MyError extends UserError {
  constructor(message) {
    super(message);
  }
}

const boom = () => {
  throw new MyError("boom!");
};

try {
  boom();
} catch (error) {
  error instanceof Error; // true
  error instanceof MyError; // true
  error.name; // MyError
}
```

Since both `instanceof` work and the `name` property is setup correctly, we can do either

```ts
if (error instanceof MyError)
  // ...
```

or

```ts
if (error.name === 'MyError')
  // ...
```

instead of duck-typing with a custom property.
Additionally, the stack trace doesn't contain unnecessary entries:

```log
MyError: boom!
    at boom (test.js:10:9)
    at Object.<anonymous> (test.js:14:3)
```

### License

[user_error](https://github.com/denomod/user_error) is released under the MIT License.
See the bundled [LICENSE](./LICENSE) file for details.

## Thanks

Heavily inspired by [mjackson/usererror](https://github.com/mjackson/usererror).

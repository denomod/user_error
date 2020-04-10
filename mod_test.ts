import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import UserError from "./mod.ts";

Deno.test({
  name: "test UserError",
  fn(): void {
    const error = new UserError("Bang!");
    assertEquals(error.name, "UserError");
    assertEquals(error.message, "Bang!");
  },
});

Deno.test({
  name: "test UserError subclass instance",
  fn(): void {
    class MyError extends UserError {
      constructor(message = "Boom!") {
        super(message);
      }
    }
    const error = new MyError("Bang!");
    assertEquals(error.name, "MyError");
    assertEquals(error.message, "Bang!");
  },
});

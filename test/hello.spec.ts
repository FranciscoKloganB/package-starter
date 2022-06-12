import { getWorld, proxy } from "@src/hello";

test("getWorld returns world", () => {
  const result = getWorld();
  expect(result).toEqual("world");
});

test("proxy calls the function that was given", () => {
  const fn = jest.fn();

  proxy(fn);

  expect(fn).toHaveBeenCalledTimes(1);
});

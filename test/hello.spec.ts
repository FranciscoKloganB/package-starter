import { getWorld } from "@src/hello";

test("getWorld returns world", () => {
  const result = getWorld();
  expect(result).toEqual("world");
});

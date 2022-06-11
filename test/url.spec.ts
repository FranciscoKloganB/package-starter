import { isHyperTransferURL, querify } from "../src";

describe("isHyperTransferUrl", () => {
  const cases = [
    ["http://google.com", true],
    ["http://google.com/cart", true],
    ["http://t1.google.com", true],
    ["http://t1.google.com/cart", true],
    ["http://t1.google.com/cart?query=1", true],
    ["http://t1.google.com/cart?query=1&query_2", true],
    ["https://google.com", true],
    ["https://google.com/cart", true],
    ["https://t1.google.com", true],
    ["https://t1.google.com/cart", true],
    ["https://t1.google.com/cart?query=1", true],
    ["https://t1.google.com/cart?query=1&query_2", true],
    ["ftp://user.com", false],
    ["user@", false],
    ["useremail.com", false],
    ["user@email.com", false],
    ["someurl.com", false]
  ];

  test.each(cases)("isHyperTransferURL(%s) should be %s", (url, expected) => {
    const result = isHyperTransferURL(url as string);
    expect(result).toEqual(expected);
  });
});

describe("querify", () => {
  const cases = [
    [{ one: 1 }, "one=1"],
    [{ one: 1, two: 2 }, "one=1&two=2"],
    [{ one: 1, two: 2, three: undefined }, "one=1&two=2"]
  ];

  test.each<Record<string, any>>(cases)("querify(%p) should be %s", (obj, expected) => {
    const result = querify(obj);
    expect(result).toEqual(expected);
  });

  test("throws an error when given array as value of key", () => {
    expect(() => {
      querify({ one: [1, "hello", null] });
    }).toThrowError(Error);
  });
});

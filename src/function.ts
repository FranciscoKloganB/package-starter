function callAll(...functions: VariadicFn[]) {
  return (...args: any[]) => functions.forEach((fn) => fn && fn(...args));
}

export { callAll };

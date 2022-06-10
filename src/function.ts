function callAll(...functions: Function[]) {
  return (...args: any[]) => functions.forEach((fn) => fn && fn(...args));
}

export { callAll };

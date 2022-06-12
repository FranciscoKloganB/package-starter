type VariadicFn = (...args: any[]) => void;

function proxy(fn: VariadicFn) {
  fn();
}

function getWorld() {
  return "world";
}

export { getWorld, proxy };

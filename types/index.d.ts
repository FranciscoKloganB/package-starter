export {};

declare global {
  type VariadicFn = (...args: any[]) => void;
}

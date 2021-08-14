// import "utils/arrayExtensions";

export function uniq(array: any[]) {
  return Array.from(new Set(array));
}

export function range(from: number, to: number) {
  return Array.from<number, number>(
    { length: to - from + 1 },
    (_v, k) => k + from
  );
}

declare global {
  interface Array<T> {
    uniq(): Array<T>;
  }
}

Array.prototype.uniq = function () {
  return uniq(this);
};

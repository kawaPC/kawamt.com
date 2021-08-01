// import "utils/arrayExtensions";

export function uniq(array: any[]) {
  return Array.from(new Set(array));
}

declare global {
  interface Array<T> {
    uniq(): Array<T>;
  }
}

Array.prototype.uniq = function () {
  return uniq(this);
};

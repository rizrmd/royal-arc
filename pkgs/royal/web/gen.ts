export const extendGen = <T extends object>(object:T) => {
  return new Proxy(object, {
    get(target, p, receiver) {
    },
  }) as T;
};

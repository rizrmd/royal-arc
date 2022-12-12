export function jsonReplacer(key: any, value: any) {
  if (value == null || value.constructor != Object) {
    return value;
  }
  return Object.keys(value).sort().reduce((s, k) => {
    s[k] = value[k];
    return s;
  }, {});
}

export function camelCaseToSnakeCase(value: string) {
  return value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

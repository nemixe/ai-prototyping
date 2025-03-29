// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Example:
 *   Input: {
 *    name: "John",
 *    age: 30,
 *    active: true,
 *    hobby: null,
 *    phone: undefined,
 *    score: 0,
 *   }
 *   Output: {
 *    name: "John",
 *    age: "30",
 *    active: "true",
 *    score: "0",
 *   }
 **/
export const objectValueToString = (
  object: Record<string, unknown>,
): Record<string, string> => {
  return Object.entries(object).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        return { ...acc, [key]: value.toString() };
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};

/**
 * Example:
 *   Input: {"name": "John", "age": 30}
 *   Output: true
 **/
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const urlParser = (path, params) => {
  return path.replace(/:(\w+)/g, (_, key) => {
    if (params[key] !== undefined) {
      return encodeURIComponent(params[key].toString());
    }
    throw new Error(`Missing parameter: ${key}`);
  });
};

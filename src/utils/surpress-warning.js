const originalConsoleError = console.error;

console.error = function (...args) {
  if (
    args[0]?.includes?.("findDOMNode is deprecated") ||
    args[0]?.includes?.("Warning: Legacy context API")
  ) {
    return;
  }
  originalConsoleError.apply(console, args);
};

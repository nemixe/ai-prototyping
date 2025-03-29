export default {
  "./**/*.{ts,tsx}": () => "npx tsc --noEmit",

  "./**/*.{js,ts,tsx}": "eslint --fix",

  "./**/*.{js,ts,tsx,css,md}": "prettier --write",
};

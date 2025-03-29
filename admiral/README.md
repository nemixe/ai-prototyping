# admiral

# Requirement

- NodeJS LTS 20.11.0
- PNPM 8.14.1
- NVM (Node Version Manager) - To easily switch between node version

# Library

- Typescript v5.2.2
- Ant Design v5.16.0

# How to contribute

Please read [this page](https://gitlab.dot.co.id/design-system/admiral/-/wikis/Contributing-to-Admin-Rapid-Development) before contribute to this project

# How to install

1. Add this to package.json (note: modify your target version, example: v2.0.0-beta.49)

```
    "admiral": "git+https://gitlab+deploy-token-15:gldt-zP9L2FNxM7yLmGqrDjMG@gitlab.dot.co.id/design-system/admiral#v2.0.0-beta.49",
    "antd": "5.16.2",

```

2. Run `pnpm install`
3. Add this to next config

```
transpilePackages: ["admiral"],
```

Also please read [this page](https://gitlab.dot.co.id/design-system/admiral/-/wikis/How-to-install-in-Webpack-Project) for webpack project

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

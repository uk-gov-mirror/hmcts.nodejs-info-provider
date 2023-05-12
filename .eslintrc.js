module.exports = {
  "env": {
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "root": true,
  ignorePatterns: ["src/__mocks__/**"]
};

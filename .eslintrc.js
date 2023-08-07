module.exports = {
  extends: ["airbnb-base", "prettier"],
  env: { node: true },
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": ["error", "always", { js: "never" }],
    "arrow-parens": ["error", "always"],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true }
    ],
    "no-restricted-syntax": "off",
    quotes: ["error", "double"],
    semi: ["error", "never"]
  }
}

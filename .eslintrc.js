module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "jest",
    "promise",
    "prettier",
    "testing-library",
    "jest-dom",
    "import",
    "react"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "prettier",
    "plugin:testing-library/recommended",
    "plugin:jest-dom/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  parserOptions: {
    project: "tsconfig.json"
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "prettier/prettier": "error",
    "indent": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-member-accessibility": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "import/order": ["error"],
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}

module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["vuejs-accessibility"],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/prettier",
    "plugin:vuejs-accessibility/recommended",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  overrides: [
    {
      files: ["**/tests/*.spec.js"],
      env: {
        jest: true,
      },
    },
  ],
};

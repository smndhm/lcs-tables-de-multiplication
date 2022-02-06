module.exports = {
  collectCoverage: true,
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: ["**/tests/*.spec.js"],
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
};

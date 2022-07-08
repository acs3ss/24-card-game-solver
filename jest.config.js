module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  // js-combinatorics is an ES Module.
  transformIgnorePatterns: ["/node_modules/(?!js-combinatorics)"],
};

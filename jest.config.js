/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  // testEnvironment: "node",
  // js-combinatorics is an ES Module.
  transformIgnorePatterns: ["/node_modules/(?!js-combinatorics)"],
};

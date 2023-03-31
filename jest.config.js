/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // js-with-ts to transform js-combinatorics.
  preset: "ts-jest/presets/js-with-ts",
  // js-combinatorics is an ES Module.
  transformIgnorePatterns: ["/node_modules/(?!js-combinatorics)"],
};

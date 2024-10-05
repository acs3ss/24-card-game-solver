import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig({
    // TODO: Change to "strictTypeChecked" when https://github.com/vuejs/eslint-config-typescript/issues/85 is fixed.
    extends: ["strict"],
  }),
  {
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "vue/multi-word-component-names": "off",
    },
  },
  {
    files: ["tests/**/*.test.ts"],
    rules: {
      // .to.be.empty, .to.be.true, etc. are valid Vitest assertions.
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  eslintPluginPrettierRecommended,
];

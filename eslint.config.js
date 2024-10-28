import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig({
    extends: ["strictTypeChecked"],
  }),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.vue"],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],
    },
  },
  {
    files: ["tests/**/*.test.ts"],
    rules: {
      // .to.be.empty, .to.be.true, etc. are valid Vitest assertions.
      "@typescript-eslint/no-unused-expressions": "off",
      // Complains about { rerender } in tests, which is okay.
      "@typescript-eslint/unbound-method": "off",
    },
  },
  eslintPluginPrettierRecommended,
];

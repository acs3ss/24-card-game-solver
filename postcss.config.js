/* eslint-disable */
// @ts-nocheck
const IN_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    IN_PRODUCTION &&
      require("@fullhuman/postcss-purgecss")({
        content: [`./public/**/*.html`, `./src/**/*.vue`],
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(
            /<style[^]+?<\/style>/gi,
            ""
          );

          const classes =
            Array.from(
              contentWithoutStyleBlocks.matchAll(/class="([^"]+?)"/g)
            ).map(match => match[1]);
          const styles = classes
            .map(styles => styles.split(" ")).flat();

          const ids =
            Array.from(
              contentWithoutStyleBlocks.matchAll(/id="([^"]+?)"/g)
            ).map(match => match[1]);

          const tags =
            Array.from(
              contentWithoutStyleBlocks.matchAll(/<(\w[\w-]*?)[^\w-]/g)
            ).map(match => match[1]);

          return styles.concat(ids).concat(tags);
        },
        safelist: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
        ],
      }),
  ],
};

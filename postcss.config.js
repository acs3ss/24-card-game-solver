import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";

const plugins = [];
if (process.env.NODE_ENV === "production") {
  plugins.push(
    purgeCSSPlugin({
      content: [`index.html`, `./src/**/*.vue`],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(
          /<style[^]+?<\/style>/gi,
          "",
        );

        const classes = Array.from(
          contentWithoutStyleBlocks.matchAll(/class="([^"]+?)"/g),
        ).map((match) => match[1]);
        const styles = classes.flatMap((styles) => styles.split(" "));

        const ids = Array.from(
          contentWithoutStyleBlocks.matchAll(/id="([^"]+?)"/g),
        ).map((match) => match[1]);

        const tags = Array.from(
          contentWithoutStyleBlocks.matchAll(/<(\w[\w-]*?)[^\w-]/g),
        ).map((match) => match[1]);

        return styles.concat(ids).concat(tags);
      },
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
      ],
    }),
  );
}

export default { plugins };

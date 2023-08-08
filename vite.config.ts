import handlebars from "vite-plugin-handlebars";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

export default {
  plugins: [
    handlebars(),
    createSvgSpritePlugin({
      symbolId: "icon-[name]-[hash]",
    }),
  ],
};

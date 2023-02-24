const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
const workboxPlugins = [
  new InjectManifest({
    swSrc: "./src-sw.js",
    swDest: "src-sw.js",
  }),
];

// TODO: Add CSS loaders and babel to webpack.
const cssLoader = {
  test: /.css$/i,
  use: ["style-loader", "css-loader"],
};

const babelLoader = {
  test: /.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
      plugins: [
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/transform-runtime",
      ],
    },
  },
};

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "J.A.T.E",
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Takes notes with JavaScript syntax highlighting!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve(__dirname, "src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
      ...workboxPlugins,
    ],
    module: {
      rules: [cssLoader, babelLoader],
    },
  };
};

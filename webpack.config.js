const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isAnalyze = process.env.ANALYZE === "true";

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: "./public/index.html",
    favicon: "./public/favicon.ico",
  }),
  new ESLintPlugin({
    extensions: ["ts", "tsx"], // Lint TypeScript files
    failOnError: false, // Prevent Webpack from stopping on lint errors
    emitWarning: true, // Show warnings in terminal
  }),
];

if (isAnalyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: plugins,
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
    client: {
      logging: "error", // Suppresses unnecessary logs
      overlay: false, // Prevents error overlay in browser
    },
  },
};

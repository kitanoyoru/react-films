import * as webpack from "webpack";
import * as path from "node:path";

import HtmlWebpackPlugin from "html-webpack-plugin";

const isProd = process.env.NODE_ENV === "production";

const config: webpack.Configuration = {
  mode: isProd ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts", ".scss", ".sass"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        },
        exclude: path.resolve(__dirname, "node_modules") 
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: path.resolve(__dirname, "node_modules"), 
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/i,
        exclude: path.resolve(__dirname, "node_modules"), 
        use: "svg-react-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      filename: "index.html",
    }),
  ],
};

export default config;

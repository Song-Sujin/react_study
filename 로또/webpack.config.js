const path = require("path"); // node에서 경로를 쉽게 조작할 수 있도록 해주는 것. path 가져오는 것
//const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
//process.env.NODE_ENV = "production";

module.exports = {
  name: "wordrelay-setting",
  mode: "development", // 실서비스: production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./client"],
  }, // 입력
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 chrome versions"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  //plugins: [new ReactRefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    //publicPath: "/dist",
  },
  // devServer: {
  //   devMiddleware: { publicPath: "/dist" },
  //   static: { directory: path.resolve(__dirname) },
  //   hot: true,
  // },
};

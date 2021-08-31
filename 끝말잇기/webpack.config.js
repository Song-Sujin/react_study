const path = require("path"); // node에서 경로를 쉽게 조작할 수 있도록 해주는 것. path 가져오는 것
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

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
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 5% in KR", "last 2 chrome versions"], // browserslist
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          //plugins: ["react-refresh/babel"],
        },
      },
    ],
  },
  //plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"), // path.join은 경로를 알아서 합쳐준다. 현재폴더 안에 들어있는 dist 폴더
    filename: "app.js",
    //publicPath: "/dist",
  }, // 출력
  /*
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },*/
};

const path = require("path");
const { webpack } = require("webpack");

module.exports = {
  mode: "development",
  devtool: "eval", // production일때는 hidden-sourse-map
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: "./client",
  },
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
        },
      },
    ],
  },

  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
};

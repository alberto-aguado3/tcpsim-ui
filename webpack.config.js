const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    //entry: path.resolve(__dirname, "src", "index.tsx"),
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    mode: "development",
    module: {
        rules: [
            /*
            {
                test: /\.[jt]sx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    }
                },
                exclude: /node_modules/,
            },
            */
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
              },
              {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
              },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        fullySpecified: false,
        symlinks: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        static: path.join(__dirname, "./src"),
        port: 3001,
        hot: "only",
        compress: true,
        open: true,
    },
};
const path = require("path");
const webpack = require("webpack");
const { AureliaPlugin, ModuleDependenciesPlugin, GlobDependenciesPlugin } = require("aurelia-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const bundleOutputDir = "./wwwroot/dist";

module.exports = (env, argv) => {
	if ((!argv || !argv.mode) && process.env.ASPNETCORE_ENVIRONMENT === "Development") {
		argv = { mode: "development" };
	}
	console.log("mode =", argv.mode);
	const isDevBuild = argv.mode !== "production";
	const cssLoaders = ["css-loader", "postcss-loader"];
	const scssLoaders = [...cssLoaders, "sass-loader"];

	return [{
		target: "web",
		mode: isDevBuild ? "development" : "production",
		entry: { "app": ["es6-promise/auto", "aurelia-bootstrapper"] },
		resolve: {
			extensions: [".ts", ".js"],
			modules: ["ClientApp", "node_modules"]
		},
		output: {
			path: path.resolve(bundleOutputDir),
			// Asp.Net JavaScriptServices does not tolerate "/" in public path, see https://github.com/aspnet/JavaScriptServices/issues/1495
			publicPath: "dist/",
			filename: "[name].[hash].js",
			chunkFilename: "[name].[chunkhash].js",
			pathinfo: false
		},
		module: {
			rules: [
				{ test: /\.(woff|woff2|png|eot|ttf|svg)(\?|$)/, use: { loader: "url-loader", options: { limit: 1, publicPath: "./" } } },
				{ test: /\.ts$/i, include: [/ClientApp/], loader: "ts-loader" },
				{ test: /\.html$/i, use: "html-loader" },
				{ test: /\.css$/i, include: [/node_modules/], issuer: /\.html$/i, use: cssLoaders },
				{ test: /\.css$/i, include: [/node_modules/], exclude: [/bootstrap.css$/, /font-awesome.css$/], issuer: [{ not: [{ test: /\.html$/i }] }], use: ["style-loader", ...cssLoaders] },
				{ test: /\.css$/, include: [/bootstrap.css$/, /font-awesome.css$/], use: [{ loader: MiniCssExtractPlugin.loader }, ...cssLoaders] },
				{ test: /\.scss$/i, issuer: /(\.html|empty-entry\.js)$/i, use: scssLoaders },
				{ test: /\.scss$/i, issuer: /\.ts$/i, use: ["style-loader", ...scssLoaders] }
			]
		},
		optimization: {
			splitChunks: {
				chunks: "all",
				// comment the following to avoid creatin a separate bundle for each npm module
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
							// or node_modules/packageName
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `npm.${packageName.replace('@', '')}`;
						}
					}
				}
			}
		},
		devtool: isDevBuild ? "source-map" : false,
		performance: {
			hints: false
		},
		plugins: [
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(isDevBuild) }),
			new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery", "window.jQuery": "jquery" }),
			new HtmlWebpackPlugin({ template: 'index.ejs', filename: "../../wwwroot/index.html", inject: false, metadata: {}, alwaysWriteToDisk: true }),
			new AureliaPlugin({ aureliaApp: "boot" }),
			new GlobDependenciesPlugin({ "boot": ["ClientApp/**/*.{ts,html}"] }),
			new ModuleDependenciesPlugin({}),
			new MiniCssExtractPlugin({
				filename: "[name].[hash].css",
				chunkFilename: "[name].[chunkhash].css"
			})
		],
		devServer: {
			contentBase: "wwwroot/",
			compress: true,
			writeToDisk: true,
			hot: false
		}
	}];
};

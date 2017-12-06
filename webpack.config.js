var path = require("path");

var commonLoaders = [
	{ test: /\.js$/, loader: "jsx-loader" },
	{ test: /\.png$/, loader: "url-loader" },
	{ test: /\.jpg$/, loader: "file-loader" },
];
var assetsPath = path.join(__dirname, "public", "assets");
var publicPath = "assets/";

module.exports = [
	{
		// The configuration for the client
		name: "browser",
		entry: {
			entry: ["./app/entry.js"],
			entry2: ["./app/entry2.js"],
        },
		output: {
			path: assetsPath,
			filename: "[name].js",
			publicPath: publicPath
		},
		module: {
			loaders: commonLoaders.concat([
				{ test: /\.css$/, loader: "style-loader!css-loader" },
			])
		},
		plugins: [
			function(compiler) {
				this.plugin("done", function(stats) {
					require("fs").writeFileSync(path.join(__dirname, "server", "stats.generated.json"), JSON.stringify(stats.toJson()));
				});
			}
		]
	},
	{
		// The configuration for the server-side rendering
		name: "server-side rendering",
		entry: {
            page: ["./server/page.js"],
            page2: ["./server/page2.js"],
        },
		target: "node",
		output: {
			path: assetsPath,
			filename: "../../server/[name].generated.js",
			publicPath: publicPath,
			libraryTarget: "commonjs2"
		},
		externals: /^[a-z\-0-9]+$/,
		module: {
			loaders: commonLoaders.concat([
				{ test: /\.css$/,  loader: path.join(__dirname, "server", "style-collector") + "!css-loader" },
			])
		}
	}
];
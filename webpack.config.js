const path = require( "path" );
const TerserPlugin = require( "terser-webpack-plugin" );
let isProd = process.env.NODE_ENV == "production";

console.log( isProd );

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: path.resolve( __dirname, "./lib" )
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "eval",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // Handle .ts and .tsx file via ts-loader.
            { test: /\.(ts|tsx)?$/, loader: "ts-loader" }
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin( {
            terserOptions: {
                compress: {
                    drop_console: true
                },
            },
        } )],
    },
    experiments: {
        topLevelAwait: true
    }
};
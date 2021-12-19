const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/main.js", "public/js")
    .extract()
    .sass("resources/scss/main.scss", "public/css")
    .copy("resources/files", "public/files")
    .copy("resources/svg", "public/svg")
    .vue();

mix.webpackConfig({
    optimization: {
        moduleIds: "deterministic",
        splitChunks: {
            chunks: "all",
        },
    },
});

if (mix.inProduction()) {
    mix.version();
}
mix.options({
    terser: {
        terserOptions: {
            mangle: true,
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
            output: {
                comments: false,
                beautify: false,
            },
        },
    },
});

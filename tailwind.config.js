
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./storage/framework/views/*.blade.php",
        "./storage/framework/views/*.php"
    ],
    theme: {
        colors:{
            primary:'#2b386c',
            secondary:'#6c757d'
        }
    },
    plugins: [],
}

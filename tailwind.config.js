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
        extend: {
            zIndex: {
                100: 100,
                60: 60,
            },
            colors: {
                main: '#096ED1',
                stone: '#C4C4C4',
                sea: '#EBF5FF',
            },
            fontSize: {
                '11px': '11px',
                '12px': '12px',
                '14px': '14px',
                '17px': '17px',
                '18px': '18px',
                '20px': '20px',
                '24px': '24px',
                '25px': '25px',
                '32px': '32px',
                '36px': '36px',
                '40px': '40px',
                '56px': '56px',
                '80px': '80px',
            },
            rotate: {
                270: '270deg',
            },
        },
    },
    plugins: [],
}

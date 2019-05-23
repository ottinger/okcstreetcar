const path = require('path');

module.exports = {
    entry: './public/src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './public/dist')
    },
    externals: {
        jquery: "jQuery"
    }
};
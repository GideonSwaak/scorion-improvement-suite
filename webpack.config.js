const path = require('path');

module.exports = [
    {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        watch: true,
        name: 'development'
    },
    {
        mode: 'production',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.min.js',
        },
        watch: false,
        name: 'production'
    }
]
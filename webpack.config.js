const path = require('path');

module.exports = [
    {
        mode: 'development',
        entry: ['./src/index.js', './src/style.css'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        watch: true,
        name: 'development',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                }
            ]
        }
    },
    {
        mode: 'production',
        entry: ['./src/index.js', './src/style.css'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.min.js',
        },
        watch: false,
        name: 'production',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                }
            ]
        }
    }
]
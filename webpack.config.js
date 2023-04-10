import * as path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
    {
        mode: 'development',
        entry: ['./src/index.js', './src/style.scss'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        watch: true,
        name: 'development',
        module: {
            rules: [
                {
                    test: /\.scss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                }
            ]
        }
    },
    {
        mode: 'production',
        entry: ['./src/index.js', './src/style.scss'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.min.js',
        },
        watch: false,
        name: 'production',
        module: {
            rules: [
                {
                    test: /\.scss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                }
            ]
        },
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                        const bundle = fs.readFileSync('./dist/bundle.min.js', 'utf8');
                        let withoutApostrophes = bundle.replace(/'/g, '`');
                        fs.writeFileSync('./dist/bundle.min.js', withoutApostrophes);
                    });
                }
            }
        ]
    }
]
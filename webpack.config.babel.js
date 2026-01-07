import path from 'path';
import { fileURLToPath } from 'url';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* eslint-enable no-underscore-dangle */

export default (env = {}) => ({
  entry: './src/index.js',
  mode: env.minify ? 'production' : 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `react-web-tabs${env.minify ? '.min' : ''}.js`,
    libraryTarget: 'umd',
    library: 'react-web-tabs',
    globalObject: 'this',
  },

  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types',
      root: 'PropTypes',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = (env = {}) => ({
  entry: './src/index.ts',
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
    'react-compiler-runtime': {
      commonjs: 'react-compiler-runtime',
      commonjs2: 'react-compiler-runtime',
      amd: 'react-compiler-runtime',
      root: 'ReactCompilerRuntime',
    },
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react/compiler-runtime': 'react-compiler-runtime',
    },
  },

  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
});

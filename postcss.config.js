module.exports = {
  plugins: {
    'postcss-import': true,
    cssnano: process.env.NODE_ENV === 'production' ? {} : false,
  },
};

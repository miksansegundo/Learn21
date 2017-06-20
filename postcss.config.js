module.exports = {
  browsers: ['last 2 versions', 'IE > 10'],
  cascade: true,
  remove: true,
  plugins: {
    'postcss-import': {
      root: __dirname,
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-cssnext': {}
  },
};
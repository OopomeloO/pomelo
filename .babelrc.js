module.exports = {
  presets: ['@babel/env', '@babel/typescript', '@babel/react'],
  plugins: ['@babel/proposal-class-properties', '@babel/plugin-transform-runtime'],
  env: {
    esm: {
      presets: [['@babel/env', { modules: false }]],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
    },
  },
};

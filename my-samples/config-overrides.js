const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { "legacy": true }], config);   //{ "legacy": true }一定不能掉，否则报错
    return config;
};

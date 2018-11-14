// const rewireMobX = require("react-app-rewire-mobx");
// module.exports = function override(config, env) {
//   //do stuff with the webpack config...
//   config = rewireMobX(config, env);
//   return config;
// };
const {
  override,
  addDecoratorsLegacy,
  disableEsLint
} = require("customize-cra");
const path = require("path");

module.exports = override(addDecoratorsLegacy(), disableEsLint());

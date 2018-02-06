var Handlebars = require('handlebars');

module.exports = function escapeExpression(content) {
  return Handlebars.Utils.escapeExpression(content);
};

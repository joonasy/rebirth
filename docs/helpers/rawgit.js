var Handlebars = require('handlebars');
var fetch = require('node-fetch');

module.exports = function rawgit(url, view, escapeExpr) {
  if (!url) return;
  var url = 'https://gist.githubusercontent.com/' + url;

  return fetch(url)
    .then(function(res) {
      return res.text();
    })
    .then(function(content) {
      if (escapeExpr) {
        return Handlebars.Utils.escapeExpression(content);
      } else {
        return content;
      }
    });
};

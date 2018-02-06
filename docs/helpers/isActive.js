module.exports = function isActive(content, url, view) {
  var path = view.data.root.path;
  var title = content.toLowerCase();

  if (path.indexOf(title) !== -1 && path.indexOf(url) !== -1) {
    return true;
  }
};

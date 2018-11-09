module.exports = function isActive(str, url, view) {
  var path = view.data.root.path;
  var title = str
    .trim()
    .replace(/[-_\s]+/g, '-')
    .toLowerCase();

  if (path.indexOf(title) !== -1 && path.indexOf(url) !== -1) {
    return true;
  }
};

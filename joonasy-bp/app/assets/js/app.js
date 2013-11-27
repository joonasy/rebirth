/* Config */
var APP = {
  bp: {
    medium: "all and (min-width: 48em)"
  }
}

var doc = document,
    docEl = doc.documentElement,
    win = window;

$(function() {
  /* Init fast click and declare page as loaded */
  win.addEventListener("load", function() {
    FastClick.attach(doc.body);
    docEl.className = docEl.className.replace(/(^|\s)is-loading(\s|$)/, " is-loaded ");
  }, false);

  /* Enquire usage http://wicky.nillia.ms/enquire.js */
  enquire.register(APP.bp.medium, {
    deferSetup : true,
    setup : function() {},
    match : function() {},
    unmatch : function() {}
  }, true);
});
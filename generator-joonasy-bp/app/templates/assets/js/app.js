/* Config */
var APP = {
  bp: {
    medium: "all and (min-width: 48em)"
  }
}
var doc = document,
    docEl = doc.documentElement,
    win = window;

/* Document ready (jQuery) */
$(function() {

  /* Init fast click and declare page as loaded */
  win.addEventListener("load", function() {

    FastClick.attach(doc.body);
    docEl.className = docEl.className.replace(/(^|\s)preload(\s|$)/, " loaded ");

  }, false);

  /* Enquire usage */
  enquire.register(APP.bp.medium, {

    deferSetup : true,
    setup : function() {},
    match : function() {},
    unmatch : function() {}

  }, true);

});

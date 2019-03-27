goog.require("goog.debug.DivConsole");
goog.require("goog.debug.LogManager");
goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.events.EventType");
goog.require("goog.log");
goog.require("goog.log.Level");
goog.require("goog.object");
goog.require("goog.ui.Component.EventType");
goog.require("goog.ui.RoundedTabRenderer");
goog.require("goog.ui.Tab");
goog.require("goog.ui.TabBar");

var timer = goog.now();
// Set up a logger.
goog.debug.LogManager.getRoot().setLevel(goog.log.Level.ALL);
var logger = goog.log.getLogger("demo");
var logconsole = new goog.debug.DivConsole(goog.dom.getElement("log"));
logconsole.setCapturing(true);
var EVENTS = goog.object.getValues(goog.ui.Component.EventType);
goog.log.fine(logger, "Listening for: " + EVENTS.join(", ") + ".");
function logEvent(e) {
  var source =
    (typeof e.target.getCaption == "function" && e.target.getCaption()) ||
    e.target.getId();
  goog.log.info(logger, '"' + source + '" dispatched: ' + e.type);
}
var topTab = new goog.ui.TabBar();
topTab.decorate(goog.dom.getElement("top"));
var bottom = new goog.ui.TabBar();
bottom.decorate(goog.dom.getElement("bottom"));
var start = new goog.ui.TabBar();
start.decorate(goog.dom.getElement("start"));
var end = new goog.ui.TabBar();
end.decorate(goog.dom.getElement("end"));
var topRound = new goog.ui.TabBar();
topRound.decorate(goog.dom.getElement("top_round"));
var startRound = new goog.ui.TabBar();
startRound.decorate(goog.dom.getElement("start_round"));
goog.array.forEach([topTab, bottom, start, end, topRound, startRound], function(
  tabBar
) {
  // Log all events.
  goog.events.listen(tabBar, EVENTS, logEvent);
  // Handle SELECT events dispatched by tabs.
  goog.events.listen(tabBar, goog.ui.Component.EventType.SELECT, function(e) {
    var tabSelected = e.target;
    var contentElement = goog.dom.getElement(tabBar.getId() + "_content");
    goog.dom.setTextContent(
      contentElement,
      'You selected the "' + tabSelected.getCaption() + '" tab.'
    );
  });
  // Hook up the "Show/hide first tab" checkbox.
  goog.events.listen(
    goog.dom.getElement("show_" + tabBar.getId()),
    goog.events.EventType.CLICK,
    function(e) {
      var checkbox = e.target;
      tabBar.getChildAt(0).setVisible(checkbox.checked);
    }
  );
  // Hook up the "Enable/disable fourth tab" checkbox.
  goog.events.listen(
    goog.dom.getElement("enable_" + tabBar.getId()),
    goog.events.EventType.CLICK,
    function(e) {
      var checkbox = e.target;
      tabBar.getChildAt(3).setEnabled(checkbox.checked);
    }
  );
});
goog.dom.setTextContent(goog.dom.getElement("perf"), goog.now() - timer + "ms");

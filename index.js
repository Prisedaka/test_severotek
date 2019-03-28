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
goog.provide('goog.dom.xml');

var timer = goog.now();

var tabs = new goog.ui.TabBar();
tabs.decorate(goog.dom.getElement("tabs"));

// Handle SELECT events dispatched by tabs.
goog.events.listen(tabs, goog.ui.Component.EventType.SELECT, function(e) {
  var tabSelected = e.target;
  var contentElement = goog.dom.getElement(tabs.getId() + "_content");
  goog.dom.setTextContent(
    contentElement,
    'You selected the "' + tabSelected.getCaption() + '" tab.'
  );
});

// goog.dom.setTextContent(goog.dom.getElement("perf"), goog.now() - timer + "ms");

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
goog.require('goog.graphics');
goog.require('goog.graphics.Font');
goog.require('goog.fs.FileReader');

// var timer = goog.now();

// var xmlData = goog.dom.xml.loadXml()
// console.log(xmlData);
var reader = new FileReader();
var data = reader.readAsText('./view.xml');

var tabs = new goog.ui.TabBar();
tabs.decorate(goog.dom.getElement("tabs"));

// Handle SELECT events dispatched by tabs.
goog.events.listen(tabs, goog.ui.Component.EventType.SELECT, function (e) {
  var tabSelected = e.target;
  var contentElement = goog.dom.getElement(tabs.getId() + "_content");
  // goog.dom.setTextContent(
  //   contentElement,
  //   'You selected the "' + tabSelected.getCaption() + '" tab.'
  // );
  setupElements();
});

var rectColor = [];

var graphics, fill, stroke, font;

var textElement;

var rectElement;

var ellipseElement;

var pathElement;

function setupElements() {
  graphics = goog.graphics.createGraphics(600, 200);

  fill = new goog.graphics.SolidFill('yellow');
  stroke = new goog.graphics.Stroke(2, 'green');
  font = new goog.graphics.Font(26, 'Arial');

  rectColor.push({
    s: stroke,
    f: fill
  });
  rectColor.push({
    s: new goog.graphics.Stroke(4, 'blue'),
    f: new goog.graphics.SolidFill('red')
  });
  rectColor.push({
    s: null,
    f: new goog.graphics.SolidFill('#c0c0c0')
  });
  rectColor.push({
    s: new goog.graphics.Stroke(0.5, 'red'),
    f: null
  });
  var gradient = new goog.graphics.LinearGradient(0, 0, 0, 300, '#8080ff',
    '#000080');
  rectColor.push({
    s: new goog.graphics.Stroke(1, 'black'),
    f: gradient
  });

  drawElements();

  graphics.render(document.getElementById('tabs_content'));
}

function drawElements() {
  rectElement = graphics.drawRect(30, 10, 100, 80, stroke, fill);
  ellipseElement = graphics.drawEllipse(400, 150, 100, 40, stroke, fill);

  pathData1 = graphics.createPath()
    .moveTo(200, 180)
    .lineTo(230, 100)
    .lineTo(280, 30)
    .lineTo(280, 80)
    .lineTo(200, 90);
  pathData2 = graphics.createPath()
    .moveTo(200, 180)
    .curveTo(220, 50, 260, 180, 280, 30);
  pathElement = graphics.drawPath(pathData1, stroke, null);

  // textElement = graphics.drawTextOnLine(
  //   document.getElementById('text').value,
  //   0, 20, 590, 20, 'right', font, stroke, fill);
}
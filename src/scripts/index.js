import parse from './parser.js';

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('goog.graphics');
goog.require('goog.graphics.Font');

let ellipseElement;
let rectElement;
let triangleElement;
let brokLineElement;
let strLineElement;
let textElement;
let tabSelected;
let graphics, fill, stroke, font;

// Reade XML data from file

const data = parse('/view.xml');

// Generate tabs

const tabs = new goog.ui.TabBar();
const createTabs = xmlData => {
  const parent = goog.dom.getElement('tabs');
  const views = xmlData.querySelectorAll('View');
  for (let index = 0; index < views.length; index += 1) {
    const classNames = index === 0 ? 'goog-tab goog-tab-selected' : 'goog-tab';
    const tabName = views[index].attributes.id.value;
    const newTab = goog.dom.createDom(
      goog.dom.TagName.DIV,
      {
        class: classNames,
        id: tabName
      },
      tabName
    );
    goog.dom.appendChild(parent, newTab);
  }
};
createTabs(data);
tabs.decorate(goog.dom.getElement('tabs'));
goog.events.listen(tabs, goog.ui.Component.EventType.SELECT, e => {
  tabSelected = e.target.getCaption();
  drawElements(tabSelected);
});

// Drowing

const setupElements = tabname => {
  tabSelected = tabname;
  graphics = goog.graphics.createGraphics(600, 600);
  fill = new goog.graphics.SolidFill('blue');
  stroke = new goog.graphics.Stroke(2, 'black');
  font = new goog.graphics.Font(26, 'Arial');
  drawElements(tabname);
  graphics.render(document.getElementById('tabs_content'));
};
window.setupElements = setupElements;

const drawElements = tabname => {
  graphics.clear();
  const widgets = data.querySelectorAll(`#${tabname} Widget`);
  for (let index = 0; index < widgets.length; index += 1) {
    const attributes = widgets[index].attributes;
    const widgetType = widgets[index].attributes.type.value;
    const element = getDrawElement[widgetType](attributes);
  }
};

const getDrawElement = {
  ellipse: ({ cx, cy, rx, ry }) =>
    (ellipseElement = graphics.drawEllipse(
      cx.value,
      cy.value,
      rx.value,
      ry.value,
      stroke,
      fill
    )),
  rectangle: ({ x, y, width, height }) =>
    (rectElement = graphics.drawRect(
      x.value,
      y.value,
      width.value,
      height.value,
      stroke,
      fill
    )),
  triangle: ({ points }) => {
    const [x1, y1, ...rest] = points.value.split(' ');
    const triangleData = graphics
      .createPath()
      .moveTo(x1, y1)
      .lineTo(rest);
    triangleElement = graphics.drawPath(triangleData, stroke, fill);
  },
  brokenLine: ({ points }) => {
    const [x1, y1, ...rest] = points.value.split(' ');
    const brokenLineData = graphics
      .createPath()
      .moveTo(x1, y1)
      .lineTo(rest);
    brokLineElement = graphics.drawPath(brokenLineData, stroke, null);
  },
  straightLine: ({ points }) => {
    const [x1, y1, ...rest] = points.value.split(' ');
    const straightLineData = graphics
      .createPath()
      .moveTo(x1, y1)
      .lineTo(rest);
    strLineElement = graphics.drawPath(straightLineData, stroke, null);
  },
  text: ({ value, x1, y1, x2, y2 }) =>
    (textElement = graphics.drawTextOnLine(
      document.getElementById('text').value,
      x1.value,
      y1.value,
      x2.value,
      y2.value,
      'right',
      font,
      stroke,
      fill
    ))
};

// Actions

const setText = () => {
  textElement.setText(document.getElementById('text').value);
};
window.setText = setText;

const setRectPosition = (x, y) => {
  rectElement.setPosition(x, y);
};
window.setRectPosition = setRectPosition;

const setColor = color => {
  fill = new goog.graphics.SolidFill(color);
  drawElements(tabSelected);
};
window.setColor = setColor;

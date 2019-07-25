const {Artboard,Element,Rectangle,Ellipse,Color} = require("scenegraph");
let commands = require("commands");
function fire(selection) {
  const selectElement = () => {
    let selectedItems = selection.items;
    let elements = [];
    for(let i = 0; i<selectedItems.length; i++) {
      // if(selectedItems[i] instanceof Element) {
      //   elements.push(selectedItems[i]);
      // } else {
      //   console.log(selectedItems[i] + 'is not text');
      // }
      elements.push(selectedItems[i]);
    }
    return elements;
  } // selectElement()
  const getElementProperty = () => {
    let textWidth = [];
    let textHeight = [];
    let textPosX = [];
    let textPosY = [];
    let textArtboardsPosX = [];
    let textArtboardsPosY = [];
    let values = [];
    for(let i = 0; i<selectElement().length; i++) {
      textWidth.push(selectElement()[i].localBounds.width);
      textHeight.push(selectElement()[i].localBounds.height);
      textPosX.push(selectElement()[i].globalBounds.x);
      textPosY.push(selectElement()[i].globalBounds.y);
      textArtboardsPosX.push(selectElement()[i].parent.globalBounds.x);
      textArtboardsPosY.push(selectElement()[i].parent.globalBounds.y);
    }
    values.push(textWidth, textHeight, textPosX, textPosY, textArtboardsPosX, textArtboardsPosY) ;
    return values;
  } // getElementProperty();
  const createShape = () => {
    let shapes = [];
    let elements = [];
    for(let i = 0; i<selectElement().length; i++) {
      let shape = new Rectangle();
      let width = getElementProperty()[0][i];
      let height = getElementProperty()[1][i];
      let shapePosX = getElementProperty()[2][i];
      let shapePosY = getElementProperty()[3][i];
      let artboardPosX = getElementProperty()[4][i];
      let artboardPosY = getElementProperty()[5][i];
      shape.width = width;
      shape.height = height;
      shape.fill = new Color("rgba(255,0,0,.2)");
      shape.stroke = new Color("#f00");
      shape.strokeWidth = 10;
      selectElement()[i].parent.addChild(shape);
      if(shapePosX === 0 && shapePosY === 0) {
        shape.moveInParentCoordinates(shapePosX, shapePosY);
      } else {
        shape.moveInParentCoordinates(shapePosX - artboardPosX, shapePosY - artboardPosY);
      }
      shapes.push(shape);
      elements.push(selectElement()[i]);
    }
    selection.items = shapes;
    // commands.bringToFront();
  }
  createShape();
}

module.exports = {
  commands: {
    markerShape: fire
  }
};

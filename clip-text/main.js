const clipboard = require("clipboard");
const { alert, error } = require("./lib/dialogs.js");
async function fire(selection) {
  const selectTextElement = () => {
    let selectedItems = selection.items;
    let elements = [];
    let getTextElements = (element) => {
      if(element.length === undefined) {
        let i = 0;
        while(i < element.children.length) {
          if (element.children.at(i).constructor.name === 'Group' || element.children.at(i).constructor.name === 'Text') {
            if(element.children.at(i).constructor.name === 'Group') {
              let ii = 0;
              while(ii < element.children.at(i).children.length) {
                if(element.children.at(i).children.at(ii).constructor.name === 'Text'){
                  elements.push(element.children.at(i).children.at(ii));
                } else if (element.children.at(i).children.at(ii).constructor.name === 'Group') {
                  let groupInGroup = element.children.at(i).children.at(ii);
                  elements.push(getTextElements(groupInGroup));
                }
                ii=(ii+1)|0;
              }
            } else {
              elements.push(element.children.at(i))
            }
          }
          i=(i+1)|0;
        }
      }
      if(element.length !== undefined) {
        let i = 0;
        while(i < element.length) {
          if (element[i].constructor.name === 'Group' || element[i].constructor.name === 'Text') {
            if(element[i].constructor.name === 'Group') {
              let ii = 0;
              while(ii < element[i].children.length) {
                if(element[i].children.at(ii).constructor.name === 'Text'){
                  elements.push(element[i].children.at(ii));
                } else if (element[i].children.at(ii).constructor.name === 'Group') {
                  let groupInGroup = element[i].children.at(ii);
                  elements.push(getTextElements(groupInGroup));
                }
                ii=(ii+1)|0;
              }
            } else {
              elements.push(element[i]);
            }
          }
          i=(i+1)|0;
        }
      }
      return elements;
    }
    elements.push(getTextElements(selectedItems));
    return elements;
  }
  const clipText = () => {
    let textContext = [];
    let i = 0;
    while(i<selectTextElement().length) {
      selectTextElement()[i].text !== undefined ? textContext.push(selectTextElement()[i].text) : false;
      i=(i+1)|0;
    }
    clipboard.copyText(String(textContext.join('\n\n')));
    return textContext;
  }
  clipText();
  await alert("Clip Text is Success.", "Text copy on clipboard");
}
module.exports = {
  commands: {
    clipText: fire
  }
};

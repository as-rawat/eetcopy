retryCount = 5;

class cls {
  constructor(textAreaSelector, textAreaToggleSelector, textAreaToggleCheckerSelector, textAreaOnConsoleSelector='') {
    this.textAreaSelector = textAreaSelector;
    this.textAreaToggleSelector = textAreaToggleSelector;
    this.textAreaToggleCheckerSelector = textAreaToggleCheckerSelector;
    this.textAreaOnConsoleSelector = textAreaOnConsoleSelector;
    this.inputString = ""; // Stores all testcase, same as to be put in "Console"
  }

  extractTestcase() {
    /*  Extracts all the testcase and copies them to clipboard
     */
    var inputString = "";
    // Iterate through all <pre> tags
    Array.prototype.forEach.call(document.getElementsByTagName('pre'), function (preTagHtml) {
      var preTagList = preTagHtml.innerHTML.split('\n');
      preTagList.forEach(function(preTagLine) {

        // For all the lines in <pre> which have 'Input:'
        if(preTagLine.search('Input:') != -1) {

          // Split multiple inputs using ', '
          var inputList = preTagLine.split(', ');
          inputList.forEach(function (input) {
            // Get everything after the '= '
            var eqIndex = input.search('=');
            if(eqIndex != -1) {
              inputString = inputString + input.substring(eqIndex + 2) + '\n';
            }
          });
        }
      });
    });

    // Remove last line break
    this.inputString = inputString.trim();
  }

  copyTextToClipboard() {
    //Create a textbox field where we can insert text to.
    var copyFrom = document.createElement("textarea");

    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = this.inputString;

    //Append the textbox field into the body as a child.
    //"execCommand()" only works when there exists selected text, and the text is inside
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);

    //Select all the text!
    copyFrom.select();

    //Execute command
    document.execCommand('copy');

    //(Optional) De-select the text using blur().
    copyFrom.blur();

    //Remove the textbox field from the document.body, so no other JavaScript nor
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
  }

  openTextAreaFromCheckbox() {
    var textAreaToggleElement = document.querySelector(this.textAreaToggleSelector);
    var textAreaToggleCheckerElement = document.querySelector(this.textAreaToggleCheckerSelector);
    if(!textAreaToggleCheckerElement.checked)
        textAreaToggleElement.click();
  }

  openTextAreaFromButton() {
    var textAreaToggleElement = document.querySelector(this.textAreaToggleSelector);
    var textAreaToggleCheckerElement = document.querySelector(this.textAreaToggleCheckerSelector);
    if(textAreaToggleCheckerElement.getAttribute('d').split(' ')[1] == '10l5')
      textAreaToggleElement.click();
  }

  pasteTextFromClipboard() {
        // Pastes from clipboard to element
        var textAreaOnConsoleElement = (this.textAreaOnConsoleSelector == '') ? null : document.querySelector(this.textAreaOnConsoleSelector);
        if(textAreaOnConsoleElement) {
            textAreaOnConsoleElement.click();
        }

        var textAreaElement = document.querySelector(this.textAreaSelector);
        textAreaElement.select();
        document.execCommand('selectAll', false, null);
        document.execCommand('paste', false, null);
  }
}

class Utils {
  static insertAfter(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  static insertBefore(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode);
  }

  static createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

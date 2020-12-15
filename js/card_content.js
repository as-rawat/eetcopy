

retryCount = 5;

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to.
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

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

function openCustomTestcase() {

    checkboxElement = document.getElementById('custom_testcase');
    if(!checkboxElement.checked)
        checkboxElement.click();
}

function pasteTextFromClipboardTo(element) {
    openCustomTestcase();
    element.select();
    document.execCommand('paste');
}

function copyTestcase() {

	// Stores testcase
	inputString = "";

	// Iterate through all <pre> tags
  console.log('pre ' + document.getElementsByTagName('pre'));
	Array.prototype.forEach.call(document.getElementsByTagName('pre'), function (preTagHtml) {
		preTagList = preTagHtml.innerHTML.split('\n');

		preTagList.forEach(function(preTagLine) {

			// For all the lines in <pre> which have 'Input:'
			if(preTagLine.search('Input:') != -1) {

				// Split multiple inputs using ', '
				inputList = preTagLine.split(', ');
				inputList.forEach(function (input) {

					// Get everything after the '= '
					eqIndex = input.search('=');
					if(eqIndex != -1) {
						inputString = inputString + input.substring(eqIndex + 2) + '\n';
					}

				});
			}
		});
	});

	// Remove last line break
	inputString = inputString.trim();

	copyTextToClipboard(inputString);

	txtArea = document.getElementById('textArea');
	pasteTextFromClipboardTo(txtArea);
}

function addCopyButton() {

	copyButtonHtml = '<span id="copyBtn" class="" aria-hidden="true" style="cursor: pointer;"><button class="btn btn-default btn-round" type="button" style="margin-right: 10px;"><span><i class="fa fa-copy" aria-hidden="true"></i>&nbsp;<span>Copy<span class="hidden-xs"> testcase</span></span></span></button></span>';

	beforeCopyButtonSelector = '#explore-app > div > div.view-controller > div.content-viewer-view > div.content-base > div > div.question-wrapper > div.editor-area > div > div > div > div.action > div.row > div:nth-child(2) > div > span.hidden-xs';

	copyButtonElement = createElementFromHTML(copyButtonHtml);
	beforeCopyButtonElement = document.querySelector(beforeCopyButtonSelector);

	insertAfter(copyButtonElement, beforeCopyButtonElement);

	let copyButton = document.getElementById('copyBtn');
	copyButton.onclick = function(element) {
		copyTestcase();
	};
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleepAndAddCopyButton() {
  await sleep(2000);
  beforeButtonSelector = '#explore-app > div > div.view-controller > div.content-viewer-view > div.content-base > div > div.question-wrapper > div.editor-area > div > div > div > div.action > div.row > div:nth-child(2) > div > span.hidden-xs';
  var sleepFor = 1000;
  var beforeButtonElement = document.querySelector(beforeButtonSelector);
  for(i = 0; i < retryCount && !beforeButtonElement; i++) {
    await sleep(sleepFor);
    sleepFor = 2 * sleepFor;
    beforeButtonElement = document.querySelector(beforeButtonElement);
  }

  if(beforeButtonElement)
    addCopyButton();
}

sleepAndAddCopyButton();

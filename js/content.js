sleepFor = 1500;

function factoryMethod(inExplore, fixedButtonSelector) {
  fixedButtonElement = document.querySelector(fixedButtonSelector);
  if(inExplore) {
    copyButtonHtml = '<span id="copyBtn" class="" aria-hidden="true" style="cursor: pointer;"><button class="btn btn-default btn-round" type="button" style="margin-right: 10px;"><span><i class="fa fa-copy" aria-hidden="true"></i>&nbsp;<span>Copy<span class="hidden-xs"> testcase</span></span></span></button></span>';
    copyButtonElement = Utils.createElementFromHTML(copyButtonHtml);

    Utils.insertAfter(copyButtonElement, fixedButtonElement);

    let copyButton = document.getElementById('copyBtn');
    copyButton.onclick = function(element) {
      textAreaSelector = '#textArea';
      textAreaToggleSelector = '#custom_testcase';
      textAreaToggleCheckerSelector = textAreaToggleSelector;
      obj = new cls(textAreaSelector, textAreaToggleSelector, textAreaToggleCheckerSelector);
      obj.extractTestcase();
      obj.copyTextToClipboard();
      obj.openTextAreaFromCheckbox();
      obj.pasteTextFromClipboard();
    };
  }
  else {
    copyButtonHtml = '<button id="copyBtn" class="runcode__1EDI css-y98m8o-sm"><span><i class="fa fa-copy" aria-hidden="true"></i>&nbsp;</span><span class="css-1km43m6-BtnContent e5i1odf0">Use test case</span></button>';
    copyButtonElement = Utils.createElementFromHTML(copyButtonHtml);

    Utils.insertBefore(copyButtonElement, fixedButtonElement);

    let copyButton = document.getElementById('copyBtn');
    copyButton.onclick = function(element) {
      textAreaSelector = '#testcase-editor > textarea';
      textAreaToggleSelector = '#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.container__2WTi > div.func__1DsC > button';
      textAreaToggleCheckerSelector = '#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.container__2WTi > div.func__1DsC > button > svg > path';
      textAreaOnConsoleSelector = '#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.result__1UhQ > div > div > div.header-content__2Ekc > div > div.css-jccvoy-TabViewHeader.e5i1odf1 > div > div:nth-child(1)';
      obj = new cls(textAreaSelector, textAreaToggleSelector, textAreaToggleCheckerSelector, textAreaOnConsoleSelector);
      obj.extractTestcase();
      obj.copyTextToClipboard();
      obj.openTextAreaFromButton();
      obj.pasteTextFromClipboard();
    };
  }
}

async function main() {
  /*  Start of our main script.
   *  Checks if we are in the desired(page where we copy testcase) page.
   *  If yes, then add the copy button.
   *  Else retry, and eventually stop.
   */
  await Utils.sleep(sleepFor);
  fixedButtonSelectorInExplore = '#explore-app > div > div.view-controller > div.content-viewer-view > div.content-base > div > div.question-wrapper > div.editor-area > div > div > div > div.action > div.row > div:nth-child(2) > div > span.hidden-xs';
  fixedButtonSelectorOutExplore = '#app > div > div.main__2_tD > div.content__3fR6 > div > div.editor-wrapper__1ru6 > div > div.container__2WTi > div.action__38Xc > button:nth-child(1)';
  var fixedButtonInExplore = document.querySelector(fixedButtonSelectorInExplore);
  var fixedButtonOutExplore = document.querySelector(fixedButtonSelectorOutExplore);

  if(fixedButtonInExplore)
    factoryMethod(true, fixedButtonSelectorInExplore);
  else if(fixedButtonOutExplore)
    factoryMethod(false, fixedButtonSelectorOutExplore);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    main();
    sendResponse({"status": "done"});
    return true;
  }
);

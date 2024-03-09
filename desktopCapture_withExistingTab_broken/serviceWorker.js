const ensureOffscreenDocument = async () => {
  if (await chrome.offscreen.hasDocument()) {
    await chrome.offscreen.closeDocument();
  }
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: [chrome.offscreen.Reason.USER_MEDIA],
    justification: "Recording from chrome.desktopCapture API",
  });
};

chrome.action.onClicked.addListener((tab) => {
  void ensureOffscreenDocument();

  const connectionHandler = (port) => {
    chrome.runtime.onConnect.removeListener(connectionHandler);
    chrome.desktopCapture.chooseDesktopMedia(["screen"], tab, (streamId) => {
      port.postMessage(streamId);
    });
  };
  chrome.runtime.onConnect.addListener(connectionHandler);
});

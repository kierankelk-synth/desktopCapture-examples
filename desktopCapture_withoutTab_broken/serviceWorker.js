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

chrome.action.onClicked.addListener(() => {
  void ensureOffscreenDocument();
});

chrome.runtime.onConnect.addListener((port) => {
  chrome.desktopCapture.chooseDesktopMedia(["screen"], (streamId) => {
    port.postMessage(streamId);
  });
});

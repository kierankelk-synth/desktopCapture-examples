const ensureOffscreenDocument = async () => {
  if (await chrome.offscreen.hasDocument()) {
    await chrome.offscreen.closeDocument();
  }
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: [chrome.offscreen.Reason.USER_MEDIA],
    justification: "Recording from chrome.tabCapture API",
  });
};

chrome.action.onClicked.addListener(() => {
  void ensureOffscreenDocument();
});

chrome.runtime.onConnect.addListener((port) => {
  chrome.tabCapture.getMediaStreamId((streamId) => {
    port.postMessage(streamId);
  });
});

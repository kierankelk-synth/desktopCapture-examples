const ensureOffscreenDocument = async () => {
  if (await chrome.offscreen.hasDocument()) {
    await chrome.offscreen.closeDocument();
  }
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: [chrome.offscreen.Reason.DISPLAY_MEDIA],
    justification: "Recording from getDisplayMedia",
  });
};

chrome.action.onClicked.addListener(() => {
  void ensureOffscreenDocument();
});

chrome.action.onClicked.addListener(() => {
  void chrome.tabs.create({ url: "newTab.html" });
});

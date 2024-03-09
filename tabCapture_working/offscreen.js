const port = chrome.runtime.connect();
port.onMessage.addListener((streamId) => {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: streamId,
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: streamId,
        },
      },
    })
    .then((stream) => {
      const recorder = new MediaRecorder(stream);
      alert("Success!");
      stream.getTracks().forEach((track) => track.stop());
    });
});

const port = chrome.runtime.connect();
port.onMessage.addListener((streamId) => {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: streamId,
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: streamId,
        },
      },
    })
    .then((stream) => {
      new MediaRecorder(stream);
      alert("Success!");
      stream.getTracks().forEach((track) => track.stop());
    });
});

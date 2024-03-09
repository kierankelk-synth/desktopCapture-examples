navigator.mediaDevices
  .getDisplayMedia({
    video: {
      displaySurface: "monitor",
    },
  })
  .then((stream) => {
    new MediaRecorder(stream);
    alert("Success!");
    stream.getTracks().forEach((track) => track.stop());
  });

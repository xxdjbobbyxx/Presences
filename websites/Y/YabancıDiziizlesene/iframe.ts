const iframe = new iFrame();

iframe.on("UpdateData", async () => {
  const video: HTMLVideoElement = document.querySelector("video");

  if (video)
    iframe.send({
      paused: video.paused,
      duration: video.duration,
      currentTime: video.currentTime
    });
});

var iframe = new iFrame();
iframe.on("UpdateData", async () => {
  if (
    document.querySelector("#playpause") !== null &&
    document.querySelector("#playpause").className == "playing"
  ) {
    iframe.send({
      artist: document.querySelector(".status").textContent.split(" - ")[0],
      title: document.querySelector(".status").textContent.split(" - ")[1],
      playing: true
    });
  }
});

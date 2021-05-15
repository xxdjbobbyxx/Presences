const presence = new Presence({
    clientId: "640914619082211338"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "tfmlogo",
    startTimestamp: browsingStamp
  };

  presenceData.details = `${
    document.querySelector(".player-artist-text").textContent
  } - ${document.querySelector(".player-title-text").textContent}`;
  presenceData.state = document.querySelector(".live-name").textContent
    ? document.querySelector(".live-name").textContent
    : "AutoDJ";

  presenceData.buttons = [
    {
      label: "Tune into TFM",
      url: "https://truckers.fm/listen"
    }
  ];

  const spotifyUrl = document
    .querySelector(".player-artist-text a")
    .getAttribute("href");
  if (spotifyUrl) {
    presenceData.buttons.push({
      label: "Listen on Spotify",
      url: spotifyUrl
    });
  }

  presence.setActivity(presenceData);
  presence.setTrayTitle();
});

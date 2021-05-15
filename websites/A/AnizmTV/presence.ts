const presence = new Presence({
    clientId: "778715860638367804"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

const startTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement, tags: HTMLElement;

presence.on("iFrameData", async (msg: HTMLVideoElement) => {
  if (!msg) return;
  video = msg;
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "anizm"
    },
    title = document.querySelector(
      "html > body > font > main > #pageContent > div > h2 > a"
    ),
    episode = document.querySelector(
      "html > body > font > main > #pageContent > div > h2 > span"
    );

  if (!title || !episode) {
    video = null;
  }

  if (
    document.location.pathname.includes("/SeriEkle") ||
    document.location.pathname.includes("/Bolac") ||
    document.location.pathname.includes("/TopluBolac") ||
    document.location.pathname.includes("/BolumSil") ||
    document.location.pathname.includes("/FanEkle") ||
    document.location.pathname.includes("/FanSil") ||
    document.location.pathname.includes("/VideoEkle") ||
    document.location.pathname.includes("/Toplu") ||
    document.location.pathname.includes("/yetkiliislemleri")
  ) {
    tags = document.querySelector(
      "#pageContent > div.ui.container.anizm_colorWhite.pb-8 > h2 > span"
    );
    if (document.location.pathname.includes("/yetkiliislemleri")) {
      tags = document.querySelector(
        "#pageContent > div > div > div > div:nth-child(1) > div > div > div.header"
      );
    }

    data.state = tags.innerText + " panelinde!";
  } else if (document.location.pathname.includes("/profil")) {
    data.details = "Profile Göz atıyor...";
    tags = document.querySelector(
      "#pageContent > div > div.profileCoverArea.autoPosterSize.anizm_round > div.info.pfull > div > div > div:nth-child(1) > div.profileNickname"
    );
    data.state = tags.innerText.split("@").slice(1).join(" ");
  } else if (document.location.pathname.includes("/ayarlar")) {
    data.details = "Ayarlara Göz atıyor...";
  } else if (document.location.pathname.includes("/ara")) {
    data.details = "Aranıyor: ";
    tags = document.querySelector("#pageContent > div > h2 > span");
    data.state = tags.innerText.split("Aranan: ").slice(1).join(" ");
  } else if (document.location.pathname.includes("/girisyap")) {
    data.details = "Giriş yapıyor...";
  } else if (document.location.pathname.includes("/uyeol")) {
    data.details = "Üye oluyor...";
  } else if (window.location.href.indexOf("?sayfa=") > 1) {
    const pageNum = document.URL.split("?sayfa=")[1]
      .split("#episodes")
      .slice(0)
      .join(" ");
    data.details = (await strings).browsing;
    data.state = "Sayfa: " + pageNum;
  }
  //Episode part
  if (title && episode) {
    data.details = title.textContent;
    data.state = episode.textContent.split("/ ").slice(1).join(" ");
  }
  //Home page part
  else if (
    document.location.pathname.includes("/SeriEkle") ||
    document.location.pathname.includes("/Bolac") ||
    document.location.pathname.includes("/TopluBolac") ||
    document.location.pathname.includes("/BolumSil") ||
    document.location.pathname.includes("/FanEkle") ||
    document.location.pathname.includes("/FanSil") ||
    document.location.pathname.includes("/VideoEkle") ||
    document.location.pathname.includes("/Toplu") ||
    document.location.pathname.includes("/yetkiliislemleri") ||
    document.location.pathname.includes("/profil") ||
    document.location.pathname.includes("/ayarlar") ||
    document.location.pathname.includes("/arama") ||
    document.location.pathname.includes("/girisyap") ||
    document.location.pathname.includes("/uyeol") ||
    window.location.href.indexOf("?sayfa=") > 1
  ) {
    data.startTimestamp = startTimestamp;
  } else {
    data.details = (await strings).browsing;
    data.startTimestamp = startTimestamp;
  }

  if (video) {
    data.smallImageKey = video.paused ? "stop" : "resume";
    data.smallImageText = video.paused
      ? (await strings).paused
      : (await strings).playing;

    if (!video.paused && video.duration) {
      const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    }
  }

  presence.setActivity(data);
});

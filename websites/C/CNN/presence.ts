const presence = new Presence({
    clientId: "839539095393796116"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
  const setting = {
      timeElapsed: await presence.getSetting("timeElapsed"),
      showButtons: await presence.getSetting("showButtons"),
      logo: await presence.getSetting("logo"),
      privacy: await presence.getSetting("privacy")
    },
    logoArr = ["logo", "logo-transp"],
    urlpath = window.location.pathname.split("/"),
    presenceData: PresenceData = {
      largeImageKey: logoArr[setting.logo] || "logo"
    };

  if (setting.timeElapsed && !setting.privacy)
    presenceData.startTimestamp = browsingStamp;

  if (!urlpath[1]) presenceData.details = "Home";
  else if (
    urlpath[1] === "world" ||
    urlpath[1] === "us" ||
    urlpath[1] === "politics" ||
    urlpath[1] === "business" ||
    urlpath[1] === "health" ||
    urlpath[1] === "entertainment" ||
    urlpath[1] === "style" ||
    urlpath[1] === "travel" ||
    urlpath[1] === "sport" ||
    (urlpath[1] === "sport" &&
      document.querySelector("a.sc-fjdhpX.sc-chPdSV.ewmEKt")) ||
    urlpath[1] === "videos" ||
    urlpath[1] === "africa" ||
    urlpath[1] === "americas" ||
    urlpath[1] === "asia" ||
    urlpath[1] === "australia" ||
    urlpath[1] === "china" ||
    urlpath[1] === "europe" ||
    urlpath[1] === "india" ||
    urlpath[1] === "middle-east" ||
    urlpath[1] === "uk"
  ) {
    const category =
      document.querySelector("h1.metadata-header__title")?.textContent ||
      document
        .querySelector(".Text-sc-1amvtpj-0-span.jKFEoX")
        ?.textContent.replace("Follow CNN ", "") ||
      "Not found";

    presenceData.details = setting.privacy ? "Category" : "Category:";
    if (!setting.privacy) presenceData.state = category;

    if (setting.showButtons && !setting.privacy) {
      presenceData.buttons = [
        {
          label: "View Category",
          url: window.location.href
        }
      ];
    }
  } else if (
    urlpath[1] >= "1900" &&
    urlpath[1] <= new Date().getFullYear() &&
    urlpath[2] >= "01" &&
    urlpath[2] <= "12" &&
    urlpath[3] >= "01" &&
    urlpath[3] <= "31"
  ) {
    const article =
      document.querySelector("h1.pg-headline")?.textContent || "Not found";

    presenceData.details = setting.privacy ? "Article" : "Article:";
    if (!setting.privacy) presenceData.state = article;

    if (setting.showButtons && !setting.privacy) {
      presenceData.buttons = [
        {
          label: "View Article",
          url: window.location.href
        }
      ];
    }
  } else if (urlpath[1] === "profiles") {
    const profile =
      document.querySelector("div.cd__profile-name")?.textContent ||
      "Not found";

    presenceData.details = setting.privacy ? "Profile" : "Profile:";
    if (!setting.privacy) presenceData.state = profile;

    if (setting.showButtons && !setting.privacy) {
      presenceData.buttons = [
        {
          label: "View Profile",
          url: window.location.href
        }
      ];
    }
  } else if (urlpath[1] === "specials") {
    if (urlpath[2]) {
      if (urlpath[3] && urlpath[2] !== "us") {
        const special =
          document.querySelector("h1.pg-headline")?.textContent ||
          document.querySelector("li>a.geyBat")?.textContent ||
          "Not found";

        presenceData.details = setting.privacy ? "Special" : "Special:";
        if (!setting.privacy) presenceData.state = special;
      } else {
        const special =
          document.querySelector("a.sc-fjdhpX.sc-chPdSV.ewmEKt")?.textContent ||
          "Not found";

        presenceData.details = setting.privacy ? "Special" : "Special:";
        if (!setting.privacy) presenceData.state = special;
      }

      if (setting.showButtons && !setting.privacy) {
        presenceData.buttons = [
          {
            label: "View Special",
            url: window.location.href
          }
        ];
      }
    } else presenceData.details = "Specials";
  } else if (urlpath[1] === "election" && urlpath[2] >= "1900") {
    presenceData.details = "Election " + urlpath[2];

    if (urlpath[4] === "president") {
      const scoreStyle = document.querySelectorAll(
          "div.bop-main-scorestyles__BOPCount-sc-17mbuqb-2"
        ),
        scoreStyle2 = document.querySelectorAll(
          "div.bop-main-scorestyles__BOPName-sc-17mbuqb-3"
        );

      presenceData.state =
        scoreStyle2[1]?.textContent +
        ": " +
        scoreStyle[1]?.textContent +
        " - " +
        scoreStyle2[2]?.textContent +
        ": " +
        scoreStyle[2]?.textContent;
    } else if (urlpath[4] === "state") {
      const details = document.querySelector(
        "h1.pagestyles__DesktopH1-sc-7kqwl2-74"
      )?.textContent;
      presenceData.state = details;

      if (setting.showButtons && !setting.privacy) {
        presenceData.buttons = [
          {
            label: "View Results",
            url: window.location.href
          }
        ];
      }
    } else presenceData.state = "Other";
  } else if (urlpath[1] === "interactive")
    presenceData.details = "Interactive Article";
  else if (urlpath[1] === "account") {
    presenceData.details = "Account";
    if (urlpath[2] === "register" && !setting.privacy)
      presenceData.state = "Register";
    else if (urlpath[2] === "confirm" && !setting.privacy)
      presenceData.state = "Confirming E-Mail";
    else if (urlpath[2] === "settings" && !setting.privacy)
      presenceData.state = "Settings";
  } else if (urlpath[1] === "newsletters")
    presenceData.details = "Browsing Newsletters";
  else presenceData.details = "Other";

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

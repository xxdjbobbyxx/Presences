const presence = new Presence({
  clientId: "701044403405324348"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "tsa"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname.includes("/gamer/")) {
    const user = document.querySelector(".tabs > ul > li").textContent;

    if (document.location.pathname.includes("/gamecollection")) {
      presenceData.details = "Viewing " + user + "'s";
      presenceData.state = "Game Collection";
    } else if (document.location.pathname.includes("/achievements")) {
      presenceData.details = "Viewing " + user + "'s";
      presenceData.state = "Achievements";
    } else if (document.location.pathname.includes("/goals")) {
      presenceData.details = "Viewing " + user + "'s";
      presenceData.state = "Goals";
    } else if (document.location.pathname.includes("/blog")) {
      presenceData.details = "Viewing " + user + "'s";
      presenceData.state = "Blog";
    } else if (document.location.pathname.includes("/stats")) {
      presenceData.details = "Viewing " + user + "'s";
      presenceData.state = "Statistics";
    } else {
      presenceData.details = "Viewing profile of:";
      presenceData.state = user;
    }
  } else if (document.location.pathname.includes("/game/")) {
    if (document.location.pathname.includes("/achievements")) {
      presenceData.details = "Viewing Achievements of game:";
      presenceData.state = document.querySelector(
        "div.panel-header.w > h3 > a"
      ).textContent;
    } else if (document.location.pathname.includes("/forum")) {
      presenceData.details = "Viewing Forums of game:";
      presenceData.state = document.title.replace(" Forum", "");
    } else if (document.location.pathname.includes("/walkthrough")) {
      presenceData.details = "Viewing Walkthrough of game:";
      presenceData.state = document
        .querySelector(".pagetitle")
        .textContent.replace(" Walkthrough", "");
    } else if (document.location.pathname.includes("/reviews")) {
      presenceData.details = "Viewing Reviews of game:";
      presenceData.state = document
        .querySelector(".pagetitle")
        .textContent.replace(" Reviews", "");
    } else if (document.location.pathname.includes("/scores")) {
      presenceData.details = "Viewing Top Scores of game:";
      presenceData.state = document
        .querySelector(".pagetitle")
        .textContent.replace("Top Scores For ", "");
    } else if (document.location.pathname.includes("/gamers")) {
      presenceData.details = "Viewing Gamers of game:";
      presenceData.state = document.querySelector(
        "div.panel-header.w > h3 > a"
      ).textContent;
    } else {
      presenceData.details = "Viewing game:";
      presenceData.state = document.querySelector(".info").textContent.trim();
    }
  } else if (
    document.querySelector(".pagetitle") !== null &&
    document.querySelector(".pagetitle").textContent == "Achievement Details"
  ) {
    presenceData.details = "Viewing acheievement:";
    presenceData.state = document.querySelector(".title").textContent;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText =
      "Game: " +
      document.querySelector("div.panel-header.w > h3 > a").textContent;
  } else if (
    document.location.pathname == "/news" ||
    document.location.pathname == "/news.aspx"
  ) {
    presenceData.details = "Viewing the latest news";
  } else if (document.querySelector(".newsitem > header > h1") !== null) {
    presenceData.details = "Reading article:";
    presenceData.state = document.querySelector(
      ".newsitem > header > h1"
    ).textContent;
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname == "/suggestnews.aspx") {
    presenceData.details = "Suggesting new news";
    presenceData.smallImageKey = "writing";
  } else if (document.location.pathname == "/news/community") {
    presenceData.details = "Viewing the latest community news";
  } else if (document.location.pathname == "/siteupdates") {
    presenceData.details = "Viewing the latest site updates";
  } else if (document.location.pathname == "/games.aspx") {
    presenceData.details = "Viewing all games";
  } else if (document.location.pathname == "/steam-achievements.aspx") {
    presenceData.details = "Viewing all achievements";
  } else if (document.location.pathname == "/solutions-required.aspx") {
    presenceData.details = "Viewing all achievements";
    presenceData.state = "that require guides";
  } else if (document.location.pathname == "/sitereviews.aspx") {
    presenceData.details = "Viewing site reviews";
  } else if (document.location.pathname == "/solutions") {
    presenceData.details = "Viewing achievement solutions";
  } else if (
    document.location.pathname.includes("/viewcomment.aspx") &&
    document.querySelector(".pagetitle") !== null &&
    document.querySelector(".pagetitle").textContent == "View Solution"
  ) {
    presenceData.details = "Viewing solution for achievement:";
    presenceData.state = document.querySelector(".title").textContent;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText =
      "Game: " +
      document.querySelector("div.panel-header.w > h3 > a").textContent;
  } else if (document.location.pathname == "/serieslist.aspx") {
    presenceData.details = "Viewing Game Series";
  } else if (document.location.pathname == "/popularachievements.aspx") {
    presenceData.details = "Viewing popular achievements";
  } else if (document.location.pathname == "/walkthroughs.aspx") {
    presenceData.details = "Viewing Steam Walkthroughs and Guides";
  } else if (document.location.pathname == "/reviews.aspx") {
    presenceData.details = "Viewing user reviews";
  } else if (document.location.pathname == "/gamereleases.aspx") {
    presenceData.details = "Viewing upcoming releases";
  } else if (document.location.pathname == "/searchresults.aspx") {
    presenceData.details = "Searching for:";
    presenceData.state = (
      document.querySelector("#txtSearchFor") as HTMLInputElement
    ).value;
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname.includes("/products")) {
    if (document.location.pathname.includes("/latest")) {
      presenceData.details = "Viewing the latest products";
    } else if (document.location.pathname.includes("/steam-sales")) {
      presenceData.details = "Viewing steam sales";
    } else if (document.querySelector(".pagetitle") !== null) {
      presenceData.details = "Viewing prices for:";
      presenceData.state = document
        .querySelector(".pagetitle")
        .textContent.replace("Best price for ", "")
        .trim();
    }
  } else if (document.location.pathname.includes("/forum/")) {
    presenceData.smallImageKey = "reading";
    if (document.location.pathname.includes("/viewthreads.aspx")) {
      presenceData.details = "Forums - Viewing their recent threads";
    } else if (document.location.pathname.includes("/forums.aspx")) {
      presenceData.details = "Browsing the forums...";
    } else if (document.location.pathname.includes("/viewboard.aspx")) {
      presenceData.details = "Forums - Viewing board:";
      presenceData.state = document.querySelector(".pagetitle").textContent;
    } else if (document.location.pathname.includes("/newthreads.aspx")) {
      presenceData.details = "Forums - Viewing new threads";
    } else if (document.location.pathname.includes("/viewthread.aspx")) {
      presenceData.details = "Forums - Reading thread:";
      presenceData.state = document.querySelector(
        "#oMessageThread > div:nth-child(2) > h1"
      ).textContent;
    } else if (document.location.pathname.includes("/search.aspx")) {
      presenceData.details = "Forums - Searching for:";
      presenceData.state = (
        document.querySelector("#txtSearchFor") as HTMLInputElement
      ).value;
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.pathname.includes("/leaderboard")) {
    presenceData.details = "Viewing the leaderboards";
  } else if (document.location.pathname.includes("/userleaderboards.aspx")) {
    presenceData.details = "Viewing user created leaderboards";
  } else if (document.location.pathname == "/") {
    presenceData.details = "Browsing...";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

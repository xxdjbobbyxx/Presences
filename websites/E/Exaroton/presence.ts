const presence = new Presence({
    clientId: "792696743686307861"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  paths = {
    ":": "Home Page",
    go: "Login Page",
    account: "Account Settings",
    server: "Panel - Server",
    console: "Panel - Console",
    log: "Panel - Log",
    options: "Panel - Options",
    software: "Panel - Software",
    players: "Panel - Players",
    files: "Panel - Files",
    addons: "Panel - Plugins",
    worlds: "Panel - Worlds",
    backups: "Panel - Backups",
    access: "Panel - Access"
  };

presence.on("UpdateData", async () => {
  if (document.location.hostname === "exaroton.com") {
    presenceData.startTimestamp = Date.now();
    let path = document.location.pathname.replace(
      /\//g,
      ""
    ) as keyof typeof paths;
    const matchedPath = path.match(/:|software|players|addons/);
    if (matchedPath && !matchedPath.index)
      path = matchedPath[0] as keyof typeof paths;
    const page = paths[path];
    if (page) presenceData.details = page;
  } else {
    const page = document.location.hostname.split(".")[0];
    presenceData.startTimestamp = Date.now();
    switch (page) {
      case "support":
        if (document.location.pathname.includes("categories")) {
          const category = document.querySelector(".page-header h1");
          if (category) {
            presenceData.details = "Help Center - Viewing category:";
            presenceData.state = category.textContent.trim();
          }
        } else if (document.location.pathname.includes("sections")) {
          const section = document.querySelector(".page-header h1");
          if (section) {
            presenceData.details = "Help Center - Viewing section:";
            presenceData.state = section.textContent.trim();
          }
        } else if (document.location.pathname.includes("articles")) {
          const article = document.querySelector(".article-title");
          if (article) {
            presenceData.details = "Help Center - Viewing article:";
            presenceData.state = article.textContent.trim();
          }
        } else if (document.location.pathname.includes("search")) {
          const article: HTMLInputElement = document.querySelector("#query");
          presenceData.details = "Help Center - Searching:";
          presenceData.state = article.value;
        } else {
          presenceData.details = "Help Center";
        }
        break;
      default:
        presenceData.details = "Browsing...";
        break;
    }
  }
  presence.setActivity(presenceData);
});

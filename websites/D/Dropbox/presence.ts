const presence = new Presence({
  clientId: "777578842172162068"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "dropbox_logo"
    },
    websiteLoadTimestamp = Math.floor(Date.now() / 1000),
    showFileNames = await presence.getSetting("showFileNames");

  if (document.location.pathname == "/") {
    presenceData.details = "Viewing homepage";
  } else if (document.location.pathname.startsWith("/login")) {
    presenceData.details = "Logging-in";
  } else if (document.location.pathname.startsWith("/plans")) {
    presenceData.details = "Choosing new plan";
  } else if (document.location.search.startsWith("?preview")) {
    presenceData.details = "Previewing a file";
    if (showFileNames) {
      presenceData.state = document.querySelector(".filename--text").innerHTML;
    }
  } else if (
    document.location.pathname.startsWith("/h") ||
    document.location.pathname.startsWith("/home")
  ) {
    const currentFolder = document.querySelector(".page-header-text > h2");
    if (currentFolder) {
      presenceData.details = "Viewing folder";
      if (showFileNames) {
        presenceData.state = currentFolder.innerHTML;
      }
    } else {
      presenceData.details = "Browsing files";
      presenceData.state = "All files";
    }
  } else if (document.location.pathname.startsWith("/share")) {
    presenceData.details = "Browsing files";
    presenceData.state = "Shared files";
  } else if (document.location.pathname.startsWith("/request")) {
    presenceData.details = "Browsing files";
    presenceData.state = "File requests";
  } else if (document.location.pathname.startsWith("/deleted_files")) {
    presenceData.details = "Browsing files";
    presenceData.state = "Deleted files";
  } else if (document.location.pathname.startsWith("/account")) {
    presenceData.details = "Changing account settings";
  } else if (document.location.pathname.startsWith("/transfer")) {
    presenceData.details = "Dropbox Transfer";
  } else if (document.location.pathname.startsWith("/paper")) {
    presenceData.details = "Dropbox Paper";
  } else if (document.location.pathname.startsWith("/scl")) {
    presenceData.details = "Working on paper";
    presenceData.startTimestamp = websiteLoadTimestamp;
    if (showFileNames) {
      presenceData.state = document.title;
    }
  } else if (document.location.pathname.startsWith("/landing/hellosign")) {
    presenceData.details = "Dropbox HelloSign";
  } else if (document.location.pathname.startsWith("/apps")) {
    presenceData.details = "Browsing AppStore";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

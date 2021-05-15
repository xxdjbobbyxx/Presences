const presence = new Presence({
  clientId: "808404067344318494"
});

presence.on("UpdateData", async () => {
  async function getStringFromSettings(
    pres: Presence,
    id: string,
    values: Record<string, string>
  ): Promise<string> {
    let str: string = await pres.getSetting(id);

    for (const [key, value] of Object.entries(values)) {
      str = str.replace(RegExp(`%${key}%`, "g"), value);
    }
    return str;
  }
  const presenceData: PresenceData = {
    largeImageKey: "icon",
    startTimestamp: new Date().getTime()
  };
  let loc = window.location.href;
  if (loc.endsWith("/")) loc = loc.slice(0, -1); // remove trailing slash

  // if on a subdomain (reading a doc)
  if (loc.match(/([a-z0-9-]+)[.]readthedocs[.](io|org).*/g)) {
    const name = loc.replace(
      /https:\/\/([a-z0-9-]+)[.]readthedocs[.](io|org).*/g,
      "$1"
    ); // get subdomain

    if (name === "docs")
      presenceData.details = await getStringFromSettings(
        presence,
        "viewing_main_docs",
        {}
      );
    else
      presenceData.details = await getStringFromSettings(
        presence,
        "viewing_docs",
        { name: name }
      );

    if (loc.match(/search/g)) {
      // if searching on docs
      let term = loc.replace(
        /([a-z0-9-/:]+)[.]readthedocs[.](io|org)\/.+\/.+\/search.*\?q=([^&]+).*/g,
        "$3"
      ); // get search term

      if (term.endsWith("#")) term = term.slice(0, -1); // remove trailing hashtag
      if (!loc.endsWith("/search") && !loc.endsWith("/search.html"))
        presenceData.state = await getStringFromSettings(
          presence,
          "searching_for",
          { term: term }
        );
    }
  } else if (loc.endsWith(".io") || loc.endsWith(".org"))
    presenceData.details = await getStringFromSettings(presence, "main", {});
  else if (loc.endsWith("signup"))
    presenceData.details = await getStringFromSettings(presence, "signup", {});
  else if (loc.endsWith("login"))
    presenceData.details = await getStringFromSettings(presence, "login", {});
  else if (loc.match(/accounts/))
    presenceData.details = await getStringFromSettings(presence, "manage", {});
  else if (loc.match(/profiles/))
    presenceData.details = await getStringFromSettings(presence, "profile", {
      name: loc.split("/")[loc.split("/").length - 1]
    });
  else if (loc.endsWith("dashboard"))
    presenceData.details = await getStringFromSettings(
      presence,
      "dashboard",
      {}
    );
  // if searching for docs with the search term in the url
  else if (loc.match(/search/)) {
    if (!loc.endsWith("/search")) {
      const term = loc.replace(
        /https?:\/\/readthedocs[.](io|org)\/search\/\?q=([^&]+).*/g,
        "$2"
      ); // get search term
      presenceData.state = await getStringFromSettings(
        presence,
        "searching_for",
        { term: term }
      );
    }

    presenceData.details = await getStringFromSettings(
      presence,
      "searching",
      {}
    );
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});

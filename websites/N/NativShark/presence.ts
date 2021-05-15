const presence: Presence = new Presence({
    clientId: "787034842084016158"
  }),
  startTimestamp: number = Math.floor(Date.now() / 1000),
  pathDescriptors = [
    ["/learn/vocabulary", "Learning new vocabulary"],
    ["/learn/kanji", "Learning new kanji"],
    ["/learn/hiragana", "Learning the Hiragana"],
    ["/learn/katakana", "Learning the Katakana"],
    ["/tools/flashcards/review", "Reviewing flashcards"],
    ["/tools/flashcards/browse", "Browsing flashcard decks"],
    ["/tools/shadow_loops", "Browsing shadow loop decks"],
    ["/tools/pitch", "Studying the pitch of sentences"],
    ["/tools/conjugator", "Practicing conjugations"],
    ["/tools/quizzes/", "Doing a quiz"],
    ["/tools/quizzes", "Browsing quizzes"],
    ["/tools/stats", "Viewing their stats"],
    ["/tools/extra-credit", "Earning some extra credits"],
    ["/tools/using-nativshark", "Reading 'Using NativShark'"],
    ["/faq", "Reading the FAQ"]
  ];

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "nativshark_logo_lg",
      startTimestamp
    },
    { pathname } = window.location;

  // Viewing the dashboard
  if (pathname.startsWith("/my-journey")) {
    const unitInfo = document
      .querySelector<HTMLElement>("[class*='SubNavigationDropdown__SNButton']")
      .innerText.split("\n");

    if (unitInfo.length === 2) {
      let unitText = unitInfo[0];
      const unitStatus = unitInfo[1];

      if (unitText === "All Units") {
        unitText = "Today's units";
      }
      presenceData.details = "Viewing the dashboard";
      presenceData.state = `${unitText}: ${unitStatus}`;
    }

    // Reading a lesson
  } else if (pathname.startsWith("/lessons/")) {
    const lessonTitle = document.querySelector(
      "[class*='LessonHeader__Title'] > span"
    ).textContent;
    presenceData.details = `Viewing lesson '${lessonTitle}'`;

    // Reading a dialogue
  } else if (pathname.startsWith("/dialogues/")) {
    const dialogueTitle = document.querySelector(
      "[class*='id__DialogueGrid'] > div"
    ).textContent;
    presenceData.details = `Reading dialogue '${dialogueTitle}'`;

    // Test all the other path -> details mappings
  } else {
    for (const [path, detailsText] of pathDescriptors) {
      if (pathname.startsWith(path)) {
        presenceData.details = detailsText;
        break;
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData, true);
  }
});

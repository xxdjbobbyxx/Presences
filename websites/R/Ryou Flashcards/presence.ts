const presence = new Presence({
    clientId: "794689032411283476"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "ryou",
      startTimestamp
    },
    { pathname } = window.location,
    title = document.querySelector("title").textContent;

  if (title.includes("Dashboard")) {
    presenceData.details = "Viewing Dashboard";
    delete presenceData.state;
  } else if (pathname.startsWith("/learn/")) {
    if (pathname.includes("/kanji")) {
      presenceData.details = "Learning kanji";
      if (pathname.includes("/grades")) {
        const grade = pathname.match(/\/grades\/(\d+)/);
        if (grade != null) {
          presenceData.state = `Grade ${parseInt(grade[1])} kanji`;
        }
      } else if (pathname.includes("/jlpt")) {
        const jlptlevel = pathname.match(/\/jlpt\/(\d+)/);
        if (jlptlevel != null) {
          presenceData.state = `JLPT N${parseInt(jlptlevel[1])} kanji`;
        }
      } else if (pathname.includes("/genki")) {
        const genkilesson = pathname.match(/\/genki\/(\d+)/);
        if (genkilesson != null) {
          presenceData.state = `Genki lesson ${parseInt(genkilesson[1])} kanji`;
        }
      } else if (pathname.includes("/rtk")) {
        const rtklesson = pathname.match(/\/rtk\/(\d+)/);
        if (rtklesson != null) {
          presenceData.state = `RTK lesson ${parseInt(rtklesson[1])} kanji`;
        }
      } else if (pathname.includes("/wk")) {
        const wklevel = pathname.match(/\/wk\/(\d+)/);
        if (wklevel != null) {
          presenceData.state = `Wanikani level ${parseInt(wklevel[1])} kanji`;
        }
      } else {
        delete presenceData.state;
      }
    } else if (pathname.includes("/vocabulary")) {
      presenceData.details = "Learning vocabulary";
      delete presenceData.state;
    }
  } else if (pathname.startsWith("/vocabulary")) {
    presenceData.details = "Learning vocabulary";
    if (pathname.includes("/jlpt/")) {
      const jlptdetails = pathname.match(/\/jlpt\/(\d+)\/(\d+)/);
      if (jlptdetails != null) {
        presenceData.state = `JLPT N${parseInt(jlptdetails[1])} page ${parseInt(
          jlptdetails[2]
        )}`;
      }
    } else if (pathname.includes("/genki")) {
      const genkilesson = pathname.match(/\/genki\/(\d+)/);
      if (genkilesson != null) {
        presenceData.state = `Genki lesson ${parseInt(genkilesson[1])}`;
      }
    } else if (pathname.includes("/unit")) {
      const unitname = document.querySelector("#vocabulary-unit h2");
      if (unitname != null) {
        presenceData.state = unitname.textContent;
      }
    } else {
      const vocabword = title.match(/[一-龯ぁ-ゔゞァ-・ヽヾ゛゜ー]+/),
        vocabreading = document.querySelector(
          "#vocabulary-reading .kanji-field"
        );
      if (vocabword != null && vocabreading != null) {
        presenceData.state = `${vocabword[0]} (${vocabreading.textContent})`;
      } else {
        delete presenceData.state;
      }
    }
  } else if (pathname.startsWith("/kanji")) {
    presenceData.details = "Learning kanji";
    const kanji = document.querySelector("#kanji"),
      kanjimeaning = document.querySelector("#kanji-meaning");
    if (kanji != null && kanjimeaning != null) {
      presenceData.state = `${kanji.textContent} (${kanjimeaning.textContent})`;
    } else {
      delete presenceData.state;
    }
  } else if (pathname.startsWith("/practice")) {
    if (pathname.includes("/kanji")) {
      presenceData.details = "Practicing kanji";
    } else if (pathname.includes("/vocabulary")) {
      presenceData.details = "Practicing vocabulary";
    }
    const currentKanji = document.querySelector("#current-kanji");
    if (currentKanji != null) {
      const challenge = document
        .querySelector("#challenge")
        .textContent.match(/reading|meaning/)[0];
      presenceData.state = `${
        challenge.charAt(0).toUpperCase() + challenge.slice(1)
      } of ${currentKanji.textContent}`;
    } else {
      delete presenceData.state;
    }
  } else if (pathname.startsWith("/reviews")) {
    presenceData.details = "Completing reviews";
    const kanji = document.querySelector("#current-kanji"),
      progress = document.querySelector("#progress-bar-wrapper");
    if (kanji != null && progress != null) {
      presenceData.state = `${kanji.textContent} ・ ${
        Math.round(
          (parseFloat(progress.getAttribute("progress")) + Number.EPSILON) * 100
        ) / 100
      }%`;
    } else {
      delete presenceData.state;
    }
  } else if (pathname.startsWith("/summary")) {
    presenceData.details = "Viewing review results";
    const statsList = document.querySelectorAll("#summary-stats li");
    if (statsList != null) {
      const totalLi = statsList[0],
        correctLi = statsList[1];
      if (totalLi != null && correctLi != null) {
        presenceData.state = `${correctLi.querySelector("p").textContent}/${
          totalLi.querySelector("p").textContent
        } correct`;
      } else {
        delete presenceData.state;
      }
    } else {
      delete presenceData.state;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

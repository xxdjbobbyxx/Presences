interface KoLStatus {
  turnsthisrun: number;
  lastadv: {
    name: string;
  };
  locked: "choice" | "fight" | false;
  class: number;
  level: number;
  path: string;
  pathname: string;
  hardcore: string;
  name: string;
  playerid: string;
  daysthisrun: string;
}

type Action =
  | { type: "MONSTER"; payload: string }
  | { type: "CHOICE"; payload: number }
  | { type: "ADVENTURES"; payload: number }
  | {
      type:
        | "MALL"
        | "KMAIL"
        | "UNHANDLED"
        | "FAMILIAR"
        | "INVENTORY"
        | "SKILLS"
        | "SENDMESSAGE";
    };

let kolStatus: Partial<KoLStatus> = {};

async function fetchStatus() {
  const response = await window.fetch(
    `${location.origin}/api.php?what=status&for=PreMiD`
  );
  kolStatus = await response.json();
  return kolStatus;
}

const classNames = {
  1: "Seal Clubber",
  2: "Turtle Tamer",
  3: "Pastamancer",
  4: "Sauceror",
  5: "Disco Bandit",
  6: "Accordion Thief",
  11: "Avatar Of Boris",
  12: "Zombie Master",
  14: "Avatar Of Jarlsberg",
  15: "Avatar Of Sneaky Pete",
  17: "Ed",
  18: "Cowpuncher",
  19: "Beanslinger",
  20: "Snake Oiler",
  23: "Gelatinous Noob",
  24: "Vampyre",
  25: "Plumber"
} as { [id: number]: string };

function formatDetails() {
  const path = Number(kolStatus.path),
    classId = kolStatus.class,
    className = classId in classNames ? classNames[classId] : "Unknown Class";

  if (path > 0) {
    const hardcore = Number(kolStatus.hardcore) === 1 ? "HC" : "SC",
      pathName = kolStatus.pathname;
    return `[${kolStatus.turnsthisrun}/${kolStatus.daysthisrun}] ${hardcore} ${pathName}`;
  }

  return `Level ${kolStatus.level} ${className}`;
}

function generateButtons() {
  return [
    {
      label: "Visit profile",
      url: `https://kingdomofloathing.com/showplayer.php?who=${kolStatus.playerid}`
    }
  ];
}

const presence = new Presence({
  clientId: "814073263378137097"
});

function setActivity(state: string) {
  presence.setActivity({
    details: formatDetails(),
    state,
    largeImageKey: "kol",
    buttons: generateButtons()
  } as PresenceData);
}

presence.on("iFrameData", async (action: Action) => {
  switch (action.type) {
    case "MONSTER":
      await fetchStatus();
      setActivity(`Fighting ${action.payload} in ${kolStatus.lastadv.name}`);
      break;
    case "CHOICE":
      await fetchStatus();
      setActivity(`Adventuring in ${kolStatus.lastadv.name}`);
      break;
    case "ADVENTURES":
      await fetchStatus();
      break;
    case "MALL":
      setActivity("Browsing the mall");
      break;
    case "KMAIL":
      setActivity("Reading kmails");
      break;
    case "SENDMESSAGE":
      setActivity("Sending a kmail");
      break;
    case "FAMILIAR":
      setActivity("Tending to their familiars");
      break;
    case "INVENTORY":
      setActivity("Surveying their inventory");
      break;
    case "SKILLS":
      setActivity("Managing their skills");
      break;
    case "UNHANDLED":
      setActivity("Thinking carefully");
      break;
    default:
      presence.setTrayTitle();
      presence.setActivity();
      break;
  }
});

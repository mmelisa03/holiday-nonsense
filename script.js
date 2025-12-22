let tone = "gentle";
// Built quickly for holiday fun - refactor planned post-holidays
/* ---------------- PEOPLE ---------------- */

const people = [
  "Melisa",
  "Geo",
  "Mason",
  "Josie",
  "Mirella",
  "Nick",
  "Mikal",
  "Matthew"
];

/* ---------------- PERSONALIZED MESSAGES ---------------- */

const messages = {
  normal: {
    Melisa: [
      "Melisa, Season's Greetings! Wishing you joy, peace, and zero burnt cookies.",
      "Melisa, Happy Holidays! You survived another year with grace."
    ],
    Geo: [
      "Geo, Happy Holidays! May your year be filled with wins and fewer dad jokes."
    ],
    Mason: [
      "Mason, Merry Christmas! Keep slaying those levels… and the fruitcake."
    ],
    Josie: [
      "Josie, Festive cheers! Your smile outshines the tree lights."
    ],
    Mirella: [
      "Mirella, Happy Hanukkah! Eight nights of miracles and questionable puns."
    ],
    Nick: [
      "Nick, Joy to the world! (But mostly to you and the snacks.)"
    ],
    Mikal: [
      "Mikal, Holiday vibes! Rock on through the eggnog haze."
    ],
    Matthew: [
      "Matthew, Season's Greetings! Adventure awaits beyond the mistletoe."
    ],
    default: [
      "Happy Holidays! You've been nice… mostly."
    ]
  },

  chaos: {
    Melisa: [
      "Melisa, Season’s BEATINGS! Return that fruitcake immediately."
    ],
    Geo: [
      "Geo, Merry Xmas… said no one after that playlist."
    ],
    Mason: [
      "Mason, Naughty List MVP! Coal incoming — upgrade pending."
    ],
    Josie: [
      "Josie, Joy to the world? Nah. Just your Netflix queue."
    ],
    Mirella: [
      "Mirella, Eight Crazy Nights! Latkes or regret?"
    ],
    Nick: [
      "Nick, Ho Ho NO. Step away from the last cookie."
    ],
    Mikal: [
      "Mikal, Eggnog Overdose Alert. Rock bottom never looked so festive."
    ],
    Matthew: [
      "Matthew, Mistletoe Dodgeball Champ. Survived another year."
    ],
    default: [
      "Bah Humbug! You’re on the naughty list — with style."
    ]
  }
};

/* ---------------- OUTCOMES ---------------- */

const niceOutcomes = [
  "something chosen with so much love",
  "a gift picked just for them",
  "a reminder of how loved they are",
  "something thoughtful and heartfelt",
  "a gift that says, 'you matter to me'",
  "something that felt right immediately",
  "a little piece of love wrapped up",
  "something perfect, just for them"
];

const snarkOutcomes = [
  "a chance to breathe through it",
  "character development",
  "a learning opportunity",
  "growth",
  "a moment",
  "a journey",
  "a life lesson because they're ${name}",
  "a chance to practice patience because they're ${name}"
];

const chaosSnarkOutcomes = [
  "a lump of coal because they're ${name}",
  "a lesson because they're ${name}",
  "a plot twist",
  "a core memory (unfortunately)",
  "exactly what you'd expect because they're ${name}",
  "a situation to navigate"
];

const memeOutcomes = [
  "a reaction meme",
  "a group chat event",
  "a screenshot moment",
  "a meme waiting to happen",
  "a moment with lore"
];

/* ---------------- DOM ---------------- */

const playerSelect = document.getElementById("player-select");
const generateBtn = document.getElementById("btn-message");
const messageOutput = document.getElementById("message-output");
const copyBtn = document.getElementById("copy-btn");
const chaosToggle = document.getElementById("chaos-toggle");
const historyList = document.getElementById("history-list");
const elfImage = document.getElementById("elf-image");

const statRounds = document.getElementById("stat-rounds");
const statDevelopment = document.getElementById("stat-development");
const statCoal = document.getElementById("stat-coal");
const statMemes = document.getElementById("stat-memes");

const bgMusic = document.getElementById("bg-music");

let musicStarted = false;

function startBackgroundMusic() {
  if (musicStarted) return;

  bgMusic.volume = 0.35;
  bgMusic.load();
  bgMusic.play().catch(() => {});
  musicStarted = true;
}


/* ---------------- STATE ---------------- */

const HISTORY_LIMIT = 5;
const history = [];

const stats = {
  rounds: 0,
  development: 0,
  coal: 0,
  memes: 0
};

/* ---------------- HELPERS ---------------- */

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function applyName(template, name) {
  return template.replaceAll("${name}", name);
}

function getOtherPeople(player) {
  return people.filter(p => p !== player);
}

function getPersonalMessage(player) {
  const mode = tone === "chaos" ? "chaos" : "normal";
  const pool = messages[mode][player] || messages[mode].default;
  return getRandomItem(pool);
}

function getSnarkOutcome(name) {
  const pool = tone === "chaos" ? chaosSnarkOutcomes : snarkOutcomes;
  const choice = getRandomItem(pool);
  return choice.includes("${name}") ? applyName(choice, name) : choice;
}

function maybeAddMeme() {
  const used = Math.random() < 0.3;
  return used
    ? { text: ` This will result in ${getRandomItem(memeOutcomes)}.`, used: true }
    : { text: "", used: false };
}

const sfxGentle = document.getElementById("sfx-gentle");
const sfxChaos = document.getElementById("sfx-chaos");

function playSFX() {
  const sfx = tone === "chaos" ? sfxChaos : sfxGentle;
  sfx.currentTime = 0;
  sfx.volume = 0.5;
  sfx.play();
}


/* ---------------- ELF ---------------- */

function setElfMood(snarkThing) {
  elfImage.classList.remove("mood-gentle", "mood-chaos", "mood-spicy");
  elfImage.classList.add(tone === "chaos" ? "mood-chaos" : "mood-gentle");

  const spicyTriggers = ["character development", "coal", "plot twist"];
  if (spicyTriggers.some(t => snarkThing.toLowerCase().includes(t))) {
    elfImage.classList.add("mood-spicy");
    setTimeout(() => elfImage.classList.remove("mood-spicy"), 900);
  }
}

/* ---------------- HISTORY & STATS ---------------- */

function addToHistory(text) {
  history.unshift(text);
  if (history.length > HISTORY_LIMIT) history.pop();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function renderStats() {
  statRounds.textContent = stats.rounds;
  statDevelopment.textContent = stats.development;
  statCoal.textContent = stats.coal;
  statMemes.textContent = stats.memes;
}

/* ---------------- GENERATION ---------------- */

function generateSeasonMessage(player) {
  const available = getOtherPeople(player);
  const nicePerson = getRandomItem(available);
  const snarkPerson = getRandomItem(available.filter(p => p !== nicePerson));

  const intro = getPersonalMessage(player);
  const niceThing = getRandomItem(niceOutcomes);
  const snarkThing = getSnarkOutcome(snarkPerson);
  const meme = maybeAddMeme();

  const text = `${intro}

This year, ${nicePerson} is getting ${niceThing}.

Meanwhile, ${snarkPerson} is receiving… ${snarkThing}.${meme.text}`;

  return { text, snarkThing, memeUsed: meme.used };
}

/* ---------------- EVENTS ---------------- */

chaosToggle.addEventListener("change", () => {
  tone = chaosToggle.checked ? "chaos" : "gentle";
});

generateBtn.addEventListener("click", () => {
  const player = playerSelect.value;
  if (!player) {
    messageOutput.textContent = "Please select who you are first 🙂";
    return;
  }

  startBackgroundMusic(); 

  const result = generateSeasonMessage(player);

  playSFX();
  
  setElfMood(result.snarkThing);

  stats.rounds++;
  const lower = result.snarkThing.toLowerCase();
  if (lower.includes("character development")) stats.development++;
  if (lower.includes("coal")) stats.coal++;
  if (result.memeUsed) stats.memes++;

  renderStats();

  messageOutput.style.opacity = 0;
  setTimeout(() => {
    messageOutput.textContent = result.text;
    messageOutput.style.opacity = 1;
    addToHistory(result.text);
    renderHistory();
  }, 100);
});

copyBtn.addEventListener("click", () => {
  const text = messageOutput.textContent;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1500);
  });
});


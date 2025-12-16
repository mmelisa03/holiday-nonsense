let tone = "gentle"; 

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

const niceOutcomes = [
    "something chosen with so much love",
    "a gift picked just for them",
    "something that made me smile when I saw it",
    "a reminder of how loved they are",
    "something thoughtful and heartfelt",
    "a gift that says, 'you matter to me'",
    "something that felt right immediately",
    "a little piece of love wrapped up",
    "a gift chosen with care and intention",
    "something that comes straight from the heart",
    "something perfect, just for them",
    "a gift wrapped in 'I adore you' energy",
    "a gift wrapped in affection",
    "something that feels like a warm hug",
    "something for my favorite human (don't tell the others)",
    "a quiet reminder that they're cherished",
    "a small but intentional joy",
    "a gift that honors their heart",
    "something that feels personal",
    "a reminder that they are deeply loved"
];

const snarkOutcomes = [
    "a chance to breathe through it",
    "a thoughtful pause",
    "an experience",
    "character development",
    "a learning opportunity",
    "a surprise",
    "growth",
    "a moment",
    "a journey",
    "something memorable",
    "an opportunity for reflection",
    "a situation",
    "a choice",
    "a season of personal growth",
    "an unexpected adventure",
    "a life lesson (lightly applied) because they're ${name}",
    "a chance to practice patience because they're ${name}",
    "an opportunity to expand perspective",
    "something that builds resilience",
    "a moment for future storytelling",
    "a holiday memory in the making"
];

const chaosSnarkOutcomes = [
    "a moment that will be referenced later",
    "what we talked about",
    "something predictable",
    "a lump of coal because they're ${name}",
    "a lesson because they're ${name}",
    "a reminder of why we limit family time",
    "a learning curve",
    "a season highlight",
    "a plot twist",
    "a core memory (unfortunately)",
    "exactly what you'd expect because they're ${name}",
    "a situation to navigate",
    "nothing extra because they're ${name}"
];

const memeOutcomes = [
    "a reaction meme",
    "a group chat event",
    "something that could have been a text",
    "a moment that requires a GIF",
    "a meme waiting to happen",
    "a screenshot moment",
    "an inside joke that escalated",
    "a moment with lore",
    "a core memory (documented)",
    "something that will be referenced forever",
    "a situation that becomes a meme",
    "a moment that lives in the group chat",
    "something that gets quoted later",
    "an unplanned meme",
    "a moment that becomes shorthand",
    "a reaction image origin story",
    "a situation that needs context",
    "a moment that starts with 'remember when'",
    "something that will resurface unexpectedly"
];

const historyList = document.getElementById("history-list");
const HISTORY_LIMIT = 5; 
const history = [];

function addToHistory(text) {
    history.unshift(text);
    if (history.length > HISTORY_LIMIT) history.pop();
}

function renderHistory() {
    historyList.innerHTML = "";
    for(const item of history) {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    }
}

const elfImage = document.getElementById("elf-image");

function setElfMood(snarkThing) {
    elfImage.classList.remove("mood-gentle", "mood-chaos", "mood-spicy");

    elfImage.classList.add(tone === "chaos" ? "mood-chaos" : "mood-gentle");

    const spicyTriggers = [
        "exercise in patience",
        "lump of coal",
        "plot twist",
        "character development"
    ];

    const lower = snarkThing.toLowerCase();
    if(spicyTriggers.some(t => lower.includes(t))) {
        elfImage.classList.remove("mood-spicy");
        void elfImage.offsetWidth;
        elfImage.classList.add("mood-spicy");

        setTimeout(() => {
            elfImage.classList.remove("mood-spicy");
        }, 900);
    }
}

const chaosToggle = document.getElementById("chaos-toggle");

chaosToggle.addEventListener("change", () => {
    tone = chaosToggle.checked ? "chaos" : "gentle";
});

const statRounds = document.getElementById("stat-rounds");
const statDevelopment = document.getElementById("stat-development");
const statCoal = document.getElementById("stat-coal");
const statMemes = document.getElementById("stat-memes");

const stats = {
    rounds: 0,
    development: 0,
    coal: 0,
    memes: 0
};

function renderStats() {
    statRounds.textContent = stats.rounds;
    statDevelopment.textContent = stats.development;
    statCoal.textContent = stats.coal;
    statMemes.textContent = stats.memes; 
}

const playerSelect = document.getElementById("player-select");
const generateBtn = document.getElementById("btn-message"); 
const messageOutput = document.getElementById("message-output");

function applyName(template, name) {
    return template.replaceAll("${name}", name);
}

function getOtherPeople(player) {
    return people.filter(person => person !== player);
}

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
function maybeAddMeme() {
  const used = Math.random() < 0.3;
  return used
    ? { text: ` This will result in ${getRandomItem(memeOutcomes)}.`, used: true }
    : { text: "", used: false };
}

function generateSeasonMessage(player) {
  const availablePeople = getOtherPeople(player);

  const nicePerson = getRandomItem(availablePeople);
  const snarkPerson = getRandomItem(
    availablePeople.filter(p => p !== nicePerson)
  );

  const niceThing = getRandomItem(niceOutcomes);
  const snarkThing = getSnarkOutcome(snarkPerson);

  const meme = maybeAddMeme();

  const text = `This year, ${nicePerson} is getting ${niceThing}.

Meanwhile, ${snarkPerson} is receiving… ${snarkThing}.${meme.text}`;

  return { text, snarkThing, memeUsed: meme.used };
}



function getSnarkOutcome(name) {
    const pool = tone === "chaos" ? chaosSnarkOutcomes : snarkOutcomes;
    const choice = getRandomItem(pool);

    return choice.includes("${name}")
    ? applyName(choice, name)
    : choice;
}

generateBtn.addEventListener("click", () => {
    const player = playerSelect.value;

    if(!player) { 
        messageOutput.textContent = "Please select who you are first 🙂";
        return; 
    }

   // Copy button - SEPARATE listener
const copyBtn = document.getElementById("copy-btn");

copyBtn.addEventListener("click", () => {
  const text = messageOutput.textContent;

  if (!text || text === "Please select who you are first 🙂") {
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => {
      copyBtn.textContent = "📋 Copy";
    }, 1500);
  });
});

// DO IT button - SEPARATE listener
generateBtn.addEventListener("click", () => {
  const player = playerSelect.value;

  if (!player) {
    messageOutput.textContent = "Please select who you are first 🙂";
    return;
  }

  const result = generateSeasonMessage(player);
  setElfMood(result.snarkThing);
  const msg = result.text;

  stats.rounds += 1;

  const lowerSnark = result.snarkThing.toLowerCase();
  if (lowerSnark.includes("character development")) stats.development += 1;
  if (lowerSnark.includes("lump of coal") || lowerSnark.includes("coal")) stats.coal += 1;
  if (result.memeUsed) stats.memes += 1;

  renderStats();

  messageOutput.style.opacity = 0;

  setTimeout(() => {
    messageOutput.textContent = msg;
    messageOutput.style.opacity = 1;

    addToHistory(msg);
    renderHistory();

    playerSelect.value = "";
    playerSelect.focus();
  }, 100);
});
})

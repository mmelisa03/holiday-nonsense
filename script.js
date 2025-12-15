const tone = "gentle"; 

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
    "a gift for someone I absolutely adore",
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
    "something that will resurface unexpectedly",
];


const playerSelect = document.getElementById("player-select");
const generateBtn = document.getElementById("btn-message"); 
const messageOutput = document.getElementById("message-output");

function applyName(template, name) {
    return template.replace("${name}", name);
}

function maybeAddMeme() {
    return Math.random() < 0.3
    ? ` This will result in ${getRandomItem(memeOutcomes)}.`
    : "";
}

function getOtherPeople(player) {
    return people.filter(person => person !== player);
}

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
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

  return `This year, ${nicePerson} is getting ${niceThing}.
  
Meanwhile, ${snarkPerson} is receiving… ${snarkThing}.${meme}`;
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
    
    messageOutput.style.opacity = 0;

    setTimeout(() => {
        messageOutput.textContent = generateSeasonMessage(player);
        messageOutput.style.opacity = 1;
}, 100);
});


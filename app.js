const overlay = document.querySelector("#overlay");
const ul = document.querySelector("ul");
const querty = document.querySelector("#qwerty");
const buttons = document.querySelectorAll("button");
const hearts = document.querySelectorAll("ol li");
const phrases = [
  "My past is everything I failed to be",
  "In order to understand I destroyed myself",
  "I wasnt meant for reality but life came and found me",
  "I feel as if Im always on the verge of waking up",
  "I bear the wounds of all the battles I avoided",
];
const phrase = phrases[
  Math.floor(Math.random() * phrases.length)
].toLowerCase();
let guesses = [];
let misses = [];
let tries = 5;

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  guesses = [];
  misses = [];
  tries = 5;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "#D2D2D2";
  }
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].classList.add("tries");
    hearts[i].firstElementChild.src = "images/liveHeart.png";
  }
  initialize();
});

function initialize() {
  for (let i = 0; i < phrase.length; i++) {
    const letter = phrase[i];
    const li = document.createElement("li");
    li.textContent = letter;
    ul.appendChild(li);
    if (letter === " ") {
      li.classList.add("space");
    } else {
      li.classList.add("letter");
    }
  }
}

function draw(letter) {
  const l = document.querySelector("ul").children.length;
  for (let i = 0; i < l; i++) {
    if (letter == document.querySelector("ul").children[i].textContent) {
      document.querySelector("ul").children[i].classList.add("show");
    }
  }
}

function checkWon() {
  if (tries === 0) {
    overlay.style.display = "flex";
    overlay.className = "lose";
    overlay.querySelector("a").textContent = "You lost. Try again?";
  }
  const phraseNoUnderscores = new Set(phrase.replace(/\s/g, ""));
  if (guesses.length == phraseNoUnderscores.size) {
    overlay.style.display = "flex";
    overlay.className = "win";
    overlay.querySelector("a").textContent = "You win. Try again?";
  }
}

querty.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const guess = event.target.textContent;
    if (!guesses.includes(guess) && !misses.includes(guess)) {
      if (phrase.includes(guess)) {
        event.target.style.backgroundColor = "#76CE82";
        guesses.push(guess);
      } else {
        event.target.style.backgroundColor = "#D94545";
        tries -= 1;
        document.querySelector("li[class='tries']").firstChild.src =
          "images/lostHeart.png";
        document.querySelector("li[class='tries']").classList.remove("tries");
        misses.push(guess);
      }
    }
    draw(guess);
    checkWon();
  }
});

// array of words
const words = [
  "house",
  "book",
  "pen",
  "school",
  "car",
  "tree",
  "coffee",
  "music",
  "heart",
  "sky",
  "star",
  "dream",
  "friend",
  "time",
  "day",
  "night",
  "sun",
  "water",
  "sea",
  "river",
  "mountain",
  "street",
  "city",
  "family",
  "child",
  "story",
  "language",
  "program",
  "key",
  "door",
];
// setting levels of the game
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// setting default Level and seconds
let defaultLvlName = "Easy";
let defaultLvlSeconds = lvls[defaultLvlName];

// Catch Selectors
let startBtn = document.querySelector(".game .start");
let levelNameSpan = document.querySelector(".game .lvl");
let levelsecondsSpan = document.querySelector(".game .seconds");
let theWord = document.querySelector(".game .the-word");
let input = document.querySelector(".game .input");
let upcomingWords = document.querySelector(".game .upcoming-words");
let timeLeftSpan = document.querySelector(".game .time span");
let scoreGot = document.querySelector(".game .stats .got");
let scoreTotal = document.querySelector(".game .stats .total");
let finishMessage = document.querySelector(".game .finish");

// setting level name + seconds + score
levelNameSpan.innerHTML = defaultLvlName;
levelsecondsSpan.innerHTML = defaultLvlSeconds;
timeLeftSpan.innerHTML = defaultLvlSeconds;
scoreTotal.innerHTML = words.length;

// delete the paste from input
input.onpaste = function () {
  return false;
};

// Start the game
startBtn.addEventListener("click", (e) => {
  e.target.remove();
  input.focus();
  generateWord();
});

// function to generate the word
function generateWord() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  // delete the word from array
  words.splice(wordIndex, 1);
  // show the word
  theWord.innerHTML = randomWord;
  // generate and add upcoming-words
  upcomingWords.innerHTML = "";
  words.forEach((word) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(word));
    upcomingWords.appendChild(li);
  });
  // call startPlay function
  startPlay();
}

// start play function
function startPlay() {
  timeLeftSpan.innerHTML = defaultLvlSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (input.value.toLowerCase() === theWord.innerHTML.toLocaleLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          generateWord();
        } else {
          upcomingWords.remove();
          let span = document.createElement("span");
          span.classList.add("win");
          span.appendChild(document.createTextNode("Congratulations"));
          finishMessage.appendChild(span);
        }
      } else {
        let span = document.createElement("span");
        span.classList.add("fail");
        span.appendChild(document.createTextNode("Game Over"));
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}

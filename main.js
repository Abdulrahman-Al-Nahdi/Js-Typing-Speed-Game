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
  Normal: 4,
  Hard: 3,
};

let savedLevel = localStorage.getItem("lastLevel");
let savedWords = localStorage.getItem("lastWords");

// setting default Level and seconds and num of words
let defaultLvlName =
  savedLevel || document.querySelector("input[name='level']:checked").value;
let defaultLvlSeconds = lvls[defaultLvlName];
let defaultNumOfWords = savedWords
  ? parseInt(savedWords)
  : parseInt(document.querySelector("input[name='words']:checked").value);

let tempWords = generateTempArr(defaultNumOfWords);

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
let lvlOptions = document.querySelectorAll("input[name='level']");
let wordsOptions = document.querySelectorAll("input[name='words']");

// تحديث الواجهة عند التحميل
levelNameSpan.innerHTML = defaultLvlName;
levelsecondsSpan.innerHTML = defaultLvlSeconds;
timeLeftSpan.innerHTML = defaultLvlSeconds;
scoreTotal.innerHTML = defaultNumOfWords;

// ضبط الخيارات المختارة حسب LocalStorage
if (savedLevel) {
  document.querySelector(
    `input[name='level'][value='${savedLevel}']`
  ).checked = true;
}
if (savedWords) {
  document.querySelector(
    `input[name='words'][value='${savedWords}']`
  ).checked = true;
}

// change the level
lvlOptions.forEach((option) => {
  option.addEventListener("change", function () {
    let checked = document.querySelector("input[name='level']:checked").value;
    defaultLvlName = checked;
    defaultLvlSeconds = lvls[defaultLvlName];
    levelNameSpan.innerHTML = defaultLvlName;
    levelsecondsSpan.innerHTML = defaultLvlSeconds;
    timeLeftSpan.innerHTML = defaultLvlSeconds;

    // حفظ المستوى في LocalStorage
    localStorage.setItem("lastLevel", defaultLvlName);
  });
});

// change the number of words
wordsOptions.forEach((option) => {
  option.addEventListener("change", function () {
    defaultNumOfWords = parseInt(
      document.querySelector("input[name='words']:checked").value
    );
    scoreTotal.innerHTML = defaultNumOfWords;
    tempWords = generateTempArr(defaultNumOfWords);

    // حفظ عدد الكلمات في LocalStorage
    localStorage.setItem("lastWords", defaultNumOfWords);
  });
});

// delete the paste from input
input.addEventListener("paste", function (e) {
  e.preventDefault();
});

// Start the game
startBtn.addEventListener("click", (e) => {
  startGame();
});

function startGame() {
  startBtn.style.display = "none";
  document.querySelector(".game .options").style.display = "none";
  document.querySelector(".game .upcoming-words").style.display = "flex";
  input.focus();
  scoreGot.innerHTML = 0;
  tempWords = generateTempArr(defaultNumOfWords);
  generateWord();
}

// function to generate the word
function generateWord() {
  let randomWord = tempWords[Math.floor(Math.random() * tempWords.length)];
  let wordIndex = tempWords.indexOf(randomWord);
  tempWords.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  tempWords.forEach((word) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(word));
    upcomingWords.appendChild(li);
  });
  startPlay();
}

// start play function
function startPlay() {
  timeLeftSpan.innerHTML = defaultLvlSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (tempWords.length > 0) {
          generateWord();
        } else {
          createFinishBox("win", "Congratulations");
        }
      } else {
        createFinishBox("fail", "Game Over");
      }
    }
  }, 1000);
}

function createFinishBox(className, message) {
  finishMessage.style.display = "flex";
  finishMessage.innerHTML = ""; // مسح أي محتوى قديم
  let span = document.createElement("span");
  span.classList.add(className);
  span.appendChild(document.createTextNode(message));
  finishMessage.appendChild(span);

  // restart button
  let restartBtn = document.createElement("button");
  restartBtn.classList.add("restart");
  restartBtn.appendChild(document.createTextNode("restart"));
  finishMessage.appendChild(restartBtn);

  restartBtn.addEventListener("click", function () {
    finishMessage.style.display = "none";
    input.value = "";
    theWord.innerHTML = "";
    upcomingWords.innerHTML = "";
    startGame();
  });

  // end button
  let endBtn = document.createElement("button");
  endBtn.classList.add("end");
  endBtn.appendChild(document.createTextNode("end"));
  finishMessage.appendChild(endBtn);

  endBtn.addEventListener("click", function () {
    location.reload();
  });
}
function generateTempArr(numOfWords) {
  let tempArray = [];
  for (let i = 0; i < numOfWords; ) {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    if (!tempArray.includes(randomWord)) {
      tempArray.push(randomWord);
      i++;
    }
  }
  return tempArray;
}

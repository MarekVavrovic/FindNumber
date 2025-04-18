const maxNumber = 10;
const maxBits = 4;
let currentBit = 0;
let answerBits = 0;

function startTrick() {
  currentBit = 0;
  answerBits = 0;
  document.getElementById("result").textContent = "";
  document.getElementById("game").style.display = "block";
  showNextGroup();
}

function showNextGroup() {
  const bitMask = 1 << currentBit;
  const group = [];

  for (let i = 1; i <= maxNumber; i++) {
    if ((i & bitMask) !== 0) {
      group.push(i);
    }
  }

  document.getElementById("group-display").textContent =
    "Skupina " + (currentBit + 1) + ": " + group.join(", ");
}

function answer(isYes) {
  if (isYes) {
    answerBits += 1 << currentBit;
  }
  currentBit++;

  if (currentBit >= maxBits) {
    finishTrick();
  } else {
    showNextGroup();
  }
}

function finishTrick() {
  document.getElementById("game").style.display = "none";
  if (answerBits >= 1 && answerBits <= maxNumber) {
    document.getElementById("result").textContent =
      "Tvoje číslo je: " + answerBits + " 🎉";
  } else {
    document.getElementById("result").textContent =
      "Hmm, niečo nesedí... Skús to znova.";
  }
}

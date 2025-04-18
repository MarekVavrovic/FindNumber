const maxNumber = 100; //100
const maxBits = 7; // 7 bitov pre čísla do 127
let currentBit = 0;
let answerBits = 0;

let fullGroup = [];
let currentPage = 0;
const pageSize = 10;

function startTrick() {
  // Skry hlavičku
  document.getElementById("header").style.display = "none";

  // Reset premenných, nastav hru
  currentBit = 0;
  answerBits = 0;
  document.getElementById("result").textContent = "";
  document.getElementById("game").style.display = "block";
  document.getElementById("answer-buttons").style.display = "block";
  document.querySelector("button[onclick='nextPage()']").disabled = false;

  currentPage = 0;
  showNextGroup();
}


function showNextGroup() {
  const bitMask = 1 << currentBit;
  fullGroup = [];

  for (let i = 1; i <= maxNumber; i++) {
    if ((i & bitMask) !== 0) {
      fullGroup.push(i);
    }
  }

  // sort in a page
  fullGroup = fullGroup.sort((a, b) => a - b);

  currentPage = 0;
  showGroupPage();
}

function showGroupPage() {
  const start = currentPage * pageSize;
  const end = start + pageSize;
  const page = fullGroup.slice(start, end);

  const groupDisplay = document.getElementById("group-display");

  if (page.length > 0) {
    const formattedButtons = page
      .map((n) => {
        let background = "#eee";
        if (n <= 10) background = "#c8f7c5";
        else if (n >= 90) background = "#f7c5c5";

        return `<button onclick="answer(true)" style="
        display: inline-block;
        margin: 5px;
        padding: 10px 16px;
        border-radius: 8px;
        background: ${background};
        color: black;
        border: 1px solid #888;
        font-weight: bold;
        cursor: pointer;
      ">${n}</button>`;
      })
      .join(" ");

    groupDisplay.innerHTML = `
      <div class="x-1"><strong>Skupina ${currentBit + 1} (${start + 1}–${Math.min(
      end,
      fullGroup.length
    )}):</strong></div>
      <div>${formattedButtons}</div>
    `;
  }


  document.getElementById("prevBtn").disabled = currentPage === 0;
  document.getElementById("nextBtn").disabled = end >= fullGroup.length;
}

function nextPage() {
  const maxPage = Math.ceil(fullGroup.length / pageSize);
  if (currentPage < maxPage - 1) {
    currentPage++;
    showGroupPage();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    showGroupPage();
  }
}

function answer(isYes) {
  if (isYes) {
    answerBits += 1 << currentBit;
  }
  currentBit++;

  if (currentBit >= maxBits) {
    finishTrick();
  } else {
    document.getElementById("answer-buttons").style.display = "block";
    document.querySelector("button[onclick='nextPage()']").disabled = false;
    showNextGroup();
  }
}

function finishTrick() {
  document.getElementById("game").style.display = "none";

  if (answerBits >= 1 && answerBits <= maxNumber) {
    document.getElementById(
      "result"
    ).innerHTML = `<span class="glow">Tvoje číslo je: ${answerBits} 🎉</span>`;
  } else {
    document.getElementById("result").textContent =
      "Ups! Niečo nesedí. Skús to znova.";
  }

  // Znova zobraz hlavičku a tlačidlo "Začať"
  document.getElementById("header").style.display = "block";
}


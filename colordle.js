const COLORS = ["#9ba276", "#a3abb3", "#f2e7e1", "#c9bfbd", "#c89794", "#8f8f8f"];
const secret = Array.from({ length: 4 }, () =>
  COLORS[Math.floor(Math.random() * COLORS.length)]
);
let currentGuess = [];
let currentRow = 0;

const board = document.getElementById("board");
const picker = document.getElementById("color-options");
const selection = document.getElementById("current-selection");
const message = document.getElementById("message");

const kleurNamen = {
  "#9ba276": "olijfgroen",
  "#a3abb3": "lavendelgrijs",
  "#f2e7e1": "beige",
  "#c9bfbd": "taupe",
  "#c89794": "roze",
  "#8f8f8f": "grijs"
};

function renderBoard() {
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 4; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

function renderPicker() {
  picker.innerHTML = "";
  COLORS.forEach(color => {
    const circle = document.createElement("div");
    circle.classList.add("color-choice");
    circle.style.backgroundColor = color;
    circle.addEventListener("click", () => {
      if (currentGuess.length < 4) {
        currentGuess.push(color);
        renderSelection();
      }
    });
    picker.appendChild(circle);
  });
}

function renderSelection() {
  selection.innerHTML = "";
  currentGuess.forEach((color, index) => {
    const box = document.createElement("div");
    box.classList.add("selection-box");
    box.style.backgroundColor = color;
    box.textContent = index + 1;
    selection.appendChild(box);
  });
}

document.getElementById("submitGuess").addEventListener("click", () => {
  if (currentGuess.length !== 4) {
    alert("Kies precies 4 kleuren.");
    return;
  }

  const row = board.children[currentRow];
  const tempSecret = [...secret];
  const tempGuess = [...currentGuess];
  const result = Array(4).fill("absent");

  // Exacte matches
  for (let i = 0; i < 4; i++) {
    if (tempGuess[i] === tempSecret[i]) {
      result[i] = "correct";
      tempSecret[i] = null;
      tempGuess[i] = null;
    }
  }

  // Juiste kleur, verkeerde plek
  for (let i = 0; i < 4; i++) {
    if (tempGuess[i]) {
      const index = tempSecret.indexOf(tempGuess[i]);
      if (index !== -1) {
        result[i] = "present";
        tempSecret[index] = null;
      }
    }
  }

  // Laat feedback zien
  for (let i = 0; i < 4; i++) {
    const cell = row.children[i];
    cell.style.backgroundColor = currentGuess[i];
    cell.textContent = "";
    if (result[i] === "correct") {
      cell.classList.add("feedback-correct");
    } else if (result[i] === "present") {
      cell.classList.add("feedback-present");
    } else {
      cell.classList.add("feedback-absent");
    }
  }

  if (result.every(r => r === "correct")) {
    message.textContent = "Je hebt gewonnen!";
    disableInput();
  } else if (currentRow >= 5) {
    message.innerHTML = "Het juiste antwoord was: ";
secret.forEach(kleur => {
  const kleurBox = document.createElement("span");
  kleurBox.style.display = "inline-block";
  kleurBox.style.width = "30px";
  kleurBox.style.height = "30px";
  kleurBox.style.margin = "-9px 5px";
  kleurBox.style.backgroundColor = kleur;
  kleurBox.style.borderRadius = "6px";
  kleurBox.style.border = "1px solid #333";
  message.appendChild(kleurBox);
});

    disableInput();
  } else {
    currentRow++;
    currentGuess = [];
    renderSelection();
  }
});

document.getElementById("clearGuess").addEventListener("click", () => {
  currentGuess = [];
  renderSelection();
});

function disableInput() {
  document.getElementById("submitGuess").disabled = true;
  document.getElementById("clearGuess").disabled = true;
  picker.querySelectorAll(".color-choice").forEach(el => el.style.pointerEvents = "none");
}

renderBoard();
renderPicker();
renderSelection();

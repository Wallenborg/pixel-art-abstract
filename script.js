const colors = [
  "rgba(255, 0, 0, 0.5)",
  "rgba(0, 255, 0, 0.5)",
  "rgba(0, 0, 255, 0.5)",
  "rgba(255, 255, 0, 0.5)",
];
let currentColorIndex = 0;
const grid = document.querySelector(".grid");
const dialogBox = document.getElementById("dialogBox");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const startButton = document.getElementById("startButton");
const hero = document.getElementById("hero");

startButton.addEventListener("click", function () {
  hero.style.display = "none";

  createGrid();
  setTimeout(applyColorToCellsSequentially, 1000);
});

function createGrid() {
  const cellSize = 20;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const columns = Math.floor(screenWidth / cellSize);
  const rows = Math.floor(screenHeight / cellSize);

  grid.innerHTML = "";

  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }

  grid.style.gridTemplateColumns = `repeat(${columns}, ${cellSize}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
}

function applyColorToCell(cell, color) {
  if (Math.random() > 0.8) {
    const colorLayer = document.createElement("div");
    colorLayer.style.backgroundColor = color;
    colorLayer.style.position = "absolute";
    colorLayer.style.width = "100%";
    colorLayer.style.height = "100%";
    colorLayer.style.top = "0";
    colorLayer.style.left = "0";
    cell.appendChild(colorLayer);
  }
}

function applyColorToCellsSequentially() {
  const cells = document.querySelectorAll(".cell");
  let cellIndex = 0;

  function colorNextCell() {
    if (cellIndex < cells.length) {
      applyColorToCell(cells[cellIndex], colors[currentColorIndex]);
      cellIndex++;
      setTimeout(colorNextCell, 1);
    } else {
      if (currentColorIndex < colors.length - 1) {
        currentColorIndex++;
        setTimeout(applyColorToCellsSequentially, 500);
      } else {
        setTimeout(function () {
          dialogBox.style.display = "block";
        }, 2000);
      }
    }
  }

  colorNextCell();
}

yesButton.addEventListener("click", function () {
  dialogBox.style.display = "none";
  currentColorIndex = 0;
  createGrid();
  setTimeout(applyColorToCellsSequentially, 1000);
});

noButton.addEventListener("click", function () {
  dialogBox.style.display = "none";
});

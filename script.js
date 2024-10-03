const colors = [
  "rgba(255, 0, 0, 0.5)",
  "rgba(0, 255, 0, 0.5)",
  "rgba(0, 0, 255, 0.5)",
  "rgba(255, 255, 0, 0.5)",
];
let currentColorIndex = 0;
const grid = document.querySelector(".grid");
const dialogBox = document.getElementById("dialogBox"); // Referens till dialogrutan
const yesButton = document.getElementById("yesButton"); // Referens till Y-cirkeln
const noButton = document.getElementById("noButton"); // Referens till N-cirkeln

const startButton = document.getElementById("startButton");
const hero = document.getElementById("hero");

startButton.addEventListener("click", function () {
  // Göm hero-sektionen
  hero.style.display = "none";

  // Starta rutnätet
  createGrid();
  setTimeout(applyColorToCellsSequentially, 1000);
});

// Beräkna antalet celler baserat på skärmens bredd och höjd
function createGrid() {
  const cellSize = 20;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const columns = Math.floor(screenWidth / cellSize);
  const rows = Math.floor(screenHeight / cellSize);

  // Rensa tidigare celler
  grid.innerHTML = "";

  // Skapa cellerna
  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }

  // Sätt grid-template-columns dynamiskt
  grid.style.gridTemplateColumns = `repeat(${columns}, ${cellSize}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
}

// Applicera färg på en cell efter en fördröjning
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

// Applicera färgskikt på cellerna
function applyColorToCellsSequentially() {
  const cells = document.querySelectorAll(".cell");
  let cellIndex = 0;

  function colorNextCell() {
    if (cellIndex < cells.length) {
      applyColorToCell(cells[cellIndex], colors[currentColorIndex]);
      cellIndex++;
      setTimeout(colorNextCell, 1);
    } else {
      // Efter att ha gått igenom alla celler, byt till nästa färg
      if (currentColorIndex < colors.length - 1) {
        currentColorIndex++;
        setTimeout(applyColorToCellsSequentially, 500);
      } else {
        // När sista färgen är klar, visa dialogrutan
        setTimeout(function () {
          dialogBox.style.display = "block";
        }, 2000);
      }
    }
  }

  colorNextCell();
}

// När användaren klickar på Y-cirkeln, starta om rutorna
yesButton.addEventListener("click", function () {
  dialogBox.style.display = "none"; // Göm dialogrutan
  currentColorIndex = 0; // Återställ färgindex
  createGrid(); // Skapa ett nytt rutnät
  setTimeout(applyColorToCellsSequentially, 1000); // Starta om processen
});

// När användaren klickar på N-cirkeln, stäng dialogrutan utan att återställa rutorna
noButton.addEventListener("click", function () {
  dialogBox.style.display = "none"; // Göm dialogrutan
});

// Starta med att applicera den första färgen
// setTimeout(applyColorToCellsSequentially, 1000);

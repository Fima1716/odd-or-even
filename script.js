const randomNumber = document.querySelector(".random-number");
const scoreElement = document.querySelector(".scores");
let score = 0;
let currentNumber = null;

function valueSwitcher() {
  const max = 100;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function initializeGame() {
  currentNumber = valueSwitcher();
  randomNumber.textContent = currentNumber;
  const even = document.querySelector(".even-number");
  const odd = document.querySelector(".odd-number");

  even.addEventListener("dragover", dragOver);
  even.addEventListener("drop", (event) => dragDrop(event, "even"));
  odd.addEventListener("dragover", dragOver);
  odd.addEventListener("drop", (event) => dragDrop(event, "odd"));
  randomNumber.addEventListener("dragstart", dragStart);
}

function dragStart(event) {
  const draggedNumber = parseInt(randomNumber.textContent);
  event.dataTransfer.setData("text/plain", draggedNumber);
}

function dragOver(event) {
  event.preventDefault();
}

function dragDrop(event, target) {
  event.preventDefault();
  const draggedNumber = parseInt(event.dataTransfer.getData("text"));
  checkNumber(draggedNumber, target);
}

function updateScore() {
  score++;
  scoreElement.textContent = `Ваши очки: ${score}`;
}

function checkNumber(draggedNumber, target) {
  if (
    (draggedNumber % 2 === 0 && target === "even") ||
    (draggedNumber % 2 !== 0 && target === "odd")
  ) {
    updateScore();
    currentNumber = valueSwitcher();
    randomNumber.textContent = currentNumber;
  } else {
    showGameOverModal();
  }
}

function showGameOverModal() {
  alert(`Игра окончена. Ваш счет: ${score}`);
  resetGame();
}

function resetGame() {
  score = 0;
  scoreElement.textContent = "Ваши очки: 0";
  currentNumber = valueSwitcher();
  randomNumber.textContent = currentNumber;
}

initializeGame();

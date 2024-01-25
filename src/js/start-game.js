// Redirect to another HTML
const startGame = () => {
  window.location = `in-game.html?difficulty=${difficulty}`;
};
// Clicking on the start button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);
// Choosing difficulty
const lowGrade = document.getElementById("low-grade");
const highGrade = document.getElementById("high-grade");

let difficulty = 1;
// 1 = low-grade (easy), 2 = high-grade (high)

lowGrade.addEventListener("click", () => {
  difficulty = 1;
  const lowGrade = document.getElementById("low-grade");
  lowGrade.style.backgroundColor = "grey";
  highGrade.style.removeProperty('background-color');
});

highGrade.addEventListener("click", () => {
  difficulty = 2;
  const highGrade = document.getElementById("high-grade");
  highGrade.style.backgroundColor = "grey";
  lowGrade.style.removeProperty("background-color");
});

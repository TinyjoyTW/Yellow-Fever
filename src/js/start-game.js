// Redirect to another HTML
const startGame = () => {
    window.location = `in-game.html?diffulty=${difficulty}`;
}
// Clicking on the start button 
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);
// Choosing difficulty
const lowGrade = document.getElementById('low-grade');
const highGrade = document.getElementById("high-grade");

let difficulty; 
// 1 = low-grade (easy), 2 = high-grade (high)
lowGrade.addEventListener('click', () => difficulty = 1);
highGrade.addEventListener('click', () => difficulty = 2);
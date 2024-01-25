// Helper functions placed on top:
// Shuffling backwards is supposedly better than forward (???)
// SOURCE: https://stackoverflow.com/a/12646864/22955269
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Built-in class to search for anything after "?" in the URL
const urlParams = new URLSearchParams(window.location.search);
// get 'difficulty' in the URL after the "?"
const difficulty = urlParams.get("difficulty");
// instantiate the Game class to start the game with a difficulty
const game = new Game(cardList, Number(difficulty));

// background music
const backgroundAudio = new Audio(
  "src/assets/audio/life-of-a-wandering-wizard.mp3"
);
function playMusic() {
  if (backgroundAudio.paused) {
    backgroundAudio.play();
    document.getElementById("speaker").src = "src/assets/images/speaker-on.png";
  } else {
    backgroundAudio.pause();
    document.getElementById("speaker").src =
      "src/assets/images/speaker-off.png";
  }
}
const speakerImg = document.getElementById("speaker");
speakerImg.addEventListener("click", playMusic);

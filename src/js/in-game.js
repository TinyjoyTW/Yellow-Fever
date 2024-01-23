// Helper functions placed on top:
// Shuffling backwards is supposedly better than forward (???)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

class Game {
  constructor(difficulty) {
    this.difficulty = typeof difficulty === "number" ? difficulty : 1;
    this.moveCount = 0;
    if (this.difficulty === 1) {
    // slice cards into half
    // here we use -1 to get the correct amout of cards which is 6
      this.cards = cardList.slice(0, Math.floor(cardList.length / 2) - 1);
    } else {
      this.cards = cardList;
    }
    this.timeRemaining = 120;

    this.renderCards();
    // Select the timer element
    this.timerElement = document.getElementById("timerDiv");
    this.timerInterval; // Variable to store the timer interval ID
    this.startTimer();
  }

  renderCards() {
    // Get the #cards-container element
    const cardsContainer = document.getElementById("cards-container");
    const list = [];

    // Iterate over the list of cards
    // For each card we want to create two image elements
    this.cards.forEach((card) => {
      const picture1 = document.createElement("img");
      const picture2 = document.createElement("img");
      // Don't allow images to be dragged
      picture1.setAttribute("src", card.picture1);
      picture1.setAttribute("draggable", false);
      picture2.setAttribute("src", card.picture2);
      picture2.setAttribute("draggable", false);
      // Hide the cards using CSS
      picture1.className = "hiddenCard";
      picture2.className = "hiddenCard";
      // Store created images into the list array
      list.push(picture1, picture2);
    });

    // Shuffle ths array with images we created above
    shuffleArray(list);
    // For each shuffled item in the array, we append it to the cardsContainer in HTML
    list.forEach((l) => {
      cardsContainer.appendChild(l);
    });
    
    if (this.difficulty === 1) {
      cardsContainer.classList.toggle('difficulty1');
    } else if (this.difficulty === 2) {
      cardsContainer.classList.toggle("difficulty2");
    }

  }

  // Function to update the timer display
  updateTimerDisplay() {
    this.timerElement.textContent = `Time left: ${this.timeRemaining}`;
  }

  // Function to start the timer
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.stopTimer();
      }
      this.updateTimerDisplay();
    }, 1000); // Update every 1 second (1000 milliseconds)
  }

  // Function to stop the timer
  stopTimer() {
    clearInterval(this.timerInterval);
  }
}

// Built-in class to search for anything after "?" in the URL
const urlParams = new URLSearchParams(window.location.search);
// get 'difficulty' in the URL after the "?" 
const difficulty = urlParams.get("difficulty");

const game = new Game(Number(difficulty));

document.querySelectorAll(".hiddenCard").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("hiddenCard");
    card.classList.toggle("revealCard");
    moveCount++;
    const moveCountElement = document.getElementById("moves");
    moveCountElement.textContent = `Moves: ${moveCount}`;
  });
});

// After flipping over two cards that don't match, the cards need to toggle back to hidden
// If two cards match, they need to stay visible.

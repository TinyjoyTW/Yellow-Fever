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
    // this.moveCount = 0;
    if (this.difficulty === 1) {
      // slice cards into half
      // here we use -1 to get the correct amout of cards which is 6
      this.cards = cardList.slice(0, Math.floor(cardList.length / 2) - 1);
    } else {
      this.cards = cardList;
    }
    this.timeRemaining = 90;
    this.moveCount = 0;
    this.renderCards();
    // Select the timer element
    this.timerElement = document.getElementById("timerDiv");
    this.timerInterval; // Variable to store the timer interval ID
    this.startTimer();
    this.flippedCards = [];
    this.remainingActors = this.cards.length;
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
      picture1.classList.add(card.name, "hidden-card");
      picture2.classList.add(card.name, "hidden-card");
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
      cardsContainer.classList.toggle("difficulty1");
    } else if (this.difficulty === 2) {
      cardsContainer.classList.toggle("difficulty2");
    }

    document.querySelectorAll(".hidden-card").forEach((pickedCard) => {
      pickedCard.addEventListener("click", () => {
        // toggle CSS to make card visible or hidden
        pickedCard.classList.toggle("hidden-card");
        pickedCard.classList.toggle("reveal-card");
        // increase the move count
        this.moveCount++;
        // and display it in the UI
        const moveCountElement = document.getElementById("moves");
        moveCountElement.textContent = `Moves: ${this.moveCount}`;

        // add the clicked card to a variable to remember it
        this.flippedCards.push(pickedCard);
        // do we have two cards flipped?
        if (this.flippedCards.length === 2) {
          // now check for matching cards
          // we check via the first CSS classname of each card, which is the actor's name
          if (
            this.flippedCards[0].classList[0] ===
            this.flippedCards[1].classList[0]
          ) {
            // TODO win state
            this.remainingActors--;

            if (this.remainingActors === 0) {
              alert("You've won!");
            }
          } else {
            // hide cards again when not the same actor, after a timeout
            const cardsToFlipBack = [...this.flippedCards];
            setTimeout(() => {
              cardsToFlipBack.forEach((card) => {
                card.classList.toggle("reveal-card");
                card.classList.toggle("hidden-card");
              });
            }, 600);
          }
          // reset flipped cards
          this.flippedCards = [];
        }
      });
    });
  }

  // Function to update the timer display
  updateTimerDisplay() {
    this.timerElement.textContent = `Time left: ${this.timeRemaining}s`;
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

const speakerImg = document.getElementById("speaker");
const audio = new Audio("src/assets/audio/life-of-a-wandering-wizard.mp3");
function playMusic() {
  if (audio.paused) {
    audio.play();
    document.getElementById("speaker").src = "src/assets/images/speaker-on.png";
  } else {
    audio.pause();
    document.getElementById("speaker").src =
      "src/assets/images/speaker-off.png";
  }
}
speakerImg.addEventListener("click", playMusic);

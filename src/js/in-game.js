// Define a class for the Card object
class Card {
  constructor(name, picture1, picture2) {
    this.name = name;
    this.picture1 = picture1;
    this.picture2 = picture2;
  }
}

// Define a class for the Game
class Game {
  constructor(difficulty) {
    this.difficulty = Number(difficulty) || 1; //If difficulty is not a number, set it to 1;
    this.cards = [];
    this.timeRemaining = 60;
    this.moveCount = 0;
    this.flippedCards = [];
    this.remainingActors = 0;
    this.leastMoves = Number(localStorage.getItem("leastMoves")) || 99;
    this.initGame();
  }

  initGame() {
    this.shuffleCards();
    this.setupTimer();
    this.renderCards();
    this.setupClickHandlers();
  }

  shuffleCards() {
    //Shuffling backwards is supposedly better than forward (???)
    const shuffledCardList = [...cardList];
    for (let i = shuffledCardList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCardList[i], shuffledCardList[j]] = [
        shuffledCardList[j],
        shuffledCardList[i],
      ];
    }

    if (this.difficulty === 1) {
      this.cards = shuffledCardList.slice(
        0,
        Math.floor(shuffledCardList.length / 2) - 1
      );
    } else {
      this.cards = shuffledCardList;
    }

    this.remainingActors = this.cards.length;
  }

  setupTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.stopTimer();
        document.getElementById("lose").showModal();
        const audio = new Audio(
          "src/assets/audio/dark souls-you are dead sound effect.mp3"
        );
        audio.play();
        backgroundAudio.pause();
      }
      this.updateTimerDisplay();
    }, 1000); // Update every 1 second (1000 milliseconds)
  }

  renderCards() {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = ""; // Clear previous cards

    this.cards.forEach((card) => {
      const picture1 = this.createCardElement(card.picture1);
      const picture2 = this.createCardElement(card.picture2);
      cardsContainer.appendChild(picture1);
      cardsContainer.appendChild(picture2);
    });
    if (this.difficulty === 1) {
      cardsContainer.classList.add("difficulty1");
    } else if (this.difficulty === 2) {
      cardsContainer.classList.add("difficulty2");
    }
  }

  createCardElement(src) {
    const card = document.createElement("img");
    card.setAttribute("src", src);
    card.setAttribute("draggable", false);
    card.classList.add("hidden-card");
    return card;
  }

  setupClickHandlers() {
    document.querySelectorAll(".hidden-card").forEach((card) => {
      card.addEventListener("click", () => this.handleCardClick(card));
    });
  }

  handleCardClick(pickedCard) {
    pickedCard.classList.toggle("reveal-card");
    pickedCard.classList.toggle("hidden-card");
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
        this.flippedCards[0].classList[0] === this.flippedCards[1].classList[0]
      ) {
        this.remainingActors--;

        this.flippedCards.forEach((flippedCard) => {
          flippedCard.style.pointerEvents = "none";
        });

        if (this.remainingActors === 0) {
          document.getElementById("win").showModal();
          const audio = new Audio("src/assets/audio/success-trumpet.mp3");
          audio.play();
          backgroundAudio.volume = 0.3;
          this.stopTimer();
          if (this.moveCount < this.leastMoves) {
            this.leastMoves = this.moveCount;

            document.getElementById(
              "leastMoves"
            ).textContent = `Least moves: ${this.leastMoves}`;
            localStorage.setItem("leastMoves", this.leastMoves);
          }
        }
      } else {
        // hide cards again when not the same actor, after a timeout
        const cardsToFlipBack = [...this.flippedCards];
        setTimeout(() => {
          cardsToFlipBack.forEach((card) => {
            card.classList.toggle("reveal-card");
            card.classList.toggle("hidden-card");
          });
        }, 300);
      }
      // reset flipped cards
      this.flippedCards = [];
    }
  }

  updateTimerDisplay() {
    const timerElement = document.getElementById("timerDiv");
    timerElement.textContent = `Time left: ${this.timeRemaining}s`;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining === 0) {
        this.stopTimer();
        document.getElementById("lose").showModal();
        const audio = new Audio(
          "src/assets/audio/dark souls-you are dead sound effect.mp3"
        );
        audio.play();
        backgroundAudio.pause();
      }
      this.updateTimerDisplay();
    }, 1000); // Update every 1 second (1000 milliseconds)
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }
}

// Initialize the game
const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get("difficulty");
const game = new Game(Number(difficulty));

// Audio click handler
const speakerImg = document.getElementById("speaker");
const backgroundAudio = new Audio(
  "src/assets/audio/life-of-a-wandering-wizard.mp3"
);

function toggleAudio() {
  if (backgroundAudio.paused) {
    backgroundAudio.play();
    speakerImg.src = "src/assets/images/speaker-on.png";
  } else {
    backgroundAudio.pause();
    speakerImg.src = "src/assets/images/speaker-off.png";
  }
}
speakerImg.addEventListener("click", toggleAudio);

//Eventlistener for the play-again button:
document.querySelectorAll(".play-again-button").forEach((button) =>
  button.addEventListener("click", () => {
    window.location = `start-game.html`;
  })
);
//Eventlistener for the actors-info button:
document.querySelectorAll(".actors-info").forEach((button) =>
  button.addEventListener("click", () => {
    window.location = `actor-list.html`;
  })
);

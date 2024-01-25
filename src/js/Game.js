class Game {
  constructor(cardList, difficulty) {
    // shuffle all actors before the game starts
    shuffleArray(cardList);
    this.difficulty = typeof difficulty === "number" ? difficulty : 1;
    if (this.difficulty === 1) {
      // if difficulty is 1/easy, slice list of cards into half
      // here we use -1 to get the correct amout of cards which is 6
      this.actors = cardList.slice(0, Math.floor(cardList.length / 2) - 1);
    } else {
      // if difficulty is 2/hard, keep the long list
      this.actors = cardList;
    }
    this.remainingHiddenActors = this.actors.length;
    this.flippedPictures = [];
    this.renderActorPictures();
    this.timeRemaining = 60; // seconds
    this.moveCount = 0;
    this.leastMoves = Number(localStorage.getItem("leastMoves")) || 99;
    this.updateLeastMovesDisplay();
    this.timerInterval; // Variable to store the timer interval ID
    this.startTimer();
  }

  updateLeastMovesDisplay() {
    // write highscore into DOM
    document.getElementById(
      "leastMoves"
    ).textContent = `Least moves: ${this.leastMoves}`;
  }

  renderActorPictures() {
    // Get the #pictures-container element
    const picturesContainer = document.getElementById("pictures-container");
    const list = [];

    // Iterate over the list of cards
    // For each card we want to create two image elements
    this.actors.forEach((actor) => {
      const picture1 = document.createElement("img");
      const picture2 = document.createElement("img");
      // Don't allow images to be dragged
      picture1.setAttribute("src", actor.picture1);
      picture1.setAttribute("draggable", false);
      picture2.setAttribute("src", actor.picture2);
      picture2.setAttribute("draggable", false);
      // Use CSS class with actors name to be later able to compare actors
      // and use another CSS class to hide the picture
      picture1.classList.add(actor.name, "hidden-picture");
      picture2.classList.add(actor.name, "hidden-picture");
      // Store created images into the list array
      list.push(picture1, picture2);
    });

    // shuffle ths array with images we created above
    shuffleArray(list);
    // for each shuffled item in the array, we append it to the cardsContainer in HTML
    list.forEach((l) => {
      picturesContainer.appendChild(l);
    });

    // depending on difficulty, change grid layout with CSS class
    picturesContainer.classList.add(
      this.difficulty === 1 ? "difficulty1" : "difficulty2"
    );

    document.querySelectorAll(".hidden-picture").forEach((picture) => {
      // event listener when clicking a single picture
      picture.addEventListener("click", () => this.onClickPicture(picture));
    });

    document.querySelectorAll(".play-again-button").forEach((button) =>
      // event listener to go back to start-game.html
      button.addEventListener("click", () => {
        window.location = `start-game.html`;
      })
    );

    document.querySelectorAll(".actors-info").forEach((button) =>
      // event listener to go to actor-list.html
      button.addEventListener("click", () => {
        window.location = `actor-list.html`;
      })
    );
  }

  onClickPicture(clickedPicture) {
    // change CSS classes to make card visible
    clickedPicture.classList.remove("hidden-picture");
    clickedPicture.classList.add("reveal-picture");
    // increase the move count
    this.moveCount++;
    // and display it in the UI
    document.getElementById("moves").textContent = `Moves: ${this.moveCount}`;

    // add the clicked card to a variable to remember it
    this.flippedPictures.push(clickedPicture);

    // do we have two cards flipped?
    if (this.flippedPictures.length === 2) {
      // now check for matching cards
      // we check via the first CSS classname of each card, which is the actor's name
      if (
        this.flippedPictures[0].classList[0] === this.flippedPictures[1].classList[0]
      ) {
        this.remainingHiddenActors--;

        // both flipped cards should not be clickable anymore
        this.flippedPictures.forEach((flippedCard) => {
          flippedCard.style.pointerEvents = "none";
        });
        
        this.checkWinning();
      } else {
        // wait for a moment, then hide pictures again
        const picturesToFlipBack = [...this.flippedPictures];
        setTimeout(() => {
          picturesToFlipBack.forEach((picture) => {
            // flip both cards back
            picture.classList.remove("reveal-picture");
            picture.classList.add("hidden-picture");
          });
        }, 600);
      }
      // reset flipped cards
      this.flippedPictures = [];
    }
  }

  checkWinning() {
    // check of we found all actors
    if (this.remainingHiddenActors === 0) {
      // we won!
      // show winning modal
      document.getElementById("win").showModal();
      // play winning music
      const audio = new Audio("src/assets/audio/success-trumpet.mp3");
      audio.play();
      backgroundAudio.volume = 0.3;
      this.stopTimer();
      // check for new highscore/leastMoves
      if (this.moveCount < this.leastMoves) {
        this.leastMoves = this.moveCount;

        // update least moves in DOM
        document.getElementById(
          "leastMoves"
        ).textContent = `Least moves: ${this.leastMoves}`;
        // store least moves in localStorage
        localStorage.setItem("leastMoves", this.leastMoves);
      }
    }
  }

  checkLosing() {
    // update time variable
    this.timeRemaining--;
    // update timer display
    document.getElementById(
      "timerDiv"
    ).textContent = `Time left: ${this.timeRemaining}s`;

    // check if we ran out of time you lost
    if (this.timeRemaining === 0) {
      this.stopTimer();
      document.getElementById("lose").showModal();
      const audio = new Audio(
        "src/assets/audio/dark souls-you are dead sound effect.mp3"
      );
      audio.play();
      backgroundAudio.pause();
    }
  }

  // Function to start the timer
  startTimer() {
    this.timerInterval = setInterval(() => this.checkLosing(), 1000); // Update every 1 second (1000 milliseconds)
  }

  // Function to stop the timer
  stopTimer() {
    clearInterval(this.timerInterval);
  }
}

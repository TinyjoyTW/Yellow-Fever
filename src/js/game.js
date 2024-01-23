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
  constructor() {
    this.moveCount = 0;
    this.cards = cardList;
    // this.pickedCards = [];
    this.renderCards();
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
      picture1.setAttribute("src", card.picture1);
      picture2.setAttribute("src", card.picture2);
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
  }
}

// It waits for the HTML to finish loading before executing the code here
// window.onload = () => {
//   new Game();
// };

const game = new Game();

// declaring moveCount outside the loops below
let moveCount = 0;

document.querySelectorAll(".hiddenCard").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("hiddenCard");
    card.classList.toggle("revealCard");
    moveCount++;
    const moveCountElement = document.getElementById("moves");
    moveCountElement.textContent = `Movies: ${moveCount}`;
  });
});

// After flipping over two cards that don't match, the cards need to toggle back to hidden
// If two cards match, they need to stay visible. 
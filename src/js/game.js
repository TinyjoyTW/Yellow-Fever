class Game {
  constructor() {
    this.moveCount = 0;
    this.cards = cardList;
    this.renderCards();
  }

  renderCards() {
    // get the #cards-container element
    const cardsContainer = document.getElementById("cards-container");
    // iterate over the list of cards
    // for each card we want to create two image elements
    this.cards.forEach((card) => {
      const picture1 = document.createElement("img");
      const picture2 = document.createElement("img");
      picture1.setAttribute("src", card.picture1);
      picture2.setAttribute("src", card.picture2);
      // append them to the cards-container
      cardsContainer.appendChild(picture1);
      cardsContainer.appendChild(picture2);
    });
  }
}

window.onload = () => {
  new Game();
};

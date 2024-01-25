#Yellow Fever

## Description
*Yellow Fever* is a dynamic memory game where players aim to find matching pairs of pictures featuring actors of East and Southeast Asian descent. The objective is to locate the correct pairs within a 60-second timeframe. Upon completing the game, players are presented with a list of the featured actors, offering a fun and engaging way to celebrate and recognize the talents of these individuals.

## MVP
1. Start page with a start button that takes us to the main game
2. Game logic 
    - flip two cards and check if they match
    - if so, they stay flipped
    - if not, they need to flip back
    - when all pairs are found, show win or lose state
    - a countdown timer
3. Extra HTML file for the list of actors featured in the game

## Backlog
1. Add music and sound effects
2. Add animations for win and lose states

## Technologies Used
- HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Classes
- Local Storage

## Data structure
### JavaScript
### start-game.js
`startGame()`

### Game.js
```
Game()
shuffleArray();
updateLeastMovesDisplay();
renderActorPictures();
onClickPicture();
checkWinning();
checkLosing();
startTimer();
stopTimer();
```

### in-game.js
```
playMusic();
```

### HTML
- index.html
- in-game.html
- actor-list.html

## States y States Transitions
1. Start-game
2. In-game
3. End-game
4. Extra: list of actors

## Links

- [Trello](https://trello.com/invite/b/kgMiQyBu/ATTI294588c0bb9a076ce9c7072a9d5359881A7AF2F5/yellow-fever)
- [Github repository](https://github.com/TinyjoyTW/Yellow-Fever)
- [Deployment](https://tinyjoytw.github.io/Yellow-Fever/)
- [Slides](https://docs.google.com/presentation/d/1XPszkLsdW7hwcN66kTH8ftCWKNXktcbyVoTxSJLVgsM/edit?usp=sharing)
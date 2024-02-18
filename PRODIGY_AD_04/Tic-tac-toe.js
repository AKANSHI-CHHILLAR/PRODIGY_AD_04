// general variables
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  let playerMoves = [];
  let computerMoves = [];
  let whoseTurn = "";
  let totalMoves = 0;
  let didSomeoneWin = false;
  let playerAboutToWin = false;
  let smartComputerNextMove;
  
  //reference to DOM elements
  let blocks = document.querySelectorAll(".block");
  let resetButton = document.getElementById("reset");
  
  window.onload = playGame();
  
  function playGame() {
    if (totalMoves === 9 && !didSomeoneWin) {
      displayResult("It's a tie");
      setTimeout(function() {
        reset();
      }, 1000);
    } else if (didSomeoneWin) {
      setTimeout(function() {
        reset();
      }, 1000);
    } 
    //player always starts
    else if (whoseTurn === "player" || totalMoves === 0) {
      player();
    } else if (whoseTurn === "computer") {
      setTimeout(function() {
        computer();
      }, 200);
    }
  }
  
  //player actions
  function player() {
    //adding a cross to the clicked blocks
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].addEventListener("click", function() {
        if (
          computerMoves.indexOf(Number(this.id)) !== -1 ||
          playerMoves.indexOf(Number(this.id)) !== -1
        ) {
          return;
        }
        
        this.getElementsByTagName("i")[0].classList.add("clicked");
        playerMoves.push(Number(this.id));
        nextTurn("computer", playerMoves);
        // console.log("player moves: " + playerMoves);
      });
    }
  }
  
  //computer actions
  function computer() {
    smartComputer();
    let random = pickRandomBlock();
    for (let i = 0; i < blocks.length; i++) {
      if (totalMoves === 9 && !didSomeoneWin) {
        return;
      }
      //add circle for computer moves, only if the block is not already occupied
      else if (
        computerMoves.indexOf(Number(random.id)) !== -1 ||
        playerMoves.indexOf(Number(random.id)) !== -1
      ) {
        return computer();
      }
      random.getElementsByTagName("i")[1].classList.add("clicked");
    }
    //add the computer move to the moves array
    if (!computerMoves.includes(Number(random.id))) {
      computerMoves.push(Number(random.id));
    }
    nextTurn("player", computerMoves);
    // console.log("computer moves: " + computerMoves);
  }
  
  //pick random location for computer move
  function pickRandomBlock() {
    //picks location for computer move
    let random;
    if (playerAboutToWin) {
      if (
        computerMoves.indexOf(smartComputerNextMove) === -1 &&
        playerMoves.indexOf(smartComputerNextMove) === -1
      ) {
        random = smartComputerNextMove;
        playerAboutToWin = false;
      } else {
        random = Math.floor(Math.random() * blocks.length);
      }
    } 
    //handling tie 
    else if (totalMoves === 9 && didSomeoneWin === false) {
      return;
    } else {
      random = Math.floor(Math.random() * blocks.length);
    }
    return blocks[random];
  }
  
  //returns the winning move for the player and assigns this to the smartComputerNext move variable
  function smartComputer() {
    let playerPotentialWins = winningCombinations.filter(
      array =>
        array.filter(item => {
          return playerMoves.indexOf(item) > -1;
        }).length === 2
    );
  
    if (playerPotentialWins.length > 0) {
      playerAboutToWin = true;
      playerPotentialWins.filter(array =>
        //get the index of the next computer move
        array.filter(item => {
          if (
            playerPotentialWins.indexOf(item) === -1 &&
            playerMoves.indexOf(item) === -1 &&
            computerMoves.indexOf(item) === -1
          ) {
            smartComputerNextMove = item;
          }
        })
      );
    }
  }
  
  
  // ====HELPER FUNCTIONS ===
  
  //Moving on to the next turn
  function nextTurn(opponent, whoseMoves) {
    whoseTurn = opponent;
    totalMoves++;
    hasWon(whoseMoves, winningCombinations);
    playGame();
  }
  
  //check if someone has won
  function hasWon(moves, winningCombinations) {
    let foundResults = winningCombinations.filter(
      array =>
        array.filter(item => {
          return moves.indexOf(item) > -1;
        }).length === 3
    );
  
    if (foundResults.length > 0) {
      if (whoseTurn === "computer") {
        displayResult("You won");
      } else if (whoseTurn === "player") {
        displayResult("The computer has won");
      }
      didSomeoneWin = true;
    }
  }
  
  //resetting the game
  function reset() {
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].getElementsByTagName("i")[0].classList.remove("clicked");
      blocks[i].getElementsByTagName("i")[1].classList.remove("clicked");
    }
    playerMoves = [];
    computerMoves = [];
    totalMoves = 0;
    didSomeoneWin = false;
    playerAboutToWin = false;
    hideResult();
  }
  
  //resetting the game manually
  resetButton.addEventListener("click", function() {
    reset();
  });
  
  function displayResult(winningMessage) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("text").textContent = winningMessage;
      // ===un-comment this to add a manual reset button to the overlay===
    
    // if (document.getElementById("text").textContent === "It's a tie") {
    //   let resetButton = document.createElement("button");
    //   resetButton.classList.add("overlayResetButton");
    //   resetButton.textContent = "Reset Game";
    //   resetButton.addEventListener("click", function() {
    //     reset();
    //   });
    //   document.getElementById("text").appendChild(resetButton);
    // }
  }
  
  function hideResult() {
    document.getElementById("overlay").style.display = "none";
  }
  
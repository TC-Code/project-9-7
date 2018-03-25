document.addEventListener("DOMContentLoaded", function(event) {
  var newGameBtn = document.getElementById("js-newGameButton");
  newGameBtn.addEventListener("click", newGame);

  var pickRock = document.getElementById("js-playerPick_rock"),
    pickPaper = document.getElementById("js-playerPick_paper"),
    pickScissors = document.getElementById("js-playerPick_scissors");

  pickRock.addEventListener("click", function() {
    playerPick("rock");
  });
  pickPaper.addEventListener("click", function() {
    playerPick("paper");
  });
  pickScissors.addEventListener("click", function() {
    playerPick("scissors");
  });

  var gameState = "notStarted",
    player = {
      name: "",
      score: 0
    },
    computer = {
      score: 0
    };

  var newGameElem = document.getElementById("js-newGameElement"),
    pickElem = document.getElementById("js-playerPickElement"),
    resultsElem = document.getElementById("js-resultsTableElement");

  function setGameElements() {
    switch (gameState) {
      case "started":
        newGameElem.style.display = "none";
        pickElem.style.display = "block";
        resultsElem.style.display = "block";
        document.getElementById("js-gameLabel").style.display = "block";
        document.getElementById("js-welcomeLabel").style.display = "block";
        document.getElementById("js-winner").style.display = "none";
        break;
      case "ended":
        newGameBtn.innerText = "Play again?";
        document.getElementById("js-winner").style.display = "block";
      case "notStarted":
      default:
        newGameElem.style.display = "block";
        pickElem.style.display = "none";
        resultsElem.style.display = "none";
    }
  }

  setGameElements();

  var playerPointsElem = document.getElementById("js-playerPoints"),
    playerNameElem = document.getElementById("js-playerName"),
    computerPointsElem = document.getElementById("js-computerPoints");

  function newGame() {
    player.name = prompt("Please enter your name", "Player name");
    if (player.name) {
      player.score = computer.score = 0;
      gameState = "started";
      setGameElements();

      playerNameElem.innerHTML = player.name;
      setGamePoints();
    }
  }

  function getComputerPick() {
    var possiblePicks = ["rock", "paper", "scissors"];
    return possiblePicks[Math.floor(Math.random() * 3)];
  }

  var playerPickElem = document.getElementById("js-playerPick"),
    computerPickElem = document.getElementById("js-computerPick"),
    playerResultElem = document.getElementById("js-playerResult"),
    computerResultElem = document.getElementById("js-computerResult");

  function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = "";

    var winnerIs = "player";

    if (playerPick === computerPick) {
      winnerIs = "noone"; // DRAW
    } else if (
      (computerPick === "rock" && playerPick === "scissors") ||
      (computerPick === "scissors" && playerPick === "paper") ||
      (computerPick === "paper" && playerPick === "rock")
    ) {
      winnerIs = "computer";
    }

    if (winnerIs === "player") {
      playerResultElem.innerHTML = "Win!";
      player.score++;
    } else if (winnerIs === "computer") {
      computerResultElem.innerHTML = "Win!";
      computer.score++;
    }
    setGamePoints();
    checkWinner();
  }

  function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
  }

  function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
  }

  function checkWinner() {
    if (player.score === 10) {
      gameState = "ended";
      document.getElementById("js-gameLabel").style.display = "none";
      document.getElementById("js-welcomeLabel").style.display = "none";
      document.getElementById("js-winner").innerText =
        "The winner is " + player.name;
      setGameElements();
    } else if (computer.score === 10) {
      gameState = "ended";
      document.getElementById("js-gameLabel").style.display = "none";
      document.getElementById("js-welcomeLabel").style.display = "none";
      document.getElementById("js-winner").innerText = "The winner is computer";
      setGameElements();
    }
  }
});

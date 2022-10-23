let ticTac = document.getElementById("ticTac");

let playerTurn = true;

let scoreX = 0;

let scoreO = 0;

let scoreX_div = document.getElementById("scoreX");

let scoreO_div = document.getElementById("scoreO");

let currentWinner = document.getElementById("currentWinner");

let filledCells = 0;

let clearScoreBtn = document.getElementById("clearScore");

let newGameBtn = document.getElementById("newGame");

let winCells = [];

let winCounter = 0;

let winFlag = true;



function clearScore() {
  scoreO = 0;
  scoreX = 0;
  scoreX_div.textContent = "0";
  scoreO_div.textContent = "0";
}

clearScoreBtn.addEventListener("click", clearScore);

function newGame() {
  for (const child of ticTac.children) {
    child.textContent = "";
    child.style.backgroundColor = "#87cefa";
  }
  filledCells = 0;
  currentWinner.textContent = "";
  playerTurn = true;
  winCells = [];
  winCounter = 0;
  winFlag = true;
}

newGameBtn.addEventListener("click", newGame);

let matrix = [
  [2, 3, 4],
  [5, 6, 7],
  [9, 10, 11],
];

const equalToWin = matrix.length - 1 

function idToNumber(id) {
  id = id.split("");
  id = id.filter((item) => item > 0);

  return +id[0];
}

function fillMtx(element, mtx, id) {
  let nmbrId = idToNumber(id);

  if (1 <= nmbrId && nmbrId <= 3) {
    mtx[0][nmbrId - 1] = element;
  } else if (4 <= nmbrId && nmbrId <= 6) {
    mtx[1][nmbrId - 4] = element;
  } else if (7 <= nmbrId && nmbrId <= 9) {
    mtx[2][nmbrId - 7] = element;
  }
}

function onClickHandler(event) {
  if (event.target.textContent == "" && winFlag) {
    if (playerTurn) {
      event.target.textContent = "X";

      filledCells += 1;

      fillMtx(event.target, matrix, event.target.id);

      checker(matrix);

      playerTurn = false;
    } else {
      event.target.textContent = "O";

      filledCells += 1;
      fillMtx(event.target, matrix, event.target.id);
      checker(matrix);

      playerTurn = true;
    }
  }
}

ticTac.addEventListener("click", onClickHandler);

function winner(arr) {
  if (arr[0].textContent == "X") {
    scoreX += 1;
    scoreX_div.textContent = `${scoreX}`;
    currentWinner.textContent = "Player X";
  } else if (arr[0].textContent == "O") {
    winCells.forEach((element) => (element.style.backgroundColor = "#015C65"));
    scoreO += 1;
    scoreO_div.textContent = `${scoreO}`;
    currentWinner.textContent = "Player O";
  }
  winCells.forEach((element) => {
    element.animate(
      [{ backgroundColor: "#87cefa" }, { backgroundColor: "#2C76A3" }],
      {
        duration: 500,
      }
    );
    element.style.backgroundColor = "#2C76A3";
  });
}

function fillWinCells(arr, elem1, elem2) {
  arr.pop();
  arr.push(elem1);
  arr.push(elem2);
}

function checker(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length - 1; j++) {
      if (
        arr[i][j].textContent == arr[i][j + 1].textContent &&
        arr[i][j].textContent
      ) {
        fillWinCells(winCells, arr[i][j], arr[i][j + 1]);
        winCounter += 1;
        if (winCounter == equalToWin) {
          winFlag = false;
          return winner(winCells);
        }
      } else {
        winCells = [];
        winCounter = 0;
      }
    }

    winCells = [];
    winCounter = 0;

    if (i == 0) {
      let index2 = 0;
      let i2 = 0;
      while (i2 < 3) {
        if (
          arr[index2][i2].textContent == arr[index2 + 1][i2].textContent &&
          arr[index2][i2].textContent
        ) {
          winCounter += 1;
          fillWinCells(winCells, arr[index2][i2], arr[index2 + 1][i2]);

          index2 += 1;

          if (winCounter == equalToWin) {
            winFlag = false;

            return winner(winCells);
          }
        } else {
          index2 = 0;
          i2 += 1;
          winCounter = 0;
          winCells = [];
        }
      }
    }

    winCells = [];
    winCounter = 0;

    if (i == 0) {
      let j = 0;
      for (let i = 0; i < arr[i].length - 1; i++) {
        if (
          arr[i][j].textContent == arr[i + 1][j + 1].textContent &&
          arr[i][j].textContent
        ) {
          winCounter += 1;

          fillWinCells(winCells, arr[i][j], arr[i + 1][j + 1]);
          j += 1;
          if (winCounter == equalToWin) {
            winFlag = false;
            return winner(winCells);
          }
        } else {
          winCounter = 0;
          j = 0;
          winCells = [];
          break;
        }
      }
    }

    winCells = [];
    winCounter = 0;

    if (i == 0) {
      j = arr[i].length - 1;
      for (let i = 0; i < arr[i].length - 1; i++) {
        if (
          arr[i][j].textContent == arr[i + 1][j - 1].textContent &&
          arr[i][j].textContent
        ) {
          winCounter += 1;

          fillWinCells(winCells, arr[i][j], arr[i + 1][j - 1]);
          j -= 1;

          if (winCounter == equalToWin) {
            winFlag = false;

            return winner(winCells);
          }
        } else {
          winCounter = 0;
          winCells = [];
          break;
        }
      }
    }

    winCells = [];
    winCounter = 0;

    if (filledCells == 9) {
      winCells = [];
      currentWinner.textContent = "draw";
      break;
    }
  }
}

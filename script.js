// ------------------- Elementos HTML -----------------------
// Tablero y Display de jugadores
const currentPlayer = document.querySelector('#current-player');
const gameBoard = document.querySelector('#game-board');
const boxBoards = gameBoard.querySelectorAll('.box-board');

// Columnas
const column1 = Array.from(gameBoard.getElementsByClassName('column-1'));
const column2 = Array.from(gameBoard.getElementsByClassName('column-2'));
const column3 = Array.from(gameBoard.getElementsByClassName('column-3'));
const columns = [column1, column2, column3];

// Filas
const row1 = Array.from(gameBoard.getElementsByClassName('row-1'));
const row2 = Array.from(gameBoard.getElementsByClassName('row-2'));
const row3 = Array.from(gameBoard.getElementsByClassName('row-3'));
const rows = [row1, row2, row3];

// Diagonales
const diag1 = Array.from(gameBoard.getElementsByClassName('diag-1'));
const diag2 = Array.from(gameBoard.getElementsByClassName('diag-2'));
const diags = [diag1, diag2];

// Etiquetas de jugadores
const playerXTag = document.querySelector('#playerX-tag');
const playerOTag = document.querySelector('#playerO-tag');

playerXTag.style.backgroundColor = '#5aff84';

// ----------------- Variables de juego ---------------------
let turno = true;
let ganador = false;
let sets = [rows, columns, diags];
let filledCells = 0;

// -------------------------- Eventos -----------------------
// Con getElementsByClassName no puedes usar forEach, mientras que con querySelectorAll si
// forEach no te permite retornar ningun valor si lo usass dentro de una funcion
let clickCount = 1;
boxBoards.forEach((boxBoard) => {
  boxBoard.addEventListener('click', () => {
    if (!boxBoard.classList.contains('filled') && turno && filledCells < 9) {
      boxBoard.innerHTML = 'X';
      boxBoard.classList.add('filled');
      filledCells++;
      if (filledCells < 9 && filledCells >= 3) {
        if (!winner()) {
          turno = false;
          changePlayerLabel();
          playPC();
        } else {
          console.log('Gano el humano!!');
        }
      } else if (filledCells === 9) {
        if (winner()) {
          console.log('Gano el humano!!');
        } else {
          console.log('Empate');
        }
      } else {
        turno = false;
        changePlayerLabel();
        playPC();
      }
    }
  });
});

// ----------------- Etiquetas de jugadores dinamicas -------------
function changePlayerLabel() {
  if (turno) {
    playerXTag.style.backgroundColor = '#5aff84';
    playerOTag.style.backgroundColor = 'transparent';
  } else {
    playerOTag.style.backgroundColor = '#5aff84';
    playerXTag.style.backgroundColor = 'transparent';
  }
}

// ----------------- Funciones para checar ganador -----------
function winnerSet3(set3) {
  const winnerX = set3.every((mark) => mark.innerHTML === 'X');
  const winnerO = set3.every((mark) => mark.innerHTML === 'O');
  console.log(winnerX || winnerO);
  return winnerX || winnerO;
}

function winner() {
  for (let set of sets) {
    for (let row_column_diag of set) {
      if (winnerSet3(row_column_diag)) {
        return true;
      }
    }
  }
  return false;
}

// ------------------------- Logica de la PC --------------------
function checkPossibleMove(player_mark) {
  count = 0;
  sets = [rows, columns, diags];
  let possibleMove = null;
  for (let set of sets) {
    for (let row_column_diag of set) {
      for (let cell of row_column_diag) {
        if (cell.innerHTML === player_mark) {
          count++;
        } else {
          possibleMove = cell;
        }
      }
      if (count === 2 && !possibleMove.classList.contains('filled')) {
        return possibleMove;
      }
      count = 0;
    }
  }
  return null;
}

function lastPossibleMove() {
  for (let set of sets) {
    for (let row_column_diag of set) {
      for (let cell of row_column_diag) {
        if (cell.innerHTML === '') {
          return cell;
        }
      }
    }
  }
  return null;
}

function playPC() {
  cell = checkPossibleMove('O');
  if (cell === null) {
    cell = checkPossibleMove('X');
    if (cell === null) {
      cell = lastPossibleMove();
    }
  }

  // setTimeout(funcion_que_se_ejeucta_despues_del_delay, tiempo_delay)
  setTimeout(() => {
    cell.innerHTML = 'O';
    cell.classList.add('filled');
    filledCells++;
    if (!winner()) {
      turno = true;
      changePlayerLabel();
    } else {
      console.log('Gano la PC!!');
    }
  }, 1000);
}

const statusDisplay = document.querySelector('.play-status');

let gameState = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let liveGame = true;
const winningConditions = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 4, 8],[0, 3, 6],[2, 4, 6],[1, 4, 7],[2, 5, 8],];
const winnerMsg = () => `Player ${currPlayer} is the Winner!`;
const drawMsg = () => `Draw!`;
const currPlayerTurn = () => `It's ${currPlayer}'s turn!`;

statusDisplay.innerHTML = currPlayerTurn();

//=================================================================================
function rotatePlayers() {
    currPlayer = currPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currPlayerTurn();
}

//=================================================================================
function ClickedCells(cell_clicked, cell_clicked_index) {

        gameState[cell_clicked_index] = currPlayer;
        cell_clicked.innerHTML = currPlayer;
    }

//=================================================================================

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a == "" || b == "" || c == "") {
            continue;
        }
        if (a == b && b == c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        statusDisplay.innerHTML = winnerMsg();
        liveGame = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMsg();
        liveGame = false;
        return;
    }

    rotatePlayers();
}


//=================================================================================
function handleCellClick(clickedCellEvent) {
   
        const cell_clicked = clickedCellEvent.target;

        const cell_clicked_index = parseInt(
          cell_clicked.getAttribute('id')
        );

        if (gameState[cell_clicked_index] !== "" || !liveGame) {
            return;
        }

        ClickedCells(cell_clicked, cell_clicked_index);
        handleResultValidation();
    }

//=================================================================================
    function handleRestartGame() {
        currPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        liveGame = true;
        statusDisplay.innerHTML = currPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    }

//=================================================================================

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart-game').addEventListener('click', handleRestartGame);

//=================================================================================



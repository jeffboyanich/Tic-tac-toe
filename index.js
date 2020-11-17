const gameBoard = document.getElementById('gameboard');


const displayBoard = (() => {
    for (let i = 0; i < 9; i++) {
        index = i;
        console.log(index);
        const boardSpace = document.createElement('div');
        boardSpace.classList.add('board-space');
        boardSpace.dataset.index = index;
        gameBoard.appendChild(boardSpace);
        }
    const boardArr = [];
    for(i = 0; i < 9; i++) {
        boardArr.push('');
    };
    console.log(boardArr);
    return {boardArr};
})();



const createPlayers = (name, marker, turn, value) => {
    const changeTurn = function() {
        if (turn == true) {
            turn = false;
        } else {
            turn = true;
        }
    }
    const mark = function(e) {
        if (turn == true) {
            e.target.textContent = marker;
            displayBoard.boardArr[e.target.dataset.index] = value;
        }
    }
    return {name, mark, changeTurn, value}
};

const playGame = (() => {
    const player1 = createPlayers('playerOne', 'X', true, 1);
    const player2 = createPlayers('playerTwo', 'O', false, 2);
    const boardSpaces = document.querySelectorAll('.board-space');
        boardSpaces.forEach(function(item) {
            item.addEventListener('click', function(e) {
                if (e.target.textContent == '') {
                    player1.mark(e);
                    player2.mark(e);
                    player1.changeTurn();
                    player2.changeTurn();
                    console.log(displayBoard.boardArr);
                    checkWin();
                }    
            });
        });
    let winCount = 0;
    function declareWin() {
        if (winCount == 3) {
            console.log('player1 wins!')
        }else if (winCount == 15) {
            console.log('player2 wins!')
        }
        winCount = 0;
        };
    const rowWin = () => {
        for (i = 0; i < 3; i++) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
                console.log(winCount);
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
        for (i = 3; i < 6; i++) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
                console.log(winCount);
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }

        }
        declareWin();
        for (i = 6; i < 9; i++) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
                console.log(winCount);
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
    };
    const columnWin = () => {
        for (i = 0; i < 7; i + 3) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
                console.log(winCount);
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
    }

    
    function checkWin() {
      rowWin();
      columnWin();
    }

})();


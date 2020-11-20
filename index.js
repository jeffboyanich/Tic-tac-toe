const displayBoard = (() => {
    const gameBoard = document.getElementById('gameboard');
    for (let i = 0; i < 9; i++) {
        index = i;
        const boardSpace = document.createElement('div');
        boardSpace.classList.add('board-space');
        boardSpace.dataset.index = index;
        gameBoard.appendChild(boardSpace);
        if (index == 0 || index == 3) {
            boardSpace.classList.add('bottom-right');
        }else if (index == 1 || index == 4) {
            boardSpace.classList.add('bottom');
        }else if (index == 2 || index == 5) {
            boardSpace.classList.add('bottom-left');
        }else if (index == 6) {
            boardSpace.classList.add('right');
        }else if (index == 8) {
            boardSpace.classList.add('left');
        } 
    };
    const boardSpaces = document.querySelectorAll('.board-space');
    const boardArr = [];
    for(i = 0; i < 9; i++) {
        boardArr.push('');
    };
    function resetDisplay() {
        boardSpaces.forEach(function (item) {
            item.textContent = '';
        });
        gameOverPopup.style.display = 'none';
    }
    const resetBoardArr = () => {
        for (i = 0; i < 9; i++) {
            boardArr[i] = '';
        }
    }
    const gameOverPopup = document.getElementById('overlay');
    function gameOverDisplay(winner) {
        let popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');
        popupContent.textContent = winner + ' won this time!';
        gameOverPopup.appendChild(popupContent);
        let continueBtn = document.createElement('button');
        continueBtn.textContent = 'Yes';
        continueBtn.addEventListener('click', function() {
            resetDisplay();
            resetBoardArr();
            playGame.reset();
            popupContent.remove();
        });
        popupContent.append(continueBtn);
        gameOverPopup.style.display = 'block';
    }
    const startGamePopup = document.getElementById('start-overlay');
    const playerNameForm = document.getElementById('start-content');
    const playBtn = document.getElementById('play-button');
    /*let p1name = playerNameForm.p1name.value;
    let p2name = playerNameForm.p2name.value; */
    function startGame() {
        p1name = playerNameForm.p1name.value;
        p2name = playerNameForm.p2name.value;
        playGame(p1name, p2name);
    }
    playBtn.addEventListener('click', function() {
        startGamePopup.style.display = 'none';
        startGame();
    })
    return {boardArr, resetDisplay, gameOverDisplay, p1name, p2name};
})();

const createPlayers = (name, marker, turn, value, markerColor) => {
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
            e.target.style.color = markerColor;
            displayBoard.boardArr[e.target.dataset.index] = value;
        }
    }
    return {name, mark, changeTurn, value}
};

const playGame = (p1name, p2name) => {
    const player1 = createPlayers(p1name, 'X', true, 1, 'red');
    const player2 = createPlayers(p2name, 'O', false, 2, 'blue');
    console.log(player1.name);
    console.log(player2.name);
    const boardSpaces = document.querySelectorAll('.board-space');
        boardSpaces.forEach(function(item) {
            item.addEventListener('click', function(e) {
                if (e.target.textContent == '') {
                    player1.mark(e);
                    player2.mark(e);
                    player1.changeTurn();
                    player2.changeTurn();
                    checkWin();
                    console.log(displayBoard.boardArr);
                }    
            });
        });
    let winCount = 0;
    let winner = '';
    function declareWin() {
        if (winCount == 3) {
            winner = `${player1.name}`;
            displayBoard.gameOverDisplay(winner);
            console.log(winCount);
        }else if (winCount == 15) {
            winner = `${player2.name}`;
            displayBoard.gameOverDisplay(winner);
            console.log(winCount);
        }
        winCount = 0;
        };
    const rowWin = () => {
        for (i = 0; i < 3; i++) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
        for (i = 3; i < 6; i++) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }

        }
        declareWin();
        for (i = 6; i < 9; i++) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
    };
    const columnWin = () => {
        for (i = 0; i < 7; i += 3) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
        for (i = 1; i < 8; i += 3) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
        for (i = 2; i < 9; i += 3) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
    }
    const diagonalWin = () => {
        for (i = 0; i < 9; i += 4) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
        for (i = 2; i < 7; i += 2) {
            if (displayBoard.boardArr[i] == 1) {
                winCount++;
            }else if (displayBoard.boardArr[i] == 2) {
                winCount += 5;
            }
        }
        declareWin();
    }
    function checkWin() {
      rowWin();
      columnWin();
      diagonalWin();
    }
    const reset = () => {
        winner = '';
    }
    return {reset}
};


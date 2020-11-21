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
        let winnerText = document.createElement('div');
        winnerText.textContent = `${winner}` + ' won!';
        let anotherRoundText = document.createElement('div');
        anotherRoundText.textContent = 'Play another round?'
        gameOverPopup.appendChild(popupContent);
        popupContent.appendChild(winnerText);
        popupContent.appendChild(anotherRoundText);
        let continueBtn = document.createElement('button');
        let stopButton = document.createElement('button');
        stopButton.textContent = 'No';
        continueBtn.textContent = 'Yes';
        continueBtn.addEventListener('click', function() {
            resetDisplay();
            resetBoardArr();
            popupContent.remove();
        });
        stopButton.addEventListener('click', function() {
            resetDisplay();
            resetBoardArr();
            displayNames('','');
            displayScore('', '');
            startGamePopup.style.display = 'block';
        })
        popupContent.append(continueBtn);
        popupContent.appendChild(stopButton);
        gameOverPopup.style.display = 'block';
    }
    const startGamePopup = document.getElementById('start-overlay');
    const playerNameForm = document.getElementById('start-content');
    const playBtn = document.getElementById('play-button');
    const p1Display = document.querySelector('.p1-display-name');
    const p2Display = document.querySelector('.p2-display-name');
    function displayNames(p1name, p2name) {
        p1Display.textContent = p1name;
        p2Display.textContent = p2name;
    }
    function startGame() {
        p1name = playerNameForm.p1name.value;
        p2name = playerNameForm.p2name.value;
        playGame(p1name, p2name);
        displayNames(p1name, p2name);
    }
    playBtn.addEventListener('click', function() {
        startGamePopup.style.display = 'none';
        startGame();
        playerNameForm.reset();
        displayScore(0, 0);
        updateTurnDisplay(true, false);
    });
    function displayScore(p1Score, p2Score) {
        const p1ScoreDisplay = document.querySelector('.p1-display-score');
        const p2ScoreDisplay = document.querySelector('.p2-display-score');
        p1ScoreDisplay.textContent = p1Score;
        p2ScoreDisplay.textContent = p2Score;
    };
    const p1ColorDisplay = document.querySelectorAll('.p1-color-select');
    p1Color = '';
    p2Color = '';
    p1ColorDisplay.forEach(function(item) {
        item.addEventListener('click', function(e) {
            p1Color = e.target.dataset.color;
            e.target.style.border = '3px solid black';
            p1ColorDisplay.forEach(function(item) {
                if (item != e.target) {
                    item.style.border = 'none';
                }
            })
        })
    });
    const p2ColorDisplay = document.querySelectorAll('.p2-color-select');
    p2ColorDisplay.forEach(function(item) {
        item.addEventListener('click', function(e) {
            p2Color = e.target.dataset.color;
            e.target.style.border = '3px solid black';
            p2ColorDisplay.forEach(function(item) {
                if (item != e.target) {
                    item.style.border = 'none';
                }
            })
        })
    });

    const updateTurnDisplay = (p1Turn, p2Turn) => {
        const p1TurnDisplay = document.getElementById('p1-turn');
        const p2TurnDisplay = document.getElementById('p2-turn');
        if (p1Turn == true) {
            p1TurnDisplay.textContent = "It's your turn";
            p2TurnDisplay.textContent = '';
        }else if (p2Turn == true) {
            p2TurnDisplay.textContent = "It's your turn";
            p1TurnDisplay.textContent = '';
        }
    }
    return {boardArr, resetDisplay, gameOverDisplay, p1name, p2name, displayScore, p1Color, updateTurnDisplay};
})();

const createPlayers = (name, marker, turn, value, markerColor) => {
    let score = 0;
    const changeTurn = function() {
        if (this.turn == true) {
            this.turn = false;
        } else {
            this.turn = true;
        }
    }
    const mark = function(e) {
        if (this.turn == true) {
            e.target.textContent = marker;
            e.target.style.color = markerColor;
            displayBoard.boardArr[e.target.dataset.index] = value;
        }
    }
    const addScore = (player) => {
        return ++player.score;
    }
    return {name, mark, changeTurn, value, addScore, score, turn}
};

const playGame = (p1name, p2name) => {
    const player1 = createPlayers(p1name, 'X', true, 1, p1Color);
    const player2 = createPlayers(p2name, 'O', false, 2, p2Color);

    const boardSpaces = document.querySelectorAll('.board-space');
        boardSpaces.forEach(function(item) {
            item.addEventListener('click', function(e) {
                if (e.target.textContent == '') {
                    player1.mark(e);
                    player2.mark(e);
                    player1.changeTurn();
                    player2.changeTurn();
                    displayBoard.updateTurnDisplay(player1.turn, player2.turn);
                    checkWin();
                    console.log(displayBoard.boardArr);
                }    
            });
        });
    let winCount = 0;
    let winner = '';
    function declareWin() {
        let newP1Score = player1.score;
        let newP2Score = player2.score;
        if (winCount == 3) {
            winner = player1.name;
            player1.addScore(player1);
            newP1Score = player1.score;
            displayBoard.gameOverDisplay(winner);
            displayBoard.displayScore(newP1Score, newP2Score);
        }else if (winCount == 15) {
            winner = player2.name;
            player2.addScore(player2);
            newP2Score = player2.score;
            displayBoard.gameOverDisplay(winner);
            displayBoard.displayScore(newP1Score, newP2Score);
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
    
    const checkDraw = () => {
        let draw = displayBoard.boardArr.every(function(item) {
            item === Number;
        });
        if (draw === true) {
            winner === null;
            console.log('draw');
        }
    };
    function checkWin() {
      rowWin();
      columnWin();
      diagonalWin();
      checkDraw();
    };

    return {player1, player2, winner}
};


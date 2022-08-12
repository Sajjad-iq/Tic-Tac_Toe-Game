window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.cell'));
    const playerDisplay = document.querySelector('.display-player');
    const announcer = document.querySelector('.announcer');
    const resetButton = document.querySelector('#reset');


    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) { // => true
            tile.innerText = currentPlayer; // => X
            tile.classList.add(`player${currentPlayer}`); // => X
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    // check if you click on tile you allready clicked
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }

        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer; // bord = ["O","X","O"]
    }

    // check if you win or lose
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            // this will check what's inside the bord by index that's come from winConditon
            const winCondition = winningConditions[i]; // = [6,7,8]
            const a = board[winCondition[0]]; // = 6
            const b = board[winCondition[1]]; // = 7
            const c = board[winCondition[2]]; // = 8
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) { // a = "X" , b = "X" , c = "X" = X win
                roundWon = true;
                break;
            }
        }


        if (roundWon) { // if true
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes('')) // if board not empty
            announce(TIE);

    }


    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    // retern the win player to the screen
    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
    resetButton.addEventListener('click', resetBoard);

});

const Player = (name, marker) => {
    const getMarker = () => marker;
    const getName = () => name;
    return { getMarker, getName };
}

const Gameboard = (() => {
    const grid = document.querySelector('.grid');
    const p1 = Player('Player 1', 'X');
    const p2 = Player('Player 2', 'O');
    let board = ['0', '1', '2',
                 '3', '4', '5',
                 '6', '7', '8',
    ];
    const reset = () => {
        board = ['0', '1', '2',
                 '3', '4', '5',
                 '6', '7', '8',
        ];
        turn = 2;
        const tiles = document.querySelectorAll(".grid div");
        [].forEach.call(tiles, function(item, i) {
            item.addEventListener('click', (e) => {
                checkIfMarked(e);
                if (isMarked === true) {
                    alert("Tile is taken. Please choose another.");
                    return;
                }
                updateTurn();
                if (turn == 1) { e.target.innerText = p1.getMarker(); }
                else if (turn == 2) { e.target.innerText = p2.getMarker(); }
                updateBoard(e);
                checkWinCondition();
            });
        });
    }

    const makeGameBoard = () => {
        for (let i = 0; i < 9; i++) {
            const gridDiv = document.createElement('div');
            gridDiv.setAttribute('id', i);
            if (gridDiv.id == '0' || gridDiv.id == '1' || gridDiv.id == '2') {
                gridDiv.classList.add('border-top-none');
            }if (gridDiv.id == '0' || gridDiv.id == '3' || gridDiv.id == '6') {
                gridDiv.classList.add('border-left-none');
            }if (gridDiv.id == '2' || gridDiv.id == '5' || gridDiv.id == '8') {
                gridDiv.classList.add('border-right-none');
            }if (gridDiv.id == '6' || gridDiv.id == '7' || gridDiv.id == '8') {
                gridDiv.classList.add('border-bottom-none');
            }
            grid.appendChild(gridDiv);
        }
    }
    makeGameBoard();

    const displayWinner = (name) => {
        const modal = document.querySelector('.modal');
        const h2 = document.querySelector('h2');
        const playAgain = document.querySelector('.playAgain');


        h2.textContent = name + " wins!"
        playAgain.addEventListener('click', () => {
            modal.style.display = 'none';
            grid.innerHTML = "";
            makeGameBoard();
            reset();
        })
        modal.style.display = 'block';
    }

    const checkWinCondition = () => {
        let winCondition = false;
        let i = 0;
        let j = 1;
        while (i <= 6) {
            if ((board[i] == board[j]) && (board[j] == board[j+1]) && (board[i] == board[j+1])) {
                if (board[i] == p1.getMarker()) { displayWinner(p1.getName()); }
                else if (board[i] == p2.getMarker()) { displayWinner(p2.getName())}
            }
            i += 3;
            j += 3;
        }
        i = 0;
        while (i < 3) {
            j = i;
            if ((board[j] == board[j+3]) && (board[j+3] == board[j+6]) && (board[j] == board[j+6])) {
                if (board[i] == p1.getMarker()) { displayWinner(p1.getName()); }
                else if (board[i] == p2.getMarker()) { displayWinner(p2.getName())}
            }
            i++;
        }
        if ((board[0] == board[4]) && (board[4] == board[8]) && (board[0] == board[8])) {
            if (board[i] == p1.getMarker()) { displayWinner(p1.getName()); }
                else if (board[i] == p2.getMarker()) { displayWinner(p2.getName())}
        } else if ((board[2] == board[4]) && (board[4] == board[6]) && (board[2] == board[6])) {
            if (board[i] == p1.getMarker()) { displayWinner(p1.getName()); }
                else if (board[i] == p2.getMarker()) { displayWinner(p2.getName())}
        }
    }

    const updateBoard = (e) => {
        let tile = e.target.id;
        if (turn == 1) { board[tile] = e.target.innerText = p1.getMarker(); }
        else if (turn == 2) { board[tile] = e.target.innerText = p2.getMarker(); }
    }

    let turn = 2;
    const updateTurn = () => {
        if (turn == 1) {
            turn = 2; 
            return; 
        }else if (turn == 2) {
            turn = 1;
            return;
        }
    }

    let isMarked = false;
    const checkIfMarked = e => {
        if (e.target.innerText == "X" || e.target.innerText == "O") { isMarked = true; }
        else { isMarked = false; }
    }

    const tiles = document.querySelectorAll(".grid div");
    [].forEach.call(tiles, function(item, i) {
        item.addEventListener('click', (e) => {
            checkIfMarked(e);
            if (isMarked === true) {
                alert("Tile is taken. Please choose another.");
                return;
            }
            updateTurn();
            if (turn == 1) { e.target.innerText = p1.getMarker(); }
            else if (turn == 2) { e.target.innerText = p2.getMarker(); }
            updateBoard(e);
            checkWinCondition();
        });
    });
})();






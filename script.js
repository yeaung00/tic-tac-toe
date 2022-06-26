const Player = (marker) => {
    const getMarker = () => marker;
    return { getMarker };
}


const Gameboard = (() => {
    const p1 = Player('X');
    const p2 = Player('O');
    let board = ['0', '1', '2',
                 '3', '4', '5',
                 '6', '7', '8',
    ];

    const checkWinCondition = () => {
        let winCondition = false;
        let i = 0;
        let j = 1;
        while (i <= 6) {
            if ((board[i] == board[j]) && (board[j] == board[j+1]) && (board[i] == board[j+1])) {
                winCondition = true;
            }
            i += 3;
            j += 3;
        }
        i = 0;
        while (i < 3) {
            j = i;
            if ((board[j] == board[j+3]) && (board[j+3] == board[j+6]) && (board[j] == board[j+6])) {
                winCondition = true;
            }
            i++;
        }
        if ((board[0] == board[4]) && (board[4] == board[8]) && (board[0] == board[8])) {
            winCondition = true;
        } else if ((board[2] == board[4]) && (board[4] == board[6]) && (board[2] == board[6])) {
            winCondition = true;
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






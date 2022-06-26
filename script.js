const Player = (marker) => {
    const getMarker = () => marker;
    return { getMarker };
}

const Gameboard = (() => {
    const p1 = Player('X');
    const p2 = Player('O');
    
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
            if (isMarked === false) { updateTurn(); }
            if (isMarked === true) {
                alert("Tile is taken. Please choose another.");
                return;
            }
            if (turn == 1) { e.target.innerText = p1.getMarker(); }
            if (turn == 2) { e.target.innerText = p2.getMarker(); }
        });
    });
})();






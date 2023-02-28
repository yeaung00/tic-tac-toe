const createWinConditions = n => {
  let winConditions = [], index = 0;
  for (let i = 0; i < n * n; i += n) {
    winConditions.push([]);
    for (let j = i; j < i + n; j++) {
      winConditions[index].push(j);
    }
    index++;
  }
  for (let i = 0; i < n; i++) {
    winConditions.push([]);
    for (let j = i; j < n * n; j += n) {
      winConditions[index].push(j);
    }
    index++;
  }
  winConditions.push([])
  for (let i = 0; i < n * n; i += n + 1) {
    winConditions[index].push(i);
  }
  index++;
  winConditions.push([])
  for (let i = n - 1; i <= (n * n) - n; i += (n - 1)) {
    winConditions[index].push(i)
  }
  console.log(winConditions);
  return winConditions;
}

const checkWinCondition = (winConditions, board, mark) => {
  return winConditions.some(condition => {
    return condition.every(i => board[i] === mark)
  })
}
const checkTie = (board) => {
  const availableSpots = board.filter(item => typeof item === 'number');
  return availableSpots.length === 0;
}
const getRandomIndex = (board) => {
  const availableSpots = board.filter(item => typeof item === 'number');
  console.log('avail', availableSpots, Math.floor(Math.random() * availableSpots.length))
  return availableSpots[Math.floor(Math.random() * availableSpots.length)];
}

function getBestIndex(winConditions, newBoard, player) {
  const availableSpots = newBoard.filter(item => typeof item === 'number');

  if (checkWinCondition(winConditions, newBoard, "X")) { return {score: -10}; }
  else if (checkWinCondition(winConditions, newBoard, "O")) { return {score: 10}; }
  else if (checkTie(newBoard)) { return {score: 0}; }

  const moves = [];
  for (let i = 0; i < availableSpots.length; i++) {
    let move = {};
    move.index = newBoard[availableSpots[i]];
    newBoard[availableSpots[i]] = player;
    if (player === "O") {
      const result = getBestIndex(winConditions, newBoard, "X");
      move.score = result.score;
    } else{
      const result = getBestIndex(winConditions, newBoard, "O");
      move.score = result.score;
    }

    newBoard[availableSpots[i]] = move.index;
    moves.push(move);
  }
  let bestMove;
  if(player === "O") {
      let bestScore = -10000;
      for(let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
  } else {
      let bestScore = 10000;
      for(let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
  }

  return moves[bestMove];
}

const gameServices = {
  createWinConditions,
  checkWinCondition,
  checkTie,
  getRandomIndex,
  getBestIndex,
}

export default gameServices;
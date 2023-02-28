import './App.css';
import { useState, useEffect } from 'react';
import Board from './component/Board';
import GameOptions from './component/GameOptions';
import gameServices from './services/game';

function App() {
  const [size, setSize] = useState(3)
  const [board, setBoard] = useState(Array(9).fill(null).map((item, i) => i));
  const [xTurn, setXTurn] = useState(true);
  const [cpu, setCpu] = useState({ isPlaying: false, diff: 'easy' });
  const [hasWon, setHasWon] = useState(false);
  const [isTied, setIsTied] = useState(false);
  const [winConditions, setWinConditions] = useState(gameServices.createWinConditions(3));

  useEffect(() => {
    if (cpu.isPlaying && !xTurn && !hasWon) {
      const mark = xTurn ? "X" : "O";
      console.log(cpu.diff)
      const index = cpu.diff === "easy" 
        ? gameServices.getRandomIndex(board)
        : gameServices.getBestIndex(winConditions, board, "O").index;
      console.log(index)
      board[index] = "O";
      setBoard([...board]);
      setHasWon(gameServices.checkWinCondition(winConditions, board, mark))
      setXTurn(!xTurn);
    }
  }, [board])
  const restartGame = () => {
    setXTurn(true);
    setBoard(board.fill(null).map((item, i) => i));
    setHasWon(false);
    setIsTied(false);
  }
  const toggleCpu = () => {
    setCpu(prevCpu => ({...prevCpu, isPlaying: !prevCpu.isPlaying}));
    restartGame();
  }
  const handleClick = item => {
    const mark = xTurn ? "X" : "O";
    board[item] = mark;
    setBoard([...board]);
    setHasWon(gameServices.checkWinCondition(winConditions, board, mark))
    setIsTied(gameServices.checkTie(board));
    setXTurn(!xTurn);
  }
  const handleGridChange = e => {
    const newSize = Number(e.target.value);
    setXTurn(true);
    setSize(newSize);
    setBoard(Array(newSize * newSize).fill(null).map((item, i) => i));
    setWinConditions(gameServices.createWinConditions(newSize));
  }
  const handleDiffChange = e => {
    setCpu(prevCpu => ({...prevCpu, diff: e.target.value }));
    restartGame();
  }
  return (
    <div className="App">
      <GameOptions 
        handleGridChange={handleGridChange}
        handleDiffChange={handleDiffChange}
        cpu={cpu}
      />
      <p>{xTurn ? "X's turn" : "O's turn"}</p>
      <Board 
        size={size}
        board={board}
        handleClick={handleClick}
      />
      <button onClick={toggleCpu}>
        {cpu.isPlaying ? "Toggle PvP" : "Toggle CPU"}
      </button>
      {(hasWon || isTied) && 
      <div className='win-message-div'>
        {hasWon && <p className='win-text'>{xTurn ? "O" : "X"} wins!</p>}
        {isTied && <p className='win-text'>Tied game!</p>}
        <button onClick={restartGame}className='win-btn'>Play again?</button>
      </div>}
    </div>
  );
}

export default App;

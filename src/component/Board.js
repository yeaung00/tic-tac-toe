import React from 'react'
import Cell from './Cell'

function Board({ size, board, handleClick }) {
  return (
    <div className='Board' style={{gridTemplateColumns: `repeat(${size}, auto)`}}> 
      {board.map((item, index) => (
        <Cell 
          key={index} 
          mark={item}
          handleClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}

export default Board
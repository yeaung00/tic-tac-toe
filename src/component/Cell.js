import React from 'react'

function Cell({ mark, handleClick }) {
  return (
    <div className='Cell' onClick={handleClick}>
      {typeof mark === 'number' ? '' : mark}
    </div>
  )
}

export default Cell
import React from 'react'

function GameOptions({ handleGridChange, setCpu, cpu }) {
  return (
    <div>
      <select onChange={handleGridChange}>
        <option value={3}>3x3</option>
        <option value={4}>4x4</option>
        <option value={5}>5x5</option>
        <option value={6}>6x6</option>
      </select>
      {cpu.isPlaying &&
        <select onChange={(e) => setCpu(prevCpu => ({...prevCpu, diff: e.target.value }))}>
          <option value='easy'>Easy</option>
          <option value='impossible'>Impossible</option>
        </select>
      }

    </div>
  )
}

export default GameOptions
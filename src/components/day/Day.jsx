import React from 'react'

import "./day.style.css"

const Day = ({ day, handleClick }) => {
  const className = `day ${day.value === 'filler' ? 'filler' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`
  return (
    <div className={className} onClick={handleClick}>
      {/* don't need filler days */}
      {day.value !== 'filler' ? day.value : ''}

      {/* render event here */}
      {day.event && <div className='event'>{day.event.title}</div>}
    </div>
  )
}

export default Day;
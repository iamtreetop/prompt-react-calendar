import React from 'react'

import "./day.style.css"

const Day = ({ day, handleClick }) => {
  const className = `day ${day.value === 'filler' ? 'filler' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`
  debugger
  return (
    <div className={className} onClick={handleClick}>
      {/* don't need filler days */}
      {day.value !== 'filler' ? day.value : ''}

      {/* need to render appointments here */}
      {day.appointments && <div className='appointment'>{day.appointments.title}</div>}
    </div>
  )
}

export default Day;
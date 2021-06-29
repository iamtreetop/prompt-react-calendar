import React from 'react'

import "./day.style.css"

const Day = ({ day, handleClick }) => {
  return (
    <div className="day" onClick={handleClick}>
      {/* don't need filler days */}
      {day.value !== 'filler' ? day.value : ''}

      {/* render event here */}
    </div>
  )
}

export default Day;
import React from 'react'

import "./day.styles.css"

const Day = ({ day, handleClick }) => {
  const className = `day ${day.value === 'filler' ? 'filler' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`
  // debugger

  const formatTime = (time) => {
    if (Number(time.slice(0,2)) < 12 || Number(time.slice(0,2)) === 24) {
      return time + "am";
    } else {
      let numTime = Number(time.slice(0,2)) % 12;
      return numTime.toString() + time.slice(2)  + "pm"
    }
  }

  return (
    <div className={className} onClick={handleClick}>
      {/* don't need filler days */}
      {day.value !== 'filler' ? day.value : ''}

      {/* render appointment*/}
      {
        day.appointments?.map((day, idx) => {
          return (
            <div key={idx} className='appointment'>{formatTime(day.startTime)} {day.title}</div>
          )
        })
      }
    </div>
  )
}

export default Day;
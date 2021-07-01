import React from 'react'
import { formatTime } from '../../utils/utils';

import "./day.styles.css"

const Day = ({ day, handleClick }) => {
  const className = `day ${day.value === 'filler' ? 'filler' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`

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
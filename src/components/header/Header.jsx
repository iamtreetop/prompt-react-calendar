import React from 'react';

import './header.styles.css'

const Header = ({ dateDisplay, onNext, onBack }) => {
  return (
    <div id="header">
      <div id="monthDisplay">{dateDisplay}</div>
      <div>
        <button id="backButton" onClick={onBack}>Back</button>
        <button id="nextButton" onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

export default Header;
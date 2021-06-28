import React from 'react';

const Header = () => {
  return (
    <div id="header">
      <div id="monthDisplay">MONTH YEAR</div>
      <div>
        <button id="backButton">Back</button>
        <button id="nextButton">Next</button>
      </div>
    </div>
  )
}

export default Header;
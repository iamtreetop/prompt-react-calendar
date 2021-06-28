import React, { useState } from "react";

import Header from "./components/header/Header";
import Day from "./components/day/Day";

import "./App.css";

function App() {
  // to navigate months, 0 is current, -1 for prev, +1 for next
  const [currentMonth, setCurrentMonth] = useState(0);
  // initalize events variables; will save to local storage
  const [events, setEvents] = useState([]);

  return (
    <div id="container">
      <Header />

      <div id="weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      <div id="calendar">
        <Day />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

import Header from "./components/header/Header";
import Day from "./components/day/Day";

import "./App.css";

function App() {
  // to navigate months, 0 is current, -1 for prev, +1 for next
  const [currentMonth, setCurrentMonth] = useState(0);
  // trigger day
  const [clicked, setClicked] = useState();
  // initalize events variables; will save to local storage
  const [events, setEvents] = useState(
    localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : []
  );
  // store day obvjects
  const [days, setDays] = useState([]);
  // month year display date
  const [dateDisplay, setDateDisplay] = useState("");

  const currentEventDate = (date) => {
    events.find((event) => event.date === date);
  };

  // update local storage when events change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const date = new Date();

    if (currentMonth !== 0) {
      date.setMonth(new Date().getMonth() + currentMonth);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    setDateDisplay(`${date.toLocaleDateString("en-us", { month: "long" })}`);
    
    const fillerDays = weekdays.indexOf(dateString.split(", ")[0]);

    // build days array
    const daysArray = [];
    for (let i = 1; i <= fillerDays + daysInMonth; i++) {
      const dayString = `${month + 1} / ${i - fillerDays} / ${year}`;

      if (i > fillerDays) {
        // not filler day; push day objects
        daysArray.push({
          value: i - fillerDays,
          isCurrentDay: i - fillerDays === day && currentMonth === 0,
          date: dayString,
          event: currentEventDate(dayString),
        });
        // filler day
      } else {
        daysArray.push({
          value: "filler",
          isCurrentDay: false,
          date: "",
          event: null,
        });
      }
    }

    setDays(daysArray);
  }, [events, currentMonth]);

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
        {days.map((day, idx) => {
          return (
            <Day
              key={idx}
              day={day}
              handleClick={() => {
                console.log("clicked!");
                if (day.value === "filler") {
                  setClicked(day.date);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

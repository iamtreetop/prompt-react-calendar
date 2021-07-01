import React, { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Day from "./components/Day/Day";
import CreateAppointmentModal from "./components/CreateAppt/CreateAppointmentModal";
import AppointmentModal from "./components/ApptModal/AppointmentModal";

import "./App.css";

function App() {
  // to navigate months, 0 is current, -1 for prev, +1 for next
  const [currentMonth, setCurrentMonth] = useState(0);
  // trigger day
  const [clicked, setClicked] = useState();
  // initalize appointments variables; will save to local storage
  const [appointments, setAppointments] = useState(
    localStorage.getItem("appointments")
      ? JSON.parse(localStorage.getItem("appointments"))
      : []
  );
  // store day obvjects
  const [days, setDays] = useState([]);
  // month year display date
  const [dateDisplay, setDateDisplay] = useState("");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [viewAppointments, setViewAppointments] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const appointmentForDate = (date) =>
    appointments.filter((e) => e.date === date);

  // update local storage when appointments change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

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

    setDateDisplay(
      `${date.toLocaleDateString("en-us", { month: "long" })} ${year}`
    );

    const fillerDays = weekdays.indexOf(dateString.split(", ")[0]);

    // build days array
    const daysArray = [];
    for (let i = 1; i <= fillerDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - fillerDays}/${year}`;

      if (i > fillerDays) {
        // not filler day; push day objects
        daysArray.push({
          value: i - fillerDays,
          isCurrentDay: i - fillerDays === day && currentMonth === 0,
          date: dayString,
          appointments: appointmentForDate(dayString),
        });
        // filler day
      } else {
        daysArray.push({
          value: "filler",
          isCurrentDay: false,
          date: "",
          appointments: null,
        });
      }
    }

    setDays(daysArray);
  }, [appointments, currentMonth]);

  const onSave = () => {
    console.log("saved appt");

    if (editMode !== null) {
      let index = appointments.findIndex((a) => a.id === editMode);
      setAppointments(
        [
          ...appointments.slice(0, index),
          { id: editMode, title, date: clicked, startTime, endTime },
          ...appointments.slice(index + 1),
        ].sort((a, b) => {
          let t1 = a.startTime.slice(0, 2);
          let t2 = b.startTime.slice(0, 2);

          return t1 > t2 ? 1 : -1;
        })
      );
    } else {
      setAppointments(
        [
          ...appointments,
          { id: Date.now(), title, date: clicked, startTime, endTime },
        ].sort((a, b) => {
          let t1 = a.startTime.slice(0, 2);
          let t2 = b.startTime.slice(0, 2);

          return t1 > t2 ? 1 : -1;
        })
      );
    }

    setClicked(null);
    setEditMode(null);
    setStartTime("");
    setEndTime("");
    setTitle("");
  };

  const deleteAppt = (id) => {
    let apptList = appointments.filter((a) => a.id !== id);
    setAppointments(apptList);
  };

  return (
    <>
      <div id="container">
        <Header
          dateDisplay={dateDisplay}
          onNext={() => setCurrentMonth(currentMonth + 1)}
          onBack={() => setCurrentMonth(currentMonth - 1)}
          setViewAppointments={setViewAppointments}
        />

        <div id="weekdays">
          <div>
            <b>Sunday</b>
          </div>
          <div>
            <b>Monday</b>
          </div>
          <div>
            <b>Tuesday</b>
          </div>
          <div>
            <b>Wednesday</b>
          </div>
          <div>
            <b>Thursday</b>
          </div>
          <div>
            <b>Friday</b>
          </div>
          <div>
            <b>Saturday</b>
          </div>
        </div>

        <div id="calendar">
          {days.map((day, idx) => {
            return (
              <Day
                key={idx}
                day={day}
                handleClick={() => {
                  console.log("clicked!");
                  if (day.value !== "filler") {
                    setClicked(day.date);
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      {clicked && (
        <CreateAppointmentModal
          currentDate={clicked}
          appointments={appointments}
          title={title}
          setTitle={setTitle}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          error={error}
          setError={setError}
          onClose={() => {
            setClicked(null);
            setError("");
            setStartTime("");
            setEndTime("");
          }}
          onSave={onSave}
          setEditMode={setEditMode}
        />
      )}

      {viewAppointments && (
        <AppointmentModal
          appointments={appointments}
          onClose={() => setViewAppointments(false)}
          onDelete={deleteAppt}
          setTitle={setTitle}
          setClicked={setClicked}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setViewAppointments={setViewAppointments}
          setEditMode={setEditMode}
        />
      )}
    </>
  );
}

export default App;

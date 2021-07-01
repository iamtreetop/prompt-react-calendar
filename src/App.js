import React, { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Day from "./components/Day/Day";
import CreateAppointmentModal from "./components/CreateAppt/CreateAppointmentModal";
import AppointmentModal from "./components/ApptModal/AppointmentModal";

import { useDate } from "./hooks/useDate";

import "./App.css";

function App() {
  // to navigate months, 0 is current, -1 for prev, +1 for next
  const [currentMonth, setCurrentMonth] = useState(0);
  // trigger day
  const [currentDay, setCurrentDay] = useState();
  // initalize appointments variables; will save to local storage
  const [appointments, setAppointments] = useState(
    localStorage.getItem("appointments")
      ? JSON.parse(localStorage.getItem("appointments"))
      : []
  );

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [viewAppointments, setViewAppointments] = useState(false);
  const [editMode, setEditMode] = useState(null);

  // update local storage when appointments change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const {days, dateDisplay} = useDate(appointments, currentMonth);

  const onSave = () => {
    console.log("saved appt");

    // editing
    if (editMode !== null) {
      let index = appointments.findIndex((a) => a.id === editMode);
      setAppointments(
        [
          ...appointments.slice(0, index),
          { id: editMode, title, date: currentDay, startTime, endTime },
          ...appointments.slice(index + 1),
        ].sort((a, b) => {
          let t1 = a.startTime.slice(0, 2);
          let t2 = b.startTime.slice(0, 2);

          return t1 > t2 ? 1 : -1;
        })
      );
      // regular save
    } else {
      setAppointments(
        [
          ...appointments,
          { id: Date.now(), title, date: currentDay, startTime, endTime },
        ].sort((a, b) => {
          let t1 = a.startTime.slice(0, 2);
          let t2 = b.startTime.slice(0, 2);

          return t1 > t2 ? 1 : -1;
        })
      );
    }

    setCurrentDay(null);
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
                  if (day.value !== "filler") {
                    setCurrentDay(day.date);
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      {currentDay && (
        <CreateAppointmentModal
          currentDay={currentDay}
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
            setCurrentDay(null);
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
          setCurrentDay={setCurrentDay}
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

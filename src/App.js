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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState('')
  const [viewAppointments, setViewAppointments] = useState(false);

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

  const deleteAppt = (id) => {
    let apptList = appointments.filter((a) => a.id !== id)
    setAppointments(apptList);
  }

  return (
    <>
      <div id="container">
        <div>
          <button onClick={() => setViewAppointments(true)}>
            My Appointments
          </button>
          <Header
            dateDisplay={dateDisplay}
            onNext={() => setCurrentMonth(currentMonth + 1)}
            onBack={() => setCurrentMonth(currentMonth - 1)}
          />
        </div>

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
          onSave={(title) => {
            console.log("saved appt");
            // not grabbing all appoinbtments
            setAppointments([
              ...appointments,
              { id: Date.now(), title, date: clicked, startTime, endTime },
            ]);
            setClicked(null);
            setStartTime("");
            setEndTime("");
          }}
        />
      )}

      {viewAppointments && (
        <AppointmentModal
          appointments={appointments}
          onClose={() => setViewAppointments(false)}
          onDelete={deleteAppt}
        />
      )}

      {/* {clicked && appointmentForDate(clicked) && (
        <DeleteAppointmentModal
          appointmentText={appointmentForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setAppointments(appointments.filter((a) => a.date !== clicked));
            setClicked(null);
          }}
        />
      )} */}
    </>
  );
}

export default App;

import React, { useState } from 'react';

import './appointmentModal.styles.css';

const AppointmentModal = ({appointments, onClose, onDelete, setTitle, setStartTime, setEndTime, setClicked, setViewAppointments, setEditMode }) => {
  return (
    <>
      <div id="newAppointmentModal">
        <h2>My Appointments</h2>
        {/* list of appts here */}
        {appointments.map((appt, idx) => {
          return (
            <div key={idx} className="appointment-container">
              <div id="appointment-name">
                {appt.title} @ {appt.startTime}
              </div>
              <button id="editButton" onClick={() => {
                setClicked(appt.date);
                setTitle(appt.title);
                setStartTime(appt.startTime);
                setEndTime(appt.endTime);
                setViewAppointments(false);
                setEditMode(appt.id);
              }}>Edit</button>
              <button id="deleteButton" onClick={() => onDelete(appt.id)}>Delete</button>
            </div>
          )
        })

        }
        <button id="deleteButton" onClick={onClose}>cancel</button>
      </div>

      <div id="modalBg"></div>
    </>
  )
}

export default AppointmentModal;

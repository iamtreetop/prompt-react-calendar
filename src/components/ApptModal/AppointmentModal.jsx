import React, { useState } from 'react';

import './appointmentModal.styles.css';

const AppointmentModal = ({appointments, onClose, onDelete}) => {
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
              <button id="editButton">Edit</button>
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

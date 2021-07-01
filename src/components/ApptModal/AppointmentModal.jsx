import React from 'react';

import { formatTime } from '../../utils/utils';

import './appointmentModal.styles.css';

const AppointmentModal = ({appointments, onClose, onDelete, setTitle, setStartTime, setEndTime, setClicked, setViewAppointments, setEditMode }) => {
  return (
    <>
      <div id="newAppointmentModal">
        <h2 id="appointment-title"><i>My Appointments</i></h2>
        {appointments.map((appt, idx) => {
          return (
            <div key={idx} className="appointment-container">
              <div id="appointment-info">
                {formatTime(appt.startTime)} - <b>{appt.title}</b>
              </div>
              <div id="button-container">
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
            </div>
          )
        })

        }
        <button id="deleteButton" onClick={onClose}>Cancel</button>
      </div>

      <div id="modalBg"></div>
    </>
  )
}

export default AppointmentModal;

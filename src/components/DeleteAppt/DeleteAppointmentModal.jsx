import React from 'react';

import './deleteAppointment.styles.css'

const DeleteAppointmentModal = ({ appointmentText, onDelete, onClose }) => {
  return (
    <>
      <div id="deleteAppointmentModal">
        <h2>Appointment</h2>
        <p id="appointmentText">{appointmentText}</p>
        <button onClick={onClose} id="closeButton">Close</button>
        <button onClick={onDelete} id="deleteButton">Delete</button>
      </div>

      <div id="modalBg"></div>
    </>
  )
}

export default DeleteAppointmentModal;
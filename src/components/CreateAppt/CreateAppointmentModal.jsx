import React, { useState } from 'react';

import './createAppointment.styles.css'

const CreateAppointmentModal = ({ onSave, onClose, appointments, startTime, setStartTime, endTime, setEndTime, currentDate, error, setError }) => {
  const [title, setTitle] = useState('');

  const checkAvailability = (startTime, endTime) => {
    let closeable = true;
    // filter for appointments on current date
    const filtered = appointments.filter((e) => e.date === currentDate)
    filtered.forEach((a) => {
      if (startTime <= a.endTime && endTime >= a.startTime) {
        setError("Appointment not available.  Try Again")
        closeable = false;
      }

      if (startTime >= endTime) {
        setError("Invalid Appointment.  Try Again")
        closeable = false;
      }
    })
    return closeable;
  }

  return (
    <>
      <div id="newAppointmentModal">
        <h2>New Appointment</h2>

        <input 
          id="appointmentTitleInput" 
          placeholder="Appointment Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Choose a time for your meeting:</label> 
        <br/>
        <input 
          type='time'
          id="appointmentTime"
          placeholder="Start Time" 
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        /> 

        <input 
          type='time'
          id="appointmentTime"
          placeholder="End Time" 
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        /> 
        <br/>
        <button 
          onClick={() => {
            if (checkAvailability(startTime, endTime)) {
              if (title) {
              onSave(title);
              setError('');
              }
            }
          }}
          id="saveButton">Save</button>
        <button 
          onClick={onClose}
          id="cancelButton">Cancel</button>

        <div id="error">{error}</div>
      </div>

      <div id="modalBg"></div>
    </>
  )
}
export default CreateAppointmentModal;

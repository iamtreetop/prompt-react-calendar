import React from 'react';

import './createAppointment.styles.css'

const CreateAppointmentModal = ({ onSave, onClose, appointments, startTime, setStartTime, endTime, setEndTime, currentDate, error, setError, title, setTitle }) => {

  const checkAvailability = (startTime, endTime) => {
    let closeable = true;
    // filter for appointments on current date
    const filtered = appointments.filter((e) => e.date === currentDate)
    filtered.forEach((a) => {
      if (startTime < a.endTime && endTime >= a.startTime) {
        setError("Appointment not available.  Try Again")
        closeable = false;
      }

      if (startTime >= endTime) {
        setError("Invalid Appointment.  Try Again")
        closeable = false;
      }

      if (startTime.length === 0 || endTime.length === 0) {
        setError("Invalid Times.  Try Again")
        closeable = false;
      }
    })
    return closeable;
  }

  return (
    <>
      <div id="newAppointmentModal">
        <h2><i>New Appointment</i></h2>

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

        <div id="error"><i>{error}</i></div>
      </div>

      <div id="modalBg"></div>
    </>
  )
}
export default CreateAppointmentModal;

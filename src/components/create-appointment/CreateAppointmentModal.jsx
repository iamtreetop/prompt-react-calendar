import React, { useState } from 'react';

import './create-appointment.style.css'

const CreateAppointmentModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);

  return (
    <>
      <div id="newAppointmentModal">
        <h2>New Appointment</h2>

        <input 
          id="appointmentTitleInput" 
          placeholder="Appointment Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button 
          onClick={() => {
            if (title) {
              onSave(title);
              setError(false);
            } else {
              setError(true);
            }
          }}
          id="saveButton">Save</button>
        <button 
          onClick={onClose}
          id="cancelButton">Cancel</button>
      </div>

      <div id="modalBg"></div>
    </>
  )
}
export default CreateAppointmentModal;

// src/components/Modal.js
import React from 'react';
import '../styles.css'

const Modal = ({ isOpen, onClose, steps }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="steps">
        <h2>{steps.length === 0 ? 'No Solution' : 'Steps'}</h2>
        {steps.length === 0 ? (
          <p>There seems to be no apparent solution to the problem. Please verify the entered data before pressing "solve."</p>
        ) : (
        <table>
          <thead>
            <tr className="title">
              <th>Step</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step, index) => (
              <tr key={index}>
                <td>{step.includes('SOLVED') ? 'SOLVED' : step}</td>
                <td>{step.includes('[') ? step.split('[')[1].split(']')[0] : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
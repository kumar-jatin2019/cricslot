import React from 'react';
import './GroundCard.css';

const GroundCard = ({ ground }) => {
  const { groundName, location, description, slots } = ground;

  return (
    <div className="ground-card">
      <div className="ground-card-header">
        <h2 className="ground-name">{groundName}</h2>
        <p className="ground-location">{location}</p>
      </div>
      <div className="ground-card-body">
        <p className="ground-description">{description}</p>
        <div className="slots-section">
          <h4>Available Slots</h4>
          <div className="slots">
            {slots.map((slot, index) => (
              <div key={index} className="slot">
                <div className="slot-details">
                  <span className="slot-time">{slot.startTime} - {slot.endTime}</span>
                  <p className="slot-name">Slot Name: {slot.slotName}</p>
                  <p className="slot-price">Price: ${slot.price}</p>
                  <p className="slot-status">Status: {!slot.isBooked ? 'Available' : 'Booked'}</p>
                </div>
                <button
                  className="book-button"
                  disabled={slot.isBooked} // Disable button if slot is booked
                  style={{
                    cursor: slot.isBooked ? 'not-allowed' : 'pointer',
                    opacity: slot.isBooked ? 0.5 : 1,
                  }} // Disable button if slot is booked
                >
                  Book Slot
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundCard;

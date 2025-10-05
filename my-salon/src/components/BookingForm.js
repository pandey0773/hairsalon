import React, { useState, useContext } from "react";
import { BookingContext } from "../context/BookingContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ selectedService, onBooked }) => {
  const { addBooking, user, bookings } = useContext(BookingContext);
  const [dateTime, setDateTime] = useState(null);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Allowed hours = salon working hours: 9 AM to 6 PM
  const filterTime = (time) => {
    const hour = time.getHours();
    return hour >= 9 && hour <= 18;
  };

  if (!selectedService) {
    return <p>Please select a service above.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dateTime) {
      setError("Please select date and time");
      return;
    }

    // Check in the past
    if (dateTime < new Date()) {
      setError("Cannot book in the past");
      return;
    }

    // Check for overlapping bookings (simple check)
    const serviceDurationMs = selectedService.duration * 60000; // min to ms
    const requestedStart = dateTime.getTime();
    const requestedEnd = requestedStart + serviceDurationMs;

    const isOverlap = bookings.some((b) => {
      if (b.status === "Cancelled") return false;
      if (b.date !== dateTime.toISOString().slice(0,10)) return false;
      
      const existingStart = new Date(b.date + "T" + b.time).getTime();
      const existingEnd = existingStart + b.duration * 60000;

      return (
        (requestedStart >= existingStart && requestedStart < existingEnd) ||
        (requestedEnd > existingStart && requestedEnd <= existingEnd) ||
        (requestedStart <= existingStart && requestedEnd >= existingEnd)
      );
    });

    if (isOverlap) {
      setError(
        "Selected time overlaps with an existing booking. Please choose another time."
      );
      return;
    }

    // All validations okay, save booking
    const newBooking = {
      id: Date.now(),
      user: user.username,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: dateTime.toISOString().slice(0, 10),
      time: dateTime.toTimeString().slice(0, 5),
      duration: selectedService.duration,
      price: selectedService.price,
      status: "Pending",
    };

    addBooking(newBooking);

    setSuccessMsg("Booking successful! Waiting for confirmation.");
    setError(null);
    setDateTime(null);
    if (onBooked) onBooked();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <h3>Booking for: {selectedService.name}</h3>
      <label>
        Choose Date & Time:
        <DatePicker
          selected={dateTime}
          onChange={(date) => setDateTime(date)}
          showTimeSelect
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          filterTime={filterTime}
          minDate={new Date()}
          placeholderText="Select Date and Time"
          required
          style={{ display: "block", marginTop: "0.5rem" }}
        />
      </label>
      <button type="submit" style={buttonStyle}>
        Book Now
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </form>
  );
};

const buttonStyle = {
  padding: "10px",
  marginTop: "10px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default BookingForm;
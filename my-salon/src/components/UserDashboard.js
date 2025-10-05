import React, { useState, useContext } from "react";
import ServiceList from "./ServiceList";
import BookingForm from "./BookingForm";
import { BookingContext } from "../context/BookingContext";

const UserDashboard = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { user } = useContext(BookingContext);

  if (!user || user.isAdmin) {
    return <p>Access denied. Please log in as a user.</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Welcome, {user.username}!</h2>
      <ServiceList onSelect={(service) => setSelectedService(service)} />
      <BookingForm selectedService={selectedService} />
    </div>
  );
};

export default UserDashboard;
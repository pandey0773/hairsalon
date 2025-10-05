import React, { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

const ServiceList = ({ onSelect }) => {
  const { SERVICES } = useContext(BookingContext);

  return (
    <div>
      <h3>Available Services</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {SERVICES.map((service) => (
          <li
            key={service.id}
            style={{
              border: "1px solid #ddd",
              marginBottom: 10,
              padding: 10,
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => onSelect(service)}
          >
            <h4>{service.name}</h4>
            <p>Duration: {service.duration} minutes</p>
            <p>Price: ${service.price}</p>
          </li>
        ))}
      </ul>
      <p style={{fontSize:"0.9em"}}>Click on a service to book it.</p>
    </div>
  );
};

export default ServiceList;
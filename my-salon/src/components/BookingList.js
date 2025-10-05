import React, { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

const BookingList = () => {
  const { bookings, updateBookingStatus, user } = useContext(BookingContext);

  if (!user || !user.isAdmin) {
    return <p>Access denied. Please log in as admin.</p>;
  }

  if (bookings.length === 0) {
    return <p>No bookings yet.</p>;
  }

  const handleChangeStatus = (id, status) => {
    updateBookingStatus(id, status);
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <h2>Admin Panel - Bookings</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Duration (min)</th>
            <th>Price ($)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} style={b.status === "Cancelled" ? { backgroundColor: "#fdd" } : {}}>
              <td>{b.id}</td>
              <td>{b.user}</td>
              <td>{b.serviceName}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.duration}</td>
              <td>{b.price}</td>
              <td>{b.status}</td>
              <td>
                {b.status !== "Confirmed" && b.status !== "Cancelled" && (
                  <>
                    <button onClick={() => handleChangeStatus(b.id, "Confirmed")} style={btnConfirm}>
                      Confirm
                    </button>
                    <button onClick={() => handleChangeStatus(b.id, "Cancelled")} style={btnCancel}>
                      Cancel
                    </button>
                  </>
                )}
                {(b.status === "Confirmed" || b.status === "Cancelled") && (
                  <span>--</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const btnConfirm = {
  padding: "5px 8px",
  marginRight: "6px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const btnCancel = {
  padding: "5px 8px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default BookingList;
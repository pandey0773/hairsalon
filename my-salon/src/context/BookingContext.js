import React, { createContext, useState, useEffect } from "react";

// Define some hair salon services
const SERVICES = [
  { id: 1, name: "Haircut", duration: 30, price: 20 },
  { id: 2, name: "Hair Coloring", duration: 60, price: 80 },
  { id: 3, name: "Beard Trim", duration: 15, price: 15 },
  { id: 4, name: "Shampoo & Blowdry", duration: 45, price: 35 },
];

// Authentication: simple admin user and normal user (guest)
const USERS = {
  admin: { username: "admin", password: "admin123", isAdmin: true },
};

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Store user login state
  const [user, setUser] = useState(null);
  // Store bookings in array form
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist bookings changes to localStorage
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Login function
  const login = (username, password) => {
    if (username === USERS.admin.username && password === USERS.admin.password) {
      setUser({ username, isAdmin: true });
      return { success: true };
    }
    // For simplicity assume guest user;
    if (username.trim() !== "") {
      setUser({ username, isAdmin: false });
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Add booking
  // booking = { id, user, serviceId, serviceName, date, time, duration, price, status }
  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  // Update booking status by booking id
  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  return (
    <BookingContext.Provider
      value={{
        user,
        login,
        logout,
        bookings,
        addBooking,
        updateBookingStatus,
        SERVICES,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
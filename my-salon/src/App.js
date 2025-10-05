import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import BookingList from "./components/BookingList";

function App() {
  return (
    <BookingProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<BookingList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

const Home = () => (
  <div style={{ textAlign: "center", marginTop: "5rem" }}>
    <h1>Welcome to the Hair Salon Booking App</h1>
    <p>Please login to book or manage bookings.</p>
  </div>
);

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "5rem" }}>
    <h2>404 - Page Not Found</h2>
  </div>
);

export default App;
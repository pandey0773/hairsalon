import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";

const Navbar = () => {
  const { user, logout } = useContext(BookingContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>
        Hair Salon Booking
      </Link>
      <div>
        {!user ? (
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        ) : (
          <>
            {!user.isAdmin && (
              <Link to="/user" style={styles.link}>
                Book Service
              </Link>
            )}
            {user.isAdmin && (
              <Link to="/admin" style={styles.link}>
                Admin Panel
              </Link>
            )}
            <button onClick={handleLogout} style={styles.button}>
              Logout ({user.username})
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: "10px 20px",
    backgroundColor: "#222",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    color: "#fff",
    marginRight: 15,
    textDecoration: "none",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "red",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Navbar;
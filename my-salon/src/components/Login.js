import React, { useContext, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login, user } = useContext(BookingContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username.trim(), password);
    if (result.success) {
      if (username === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      setError(result.message);
    }
  };

  if (user) {
    navigate(user.isAdmin ? "/admin" : "/user");
    return null;
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          Username:
          <input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            placeholder='For admin: "admin"'
          />
        </label>
        <label>
          Password:
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder='For admin: "admin123"'
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
      <p style={{fontSize:"0.9em"}}>
        For guest users, just enter any username and password.
      </p>
    </div>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "4px",
  boxSizing: "border-box"
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "darkblue",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default Login;
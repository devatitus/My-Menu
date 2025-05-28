import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import "../styles/styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || {};

    let userEntry = Object.values(users).find(
      (u) => u.email === email && u.password === password
    );

    if (!userEntry) {
      try {
        const response = await fetch("/users.json");
        const userList = await response.json();
        userEntry = userList.find(
          (u) => u.email === email && u.password === password
        );
        if (userEntry) {
          users[userEntry.username] = userEntry;
          localStorage.setItem("users", JSON.stringify(users));
        }
      } catch (error) {
        console.error("Failed to fetch user.json:", error);
      }
    }

    if (userEntry) {
      localStorage.setItem("currentUser", userEntry.username);
      alert("Login successful!");
      navigate(`/profile/${userEntry.username}`);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <meta name="theme-color" content="rgb(235, 232, 220)" />
      <img src={logo} alt="My Menu Logo" className="logo" />
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <div className="signup-box">
        <form onSubmit={handleLogin}>
          <div className="input-groups">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" " // Keep empty to show floating label
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-groups">
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit">Log in</button>
        </form>
        <div className="signup">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

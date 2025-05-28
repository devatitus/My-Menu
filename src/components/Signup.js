import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import logo from "../assets/logo.webp";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, username, password, confirmPassword } = formData;

    if (!fullName || !email || !username || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
      setError("Username already exists!");
      return;
    }

    const emailExists = Object.values(users).some(
      (user) => user.email === email
    );
    if (emailExists) {
      setError("Email already registered!");
      return;
    }

    users[username] = {
      fullName,
      email,
      username,
      password,
      profile: "https://placehold.co/120x120",
      background: "https://placehold.co/600x300",
      availability: "10:00 AM - 12:00 PM",
      location: "",
    };

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", username);

    navigate(`/register/${encodeURIComponent(username)}`);
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="My Menu Logo" className="logo" />
      <h2>Create an Account</h2>
      {error && <p className="error">{error}</p>}
      <div className="signup-box">
        <form onSubmit={handleSubmit}>
          {["fullName", "email", "username", "password", "confirmPassword"].map((field) => (
            <div className="input-groupss" key={field}>
              <input
                type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor={field}>
                {field === "fullName"
                  ? "Full Name"
                  : field === "email"
                  ? "Email"
                  : field === "username"
                  ? "Business name"
                  : field === "password"
                  ? "Password"
                  : "Confirm Password"}
              </label>
            </div>
          ))}
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

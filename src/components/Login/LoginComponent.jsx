import React, { useState } from "react";
import { motion } from "framer-motion";
import "./LoginStyle.css";
import loginVideo from "./videos/login_video.mp4";
import axios from "axios"; // Import Axios

export const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle errors
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const response = await axios.get(
        "http://localhost:8080/brewedbrilliance/login",
        {
          params: {
            email: email,
            password: password,
          },
        }
      );

      // Handle successful response
      console.log(response.data); // Log the response data

      // Reset error state upon successful login
      setError("");

      // Show the modal only if login is successful
      setShowModal(true);

      // Redirect user to home page after a delay
      setTimeout(() => {
        setShowModal(false); // Close the modal
        window.location.href = "/home"; // Redirect user to home page
      }, 1000); // Change the delay time as needed
    } catch (error) {
      // Handle error
      setError(error.response.data); // Set error message received from backend
      console.error("Error:", error.response.data); // Log the error message
    }
  };

  return (
    <div className="login-page">
      <video className="login-video" autoPlay loop muted>
        <source src={loginVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <motion.div
        className="login-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.form
          className="login-form"
          onSubmit={handleSubmit}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <h2>"Welcome to Brewed Brilliance Café!"</h2>
          <motion.input
            type="text"
            placeholder="Username"
            value={email}
            onChange={handleUsernameChange}
            required
            whileFocus={{ scale: 1.05 }}
          />
          <div className="password-container">
            <motion.input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              whileFocus={{ scale: 1.05 }}
            />
            <span
              className="password-toggle-login"
              onClick={handleTogglePassword}
            >
              {showPassword ? "👁️" : "🔒"}
            </span>
          </div>
          <motion.button
            type="submit"
            className="coffee-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
          <p>{error && <span className="error">{error}</span>}</p>{" "}
          {/* Display error message */}
          <h4>
            Don't have an account? <a href="/signup">Sign Up</a>
          </h4>
        </motion.form>
      </motion.div>
      {/* Modal for showing "Logging in..." message */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">Logging in...</div>
        </div>
      )}
    </div>
  );
};

import { motion } from "framer-motion";
import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import signupVideo from "./videos/signup_video.mp4";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  //for displaying response from backend
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Incorrect password entered.");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/brewedbrilliance/signup",
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }
        );
        console.log(response); // Log the response object to inspect its contents
        // Show success message with animation
        setShowAlert(true);
        setAlertMessage(response.data); // Set the alert message from response data
        setTimeout(() => {
          setShowAlert(false);
          setAlertMessage("");
        }, 3000);
      } catch (error) {
        console.error(error); // Log any error for debugging
        // Show error message with animation
        setShowError(true);
        setErrorMessage(error.response.data); // Set the error message from response data
        setTimeout(() => {
          setShowError(false);
          setErrorMessage("");
        }, 3000);
      }
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="signup-page">
        <video className="signup-video" autoPlay loop muted>
          <source src={signupVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <motion.div
          className="signup-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }} // Adjust duration for a smooth transition
        >
          <h2>Create User</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div>
              <label>First Name:</label>
              <motion.input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <motion.input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <div>
              <label>Email:</label>
              <motion.input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <div>
              <label>Password:</label>
              <motion.div className="password-input-container">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
                <motion.span
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "👁️" : "🔒"}
                </motion.span>
              </motion.div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <motion.input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </div>
      {/* Alert container */}
      <motion.div
        className="alert-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: showAlert || showError ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {showAlert && (
          <motion.div
            className="alert alert-success"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            {alertMessage}
          </motion.div>
        )}
        {showError && (
          <motion.div
            className="alert alert-danger"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

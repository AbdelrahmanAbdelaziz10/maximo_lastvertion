import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "../../Style/Singup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    country: " ",
    upline: "",
    password: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Add validation logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
    // console.log(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <div className="signup-links">
          <Link to="/">Sign In</Link>
          <Link to="/signup" className="active">
            Sign Up
          </Link>
          <Link to="/password-recovery">Password recovery</Link>
        </div>

        <div className="brand-title">
          <h1>Sign Up</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label>User Name</label>
          <div className="input-field">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="your Name"
            />
          </div>

        </div>

        <div className="input-group">
          <label>Email</label>
          <div className="input-field">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              name="email"
                autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </div>

        </div>
        {/* Country input */}

        {/* <div className="input-group">
          <label>Country</label>
          <div className="input-field">
            <FontAwesomeIcon icon={faGlobe} className="input-icon" />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option> */}
              {/* Add more countries as needed */}
            {/* </select>
          </div>
          {errors.country && (
            <span className="error-message">{errors.country}</span>
          )}
        </div> */}
        {/* password input */}
        <div className="input-group">
          <label>Password</label>
          <div className="input-field password-field">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

        </div>
                {/* password input */}
        <div className="input-group">
          <label>Password</label>
          <div className="input-field password-field">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Confirm password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

        </div>
        {/* Check Box */}
        <div className="terms-check">
          <input
            type="checkbox"
            id="termsCheck"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <label htmlFor="termsCheck">
            I agree to Ultimate Trade Terms of use
          </label>
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      <div className="welcome-message">
        <p>Do you have already account?<Link to='/login'>
        Sing Up Now
        </Link> </p>
      </div>
    </div>
  );
};

export default SignUp;

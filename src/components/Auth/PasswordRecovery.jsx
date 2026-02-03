import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../Style/PasswordRecovery.css";

const PasswordRecovery = () => {
  const [email, setEmail] = useState();
  // const [isRobot, setIsRobot] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ email });
    alert(`Password recovery link sent to ${email}`);
    // Add your password recovery logic here
  };

  return (
    <div className="recovery-container">
      <div className="recovery-header">


        <div className="recovery-links">
          <Link to="/">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/password-recovery" className="active">
            Password recovery
          </Link>
        </div>
      </div>

      <div className="recovery-title">
        <h3>Password recovery</h3>
      </div>

      <form onSubmit={handleSubmit} className="recovery-form">
        <div className="input-group">
          <label>Email</label>
          <div className="input-field">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
                autoComplete="off"
              placeholder="example@gmail.com"
            />
          </div>
        </div>
{/* 
        <div className="robot-check">
          <input
            type="checkbox"
            id="robotCheck"
            checked={isRobot}
            onChange={() => setIsRobot(!isRobot)}
            required
          />
          <label htmlFor="robotCheck">I'm not a robot</label>
        </div> */}

        <div className="terms-check">
          <input
            type="checkbox"
            id="termsCheck"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
            required
          />
          <label htmlFor="termsCheck">
            I agree to Ultimate Trade Terms of use
          </label>
        </div>

        <button type="submit" className="recovery-button">
          Recover
        </button>
      </form>

      {/* <div className="back-to-login">
        <Link to="/login">← Back to Sign In</Link>
      </div> */}
    </div>
  );
};

export default PasswordRecovery;
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "../../Style/login.css";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { userData, isAuthenticated, login } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!agreeTerms) {
    //   alert("You must agree to the terms of use");
    //   return;
    // }

    setIsLoading(true);
    setError(null);

    try {
      // const apiUrl = `/maximo/maxrest/oslc/os/PORTALUSER?lean=1&oslc.select=*&oslc.where=user.LOGINID="${userName}"&_lid=${userName}&_lpwd=${password}`;
      // const apiUrl = `http://192.168.0.73:9080/maxrest/oslc/os/PORTALUSER?lean=1&oslc.select=*&oslc.where=user.LOGINID="${userName}"&_lid=${userName}&_lpwd=${password}`;
      // const apiUrl=`http://192.168.0.51:9080/maximo/oslc/LOGIN?_lid=${userName}&_lpwd=${password}`;
          //  const apiUrl=`http://192.168.0.73:9080/maximo/oslc/LOGIN?_lid=${userName}&_lpwd=${password}`;

   const apiUrl = `http://192.168.0.73:9080/maxrest/oslc/os/PORTALUSER?lean=1&oslc.select=*&oslc.where=LOGINID="${encodeURIComponent(userName)}"`;

const response = await fetch(apiUrl, {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa(`${userName}:${password}`),
    "Accept": "application/json"
  },
  credentials: "include"
});


      if (!response.ok) {
        localStorage.removeItem("userData");
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      const user = data?.member?.[0];
  setAgreeTerms(user)


      if (user) {
        login(user, userName, password); // Pass username and password to context
        navigate("/dashboard", { replace: true });
      } else {
        // ❌ لو مفهوش يوزر امسح القديم
        localStorage.removeItem("userData");
        throw new Error("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
      // console.log("user data:",agreeTerms)

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-links">
          <Link to="/login" className="active">
            Sign In
          </Link>
        </div>
        <div className="brand-title">
          <h1>Sign In</h1>
        </div>
        {error && <p className="error-message">❌ {error}</p>}
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Username</label>
          <div className="input-field">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="your username"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-field">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="*******"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        <div className="robot-check">
          <Link to="/password-recovery" className="forgot-password">
            Forgot password?
          </Link>
        </div>

        {/* <div className="terms-check">
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
        </div> */}

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="welcome-message">
        <p>Welcome to the Universal Trading digital wallet</p>
      </div>
    </div>
  );
};

export default Login;

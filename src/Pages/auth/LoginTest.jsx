import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
// import "../../Style/login.css";
import { useAuth } from "../../components/Context/AuthContext";
import { useLocation } from "react-router-dom";
// import Snowfall from "react-snowfall";
import { Container, Row, Col } from "react-bootstrap";
import "../../Style/login.css";
const LoginPage = () => {
  const { login } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/dashboard";
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("UserInfo");
    if (stored) {
      const info = JSON.parse(stored);
      setUserName(info.username || "");
      setPassword(info.password || "");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const username = userName.trim();
    const passwordClean = password.trim();

    try {
      // 1️⃣ Login → ينشئ session
      const loginRes = await fetch(
        `http://192.168.0.73:9080/maximo/oslc/LOGIN?_lid=${encodeURIComponent(
          username
        )}&_lpwd=${encodeURIComponent(passwordClean)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!loginRes.ok) {
        throw new Error("Invalid username or password 1");
      }

      // 2️⃣ whoami → جلب بيانات المستخدم الحقيقي
      const whoamiRes = await fetch(
        "http://192.168.0.73:9080/maximo/oslc/whoami",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!whoamiRes.ok) {
        throw new Error("Login failed whoamiRes 2");
      }

      const whoami = await whoamiRes.json();
      // console.log("whoami:", whoami);

      if (!whoami?.loginUserName) {
        throw new Error("Login failed whoami?.loginUserName 3 ");
      }

      // 3️⃣ سجل الدخول
      login(whoami);

      localStorage.setItem(
        "UserInfo",
        JSON.stringify({
          // username: whoami.loginUserName, // الاسم الحقيقي من
          username: username,
          password: passwordClean,
          userData: whoami,
        })
      );

      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password catch 4");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="Register login-page-container d-flex ">
      <Container className="login-container">
        <Row className="justify-content-start align-items-center w-100">
          <Col xs={12} sm={12} md={8} lg={5} xl={5}>
            <div className="login-content">
              {/* <Snowfall color="#82C3D9" /> */}
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>

                <div className="robot-check">
                  <Link to="/password-recovery" className="forgot-password">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="welcome-message">
                <p>Welcome to the Universal Trading digital wallet</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;

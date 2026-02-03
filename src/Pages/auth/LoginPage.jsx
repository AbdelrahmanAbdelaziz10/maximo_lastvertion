import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Login from "../components/Auth/Login";
import LoginTest from "./LoginTest";
import "../Style/login.css";

const LoginPage = () => {
  return (
    <div className="Register login-page-container d-flex ">
      <Container className="login-container">
        <Row className="justify-content-start align-items-center w-100">
          <Col xs={12} sm={12} md={8} lg={5} xl={5}>
            {/* <Login /> */}
            <LoginTest />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;

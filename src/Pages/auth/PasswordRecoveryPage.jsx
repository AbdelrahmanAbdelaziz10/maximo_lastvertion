import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PasswordRecovery from '../../components/Auth/PasswordRecovery'

const PasswordRecoveryPage = () => {
  return (
    <div className="Register login-page-container d-flex min-vh-100">
      <Container className="my-auto">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={5} className="my-auto">
            <PasswordRecovery />
          </Col>
          <Col xs={12} md={7} className="d-none d-md-block">
            {/* Right column content (image, etc) goes here */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PasswordRecoveryPage

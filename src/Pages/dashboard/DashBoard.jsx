import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Box, Typography } from "@mui/material";

import DashboardCard from "../../components/Common/Card";
import ContactsCard from "../../components/Common/ContactsCard";
import WorkOrderBarChart from "../../components/Common/Chart/WorkOrderBarChart";
import WorkFlowView from "../../components/WorkFlowView";

import "../../Style/Dashboard.css";

export function DashBoard() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Container fluid className="dashboard-page p-0">
      {/* Header */}
      <Row className="mb-3 mt-3">
        <Col>
          <Typography variant="h5" fontWeight="bold">
            Welcome back 👋
          </Typography>
        </Col>
      </Row>

      {/* ======================= STAT CARDS ======================= */}

      <Row className="g-3">
        <Col xs={12} sm={6} md={3}>
          <DashboardCard
            title="Service Request"
            value="550"
            change="20%"
            footerText="20 Service Request Today"
            positiveChange
          />
        </Col>

        <Col xs={12} sm={6} md={3}>
          <DashboardCard
            title="All Work Order"
            value="1050"
            change="30%"
            footerText="600 Total Work Order Today"
          />
        </Col>

        <Col xs={12} sm={6} md={3}>
          <DashboardCard
            title="Pending Work Order"
            value="150"
            change="10%"
            footerText="20 Pending Work Order Today"
          />
        </Col>

        <Col xs={12} sm={6} md={3}>
          <DashboardCard
            title="Close Work Order"
            value="900"
            change="30%"
            footerText="300 Closed Work Order Today"
            positiveChange
          />
        </Col>
      </Row>

      {/* =======================
          CHARTS & CONTACTS
      ======================= */}
      <Row className="g-3 mt-3">
        <Col xs={12} md={7}>
          <Box className="chart-main-card">
            <Typography variant="h6" className="card-title mb-2">
              Work Order Status Overview
            </Typography>
            <WorkOrderBarChart />
          </Box>
        </Col>

        <Col xs={12} md={5}>
          <ContactsCard />
        </Col>
      </Row>

      {/* =======================
          WORK FLOW MODAL
      ======================= */}
      <WorkFlowView
        open={open}
        onClose={() => setOpen(false)}
        item={selectedItem}
      />
    </Container>
  );
}

export default DashBoard;

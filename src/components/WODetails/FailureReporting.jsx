import { Box, Card, CardContent, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SpecificationsTable from "../ServesDetailsCom/SpecificationsTable";
import AnimatedSection from "../ServesDetailsCom/AnimatedSection";
import SRUserInfo from "../ServesDetailsCom/SRUserInfo";
import FailureCode from "./FailureCode";

const FailureReporting = ({RowDataSr}) => {
 const [serviceRequestDetails, setServiceRequestDetails] = useState(true);

  const toggleSRD = () => setServiceRequestDetails((prev) => !prev);

      // Info arrays
  const ServiceRequestDetails = [
    { label: "Failure Class", Value:" ", Key: 1 },
    {
      label: "Failed Date",
      Value: " ",
      Key: 2,
    }
  ];
  const ServiceRequestDetails2 = [
    { label: "Remarks", Value: " ", Key: 1 }, // Not Found attribute
    { label: "Remark Date", Value: " ", Key: 2 }, // Not Found attribute
    
  ];
  return (
    <>
      {/* ===== Header Section ===== */}
      <Card
        sx={{
          marginBottom: 5,
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
        }}
      >
        <CardContent>
          <Row className="g-2 justify-content-around mb-4">
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Work Order:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.ticketid}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.description || " "}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Site:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.siteid}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Status:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.status || " "}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
            </Row>
        </CardContent>
      </Card>
      {/* ===== Section 1: Work Order Details ===== */}

      <AnimatedSection
        title="Failure Details"
        isOpen={serviceRequestDetails}
        onToggle={toggleSRD}
      >
        <Row className="px-4 stats-section justify-content-center">
          <Col xs={12} md={6}>
            <SRUserInfo UserInformation={ServiceRequestDetails} />
          </Col>
          <Col xs={12} md={6}>
            <SRUserInfo UserInformation={ServiceRequestDetails2} />
          </Col>
        </Row>
      </AnimatedSection>
            {/* ===== Section 2:  Work Order Details ===== */}

        <Row className="stats-section justify-content-center">
            <FailureCode />
          
        </Row>
    </>
  );
};

export default FailureReporting

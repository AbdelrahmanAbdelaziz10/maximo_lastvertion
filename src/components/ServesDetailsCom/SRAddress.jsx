import { Box, Card, CardContent, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import AnimatedSection from "./AnimatedSection";
import SRUserInfo from "./SRUserInfo";

const SRAddress = ({RowDataSr}) => {
      const [serviceRequestDetails, setServiceRequestDetails] = useState(true);

      const toggleSRD = () => setServiceRequestDetails((prev) => !prev);


      // Info arrays
  const ServiceRequestDetails = [
    { label: "Service Adress", Value:" ", Key: 1 },
    {
      label: "Formatted Address",
      Value: " ",
      Key: 2,
    },
    { label: "Street Address", Value: " ", Key: 3 },
    { label: "Address Line 2", Value: " ", Key: 4 },
    { label: "Address Line 3", Value: " ", Key: 5 },
    {
      label: "City",
      Value: " ",
      Key: 6,
    },
    { label: "Region/District", Value: " ", Key: 7 }, // Not Found attribute
    { label: "County", Value: " ", Key: 8 },
      { label: "State/Province", Value: " ", Key: 9 },
    { label: "Zip/Postal Code", Value: " ", Key: 10 },
    { label: "Country", Value: " ", Key: 11 },
    {
      label: "GEO Code",
      Value: " ",
      Key: 12,
    },
    { label: "Time Zone", Value: " ", Key: 13 }, // Not Found attribute
  ];
  const ServiceRequestDetails2 = [
    { label: "Latitude(Y)", Value: " ", Key: 1 }, // Not Found attribute
    { label: "Longitude(X)", Value: " ", Key: 2 }, // Not Found attribute
    { label: "Reference Point", Value: " ", Key: 3 },
    { label: "Directions", Value: " ", Key: 4 , type: " textbox",},
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
            <Row className="g-3 justify-content-around">
              <Col xs={12} md={6} lg={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography sx={{ fontWeight: 500,fontSize:"15px", color: "text.secondary" }}>
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
              <Col xs={12} md={6} lg={3}>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Typography sx={{ fontWeight: 500,fontSize:"15px", color: "text.secondary" }}>
                   Organization:
                  </Typography>
                  <Input
                    fullWidth
                    value={RowDataSr[0]?.orgid || " "}
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
                  <Typography sx={{ fontWeight: 500,fontSize:"15px", color: "text.secondary" }}>
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
            </Row>
          </CardContent>
        </Card>
    {/* ===== Section 1: Service Request Details ===== */}
      <AnimatedSection
        title="Address Information"
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

    </>
  );
}

export default SRAddress

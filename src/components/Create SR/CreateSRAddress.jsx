import { Box, Card, CardContent, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import AnimatedSection from "../ServesDetailsCom/AnimatedSection";
import SRUserInfo from "../ServesDetailsCom/SRUserInfo";
import CreateSRUserInfo from "./CreateSRUserInfo";
import config from "../../../Data/config.json";

const CreateSRAddress = () => {
  const [serviceRequestDetails, setServiceRequestDetails] = useState(true);
  const toggleSRD = () => setServiceRequestDetails((prev) => !prev);



  return (
    <>
      <Card
        sx={{
          mb: 5,
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
        }}
      >
        <CardContent>
          <Row className="g-3 justify-content-around">
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Service Request:
                </Typography>
                <Input
                  fullWidth
                  readOnly
                  sx={{
                    flex: 1,
                    pl: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Input
                  fullWidth
                  sx={{
                    flex: 1,
                    pl: 1,
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
                  Organization:
                </Typography>
                <Input
                  fullWidth
                  sx={{
                    flex: 1,
                    pl: 1,
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
                  sx={{
                    flex: 1,
                    pl: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
          </Row>
        </CardContent>
      </Card>

      <AnimatedSection
        title="Address Information"
        isOpen={serviceRequestDetails}
        onToggle={toggleSRD}
      >
        <Row className="px-4 stats-section justify-content-center">
          <Col xs={12} md={6}>
            <CreateSRUserInfo UserInformation={config?.ServiceAddress?.left} />
          </Col>
          <Col xs={12} md={6}>
            <CreateSRUserInfo UserInformation={config?.ServiceAddress?.right} />
          </Col>
        </Row>
      </AnimatedSection>
    </>
  );
};

export default CreateSRAddress;

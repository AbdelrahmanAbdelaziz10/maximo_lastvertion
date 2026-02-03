import { Box, Card, CardContent, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SpecificationsTable from "../ServesDetailsCom/SpecificationsTable";
import config from "../../../Data/config.json";

const CreateSRSpecifications = () => {

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
                  Service Request:
                </Typography>
                <Input
                  fullWidth
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
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
          </Row>
          <Row className="g-5 flex-row justify-content-between">
            <Col xs={12} md={6} lg={6}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Classification:
                </Typography>
                <Input
                  fullWidth
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Class Description:
                </Typography>
                <Input
                  fullWidth
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

      <Row className="stats-section justify-content-center">
        <SpecificationsTable Title ={"Specifications"} data={config?.SpecificationsTableData} />
      </Row>
    </>
  );
};
export default CreateSRSpecifications;

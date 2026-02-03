import { Box, CardContent, Input, Typography } from "@mui/material";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentsComp from "./AssignmentsComp";

const Assignment = ({ RowDataSr }) => {
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
          <Row className="g-5 flex-row justify-content-between">
            <Col xs={12} md={3} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Parent WO:
                </Typography>
                <Input
                  fullWidth
                  value=" "
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
            <Col xs={12} md={7} lg={7} className="d-flex gap-3 mx-2">
              <Col md={6} className="d-flex flex-column gap-3">
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "text.secondary",
                    }}
                  >
                    Scheduled Start:
                  </Typography>
                  <Input
                    fullWidth
                    value=" "
                    readOnly
                    sx={{
                      flex: 1,
                      paddingLeft: 1,
                      borderBottom: "1px dotted #999",
                    }}
                  />
                  <CalendarMonthIcon
                    sx={{ color: "#555", cursor: "pointer", fontSize: 20 }}
                  />
                </Box>

                <Box display="flex" alignItems="center" gap={1.5}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "text.secondary",
                    }}
                  >
                    Scheduled Finish:
                  </Typography>
                  <Input
                    fullWidth
                    value=" "
                    readOnly
                    sx={{
                      flex: 1,
                      paddingLeft: 1,
                      borderBottom: "1px dotted #999",
                    }}
                  />
                  <CalendarMonthIcon
                    sx={{ color: "#555", cursor: "pointer", fontSize: 20 }}
                  />
                </Box>
              </Col>

              <Col md={6} className="d-flex flex-column gap-3">
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "text.secondary",
                    }}
                  >
                    Target Start:
                  </Typography>
                  <Input
                    fullWidth
                    value=" "
                    readOnly
                    sx={{
                      flex: 1,
                      paddingLeft: 1,
                      borderBottom: "1px dotted #999",
                    }}
                  />
                  <CalendarMonthIcon
                    sx={{ color: "#555", cursor: "pointer", fontSize: 20 }}
                  />
                </Box>

                <Box display="flex" alignItems="center" gap={1.5}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "text.secondary",
                    }}
                  >
                    Target Finish:
                  </Typography>
                  <Input
                    fullWidth
                    value=" "
                    readOnly
                    sx={{
                      flex: 1,
                      paddingLeft: 1,
                      borderBottom: "1px dotted #999",
                    }}
                  />
                  <CalendarMonthIcon
                    sx={{ color: "#555", cursor: "pointer", fontSize: 20 }}
                  />
                </Box>
              </Col>
            </Col>
          </Row>
        </CardContent>
      </Card>

            {/* ===== Section 1: Work Order Details ===== */}
            <AssignmentsComp Title={"Assignments"} />

    </>
  );
};

export default Assignment;

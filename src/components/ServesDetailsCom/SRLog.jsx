import { Box, Card, CardContent, Input, Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import SRWorkLog from "./SRWorkLog";

const SRLog = ({ RowDataSr }) => {
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
          <Row className="g-2 justify-content-around ">
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography className="input-text">Service Request:</Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.ticketid}
                  readOnly
                  disableUnderline
                  className="input-general"
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.description || " "}
                  readOnly
                  disableUnderline
                  className="input-general"
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Site:</Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.siteid}
                  readOnly
                  disableUnderline
                  className="input-general"
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Status:</Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.status || " "}
                  readOnly
                  disableUnderline
                  className="input-general"
                />
              </Box>
            </Col>
          </Row>
        </CardContent>
      </Card>
      {/* ===== Section 1: Service Request Details ===== */}
      <SRWorkLog />
    </>
  );
};

export default SRLog;

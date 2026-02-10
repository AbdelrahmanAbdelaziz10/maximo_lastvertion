import { Box, Card, CardContent, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SRRelatedTickets from "./SRRelatedTickets";
import SRRelatedWO from "./SRRelatedWO";
import { useFetch } from "../../hooks/getFetch";

const SRRelatedRecords = ({ RowDataSr, Id }) => {
  const { data } = useFetch(
    `http://192.168.0.73:9080/maxrest/oslc/os/PORTALRELATEDRECORD?lean=1&oslc.select=*&oslc.where=relatedreckey="${Id}"&_lid=maxadmin&_lpwd=maxadmin`,
  );

  const [relatedWO, setRelatedWO] = useState(null);

  useEffect(() => {
    if (data && data.member && data.member.length > 0) {
      setRelatedWO(data.member[0]);
    }
  }, [data]);

  // console.log("relatedWO:", relatedWO);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      {/* ===== Header Section ===== */}
      <Card
        sx={{
          marginBottom: 2,
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
        }}
      >
        <CardContent>
          <Row className="g-3 justify-content-around">
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

      {/* ===== Section: Related Tickets ===== */}
      {/* <SRRelatedTickets /> */}

      {/* ===== Section: Related Work Orders ===== */}
      <SRRelatedWO relatedData={relatedWO} />
    </>
  );
};

export default SRRelatedRecords;

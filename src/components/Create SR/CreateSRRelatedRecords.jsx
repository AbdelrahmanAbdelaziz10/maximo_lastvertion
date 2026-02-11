import { Box, Card, CardContent, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SRRelatedTickets from "../ServesDetailsCom/SRRelatedTickets";
import SRRelatedWO from "../ServesDetailsCom/SRRelatedWO";
import CreateSRRelatedWO from "./CreateSRRelatedWO";

const CreateSRRelatedRecords = () => {
  // const { data } = useFetch(
  //   `http://192.168.0.73:9080/maxrest/oslc/os/PORTALRELATEDRECORD?lean=1&oslc.select=*&oslc.where=relatedreckey="${Id}"&_lid=maxadmin&_lpwd=maxadmin`,
  // );
    const [relatedWO, setRelatedWO] = useState(null);
  
    // useEffect(() => {
    //   if (data && data.member && data.member.length > 0) {
    //     setRelatedWO(data.member[0]);
    //   }
    // }, [data]);
  
    // // console.log("relatedWO:", relatedWO);
  
    // if (!data) return <p>Loading...</p>;
  
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
        </CardContent>
      </Card>
      {/* ===== Section 1: Related Tickets ===== */}
      {/* <SRRelatedTickets  /> */}
      {/* ===== Section 1: Related Work Orders ===== */}
      <Row className="mb-2">
      {/* <CreateSRRelatedWO /> */}
      <SRRelatedWO relatedData={relatedWO} />

      </Row>
    </>
  )
}

export default CreateSRRelatedRecords

import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Box,
  Typography,
  Input,
  CardContent,
  Card,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import AnimatedSection from "../ServesDetailsCom/AnimatedSection";
import CreateAttachment from "./CreateAttachment";
import config from "../../../Data/config.json";

const CreateSRTable = ({ RowDataSr, formData, setFormData }) => {
  // ====== State ======

  const [sections, setSections] = useState({
    serviceRequestDetails: true,
    userInfo: true,
    dates: true,
    attachments: true,
  });

  // console.log("data2:",formData)

  // ====== Handlers ======
  const toggleSection = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange2 = (files) => {
    // console.log("Files uploaded:", files);
  };
  // ====== Handle All Inputs (With formKey Support) ======
  const handleSmartInputChange = (item, value) => {
    const realKey = item.formKey || item.key;

    setFormData((prev) => ({
      ...prev,
      [realKey]: value,
    }));
  };

  // ====== UI ======
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
                  value={RowDataSr?.[0]?.ticketid || ""}
                  className="input-general"
                  disableUnderline
                />
              </Box>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Owner:</Typography>
                <Input
                  fullWidth
                  value={formData.OWNER}
                  onChange={(e) => handleChange("OWNER", e.target.value)}
                  className="input-general"
                  disableUnderline
                />
              </Box>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Owner Group:</Typography>
                <Input
                  fullWidth
                  value={formData.ownerGroup}
                  onChange={(e) => handleChange("ownerGroup", e.target.value)}
                  className="input-general"
                  disableUnderline
                />
              </Box>
            </Col>

            <Col xs={12} md={6} lg={2}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Status:</Typography>
                <Input
                  fullWidth
                  readOnly
                  value={formData.STATUS}
                  onChange={(e) => handleChange("STATUS", e.target.value)}
                  className="input-general"
                  disableUnderline
                />
              </Box>
            </Col>
          </Row>
        </CardContent>
      </Card>
      <Row>
        <Col xs={12} md={8}>
          {/* ===== Service Request Details ===== */}
          <AnimatedSection
            title="Service Request Details"
            isOpen={sections.serviceRequestDetails}
            onToggle={() => toggleSection("serviceRequestDetails")}
          >
            <Row className="px-1 stats-section justify-content-center">
              <Col xs={12} md={6}>
                {/* ========== LEFT SECTION ========== */}

                {config?.ServiceRequestDetails.left?.map((item, idx) => (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "135px 1fr",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    {/* Label */}
                    <Typography className="input-text">
                      {item.label}:
                    </Typography>

                    {item.type === "textbox" ? (
                      <TextareaAutosize
                        value={formData[item.formKey || item.key] || ""}
                        onChange={(e) =>
                          handleSmartInputChange(item, e.target.value)
                        }
                        readOnly={false}
                        className="textarea-general"
                        minRows={3}
                      />
                    ) : (
                      <Input
                        fullWidth
                        value={formData[item.formKey || item.key] || ""}
                        onChange={(e) =>
                          handleSmartInputChange(item, e.target.value)
                        }
                        className="input-general "
                        disableUnderline
                      />
                    )}
                  </Box>
                ))}
              </Col>

              <Col xs={12} md={6}>
                {/* ========== RIGHT SECTION ========== */}

                {config?.ServiceRequestDetails.right?.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "135px 1fr",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    {/* Label */}
                    <Typography className="input-text">
                      {item.label}:
                    </Typography>

                    <Input
                      fullWidth
                      value={formData[item.formKey || item.key] || ""}
                      onChange={(e) =>
                        handleSmartInputChange(item, e.target.value)
                      }
                      className="input-general"
                      disableUnderline
                    />
                  </Box>
                ))}
              </Col>
            </Row>
          </AnimatedSection>
        </Col>
        {/* ===== User Information ===== */}
        <Col xs={12} md={4}>
          <AnimatedSection
            title="User Information"
            isOpen={sections.userInfo}
            onToggle={() => toggleSection("userInfo")}
          >
            {config?.UserInformationAll?.map((item) => (
              <Box
                key={item.key}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                {/* Label */}
                <Typography className="input-text">{item.label}:</Typography>
                <Input
                  fullWidth
                  value={formData[item.key] || ""}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  className="input-general"
                  disableUnderline
                />
              </Box>
            ))}
          </AnimatedSection>
        </Col>
      </Row>
      {/* ===== Dates ===== */}
      <AnimatedSection
        title="Dates"
        isOpen={sections.dates}
        onToggle={() => toggleSection("dates")}
      >
        <Row className="px-4 stats-section justify-content-center">
          {config?.DatesGroups?.map((group, colIdx) => (
            <Col xs={12} md={4} key={colIdx}>
              {group.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "115px 1fr",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {/* Label */}
                  <Typography className="input-text">{item.label}:</Typography>
                  <Input
                    fullWidth
                    value={formData[item.key] || ""}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                    className="input-general"
                    disableUnderline
                  />
                </Box>
              ))}
            </Col>
          ))}
        </Row>
      </AnimatedSection>

      {/* ===== Attachments ===== */}
      <AnimatedSection
        title="Attachments"
        isOpen={sections.attachments}
        onToggle={() => toggleSection("attachments")}
      >
        <CreateAttachment
          handleFileChange2={handleFileChange2}
          RowDataSr={RowDataSr}
          document={document}
        />
      </AnimatedSection>
    </>
  );
};

export default CreateSRTable;

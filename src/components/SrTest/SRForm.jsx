import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Typography,
  Input,
  Card,
  CardContent,
  TextareaAutosize,
} from "@mui/material";
import AnimatedSection from "../ServesDetailsCom/AnimatedSection";
import AttachmentSection from "../ServesDetailsCom/AttachmentUploader";

const SRForm = ({
  mode, // create | view | edit
  dataView = [],
  formData = {},
  setFormData = () => {},
}) => {
  const isView = mode === "view";
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(true);
  const toggleAttachment = () => setIsAttachmentOpen((prev) => !prev);
  const handleFileChange2 = (files) => {
    // console.log("Files uploaded:", files);
  };
  /* تحميل البيانات حسب الحالة */
  useEffect(() => {
    if ((mode === "view" || mode === "edit") && dataView?.length) {
      setFormData(dataView[0]);
    }

    if (mode === "create") {
      setFormData({});
    }
  }, [mode, dataView, setFormData]);

  /* تغيير القيم */
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* Config الفورم */
  const StaticData = [
    {
      header: [
        { label: "Service Request:", attribute: "ticketid" },
                        { label: "Summary:", attribute: "description" },
        { label: "Status:", attribute: "status" },
      ],

      ServiceRequest: [
        {
          label: "Details:",
          attribute: "description_longdescription",
          type: "textbox",
        },
        { label: "Assets:", attribute: "assetnum" },
        { label: "Assets Description:", attribute: "assetdesc" },
        { label: "Location:", attribute: "location" },
        { label: "Location Description:", attribute: "locationdesc" },
        { label: "Assets Site:", attribute: "assetsiteid" },
        { label: "Classification:", attribute: "classstructureid" },
        { label: "Class Description:", attribute: "classdesc" },
        { label: "Department:", attribute: "exedept" },
        { label: "Work Type:", attribute: "worktype" },
        { label: "Reported Priority:", attribute: "reportedpriority" },
        { label: "Internal Priority:", attribute: "internalpriority" },
        { label: "Service Group:", attribute: "commoditygroup" },
        { label: "Service:", attribute: "commodity" },
        { label: "Vendor:", attribute: "vendor" },
        { label: "Site:", attribute: "siteid" },
      ],
      UserInformation:[
        { label: "Requested By:", attribute: "" },
        { label: "Name:", attribute: "" },
        { label: "Phone:", attribute: "" },
        { label: "E-mail:", attribute: "" },
        { label: "Reported By:", attribute: "" },
        { label: "Name:", attribute: "" },
        { label: "Phone:", attribute: "" },
        { label: "E-mail:", attribute: "" },

      ],
      dates:[
      { label: "Reported Date:", attribute: "" },
      { label: "Requested Date:", attribute: "" },
      { label: "Target Start:", attribute: "" },
      { label: "Target Finish:", attribute: "" },

      ],
    },
  ];

  const [serviceRequestDetails, setServiceRequestDetails] = useState(true);
  const toggleSRD = () => setServiceRequestDetails((prev) => !prev);

  return (
    <>
      {/* ===== Header ===== */}
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
    {StaticData[0].header.map((item, idx) => (
      item.label === "Summary" ? (
        <Col xs={12} lg={6} key={idx}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography className="input-text text-width">{item.label}</Typography>
            <Input
            fullWidth
              className="input-general"
              value={formData?.[item.attribute] || ""}
              disabled={item.attribute === "ticketid" || item.attribute === "status" || isView}
              disableUnderline
              onChange={(e) => handleChange(item.attribute, e.target.value)}
            />
          </Box>
        </Col>
      ) : (
        <Col xs={12} lg={3} key={idx}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography className="input-text text-width">{item.label}</Typography>
            <Input
            fullWidth
              className="input-general"
              value={formData?.[item.attribute] || ""}
              disabled={item.attribute === "ticketid" || item.attribute === "status" || isView}
              disableUnderline
              onChange={(e) => handleChange(item.attribute, e.target.value)}
            />
          </Box>
        </Col>
      )
    ))}
  </Row>
</CardContent>

      </Card>

      {/* ===== Service Request Details ===== */}
      <Row>
        <Col md={6}>
          <AnimatedSection
            title="Service Request Details"
            isOpen={serviceRequestDetails}
            onToggle={toggleSRD}
          >
            {StaticData[0].ServiceRequest.map((item, idx) => {
              const value = formData?.[item.attribute] || "";

              return (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems:
                      item.type === "textbox" ? "flex-start" : "center",
                    mb: 2,
                  }}
                >
                  <Typography className="input-text text-width">
                    {item.label}
                  </Typography>

                  <Box sx={{ flex: 1 }}>
                    {item.type === "textbox" ? (
                      <TextareaAutosize
                        className="textarea-general"
                        minRows={3}
                        style={{ width: "100%" }}
                        value={value}
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        className="input-general"
                        fullWidth
                        value={value}
                        disableUnderline
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </AnimatedSection>
        </Col>
        <Col md={6}>
          <AnimatedSection
            title="User Information"
            isOpen={serviceRequestDetails}
            onToggle={toggleSRD}
          >
            {StaticData[0].UserInformation.map((item, idx) => {
              const value = formData?.[item.attribute] || "";

              return (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems:
                      item.type === "textbox" ? "flex-start" : "center",
                    mb: 2,
                  }}
                >
                  <Typography className="input-text text-width">
                    {item.label}
                  </Typography>

                  <Box sx={{ flex: 1 }}>
                    {item.type === "textbox" ? (
                      <TextareaAutosize
                        className="textarea-general"
                        minRows={3}
                        style={{ width: "100%" }}
                        value={value}
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        className="input-general"
                        fullWidth
                        value={value}
                        disableUnderline
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </AnimatedSection>

          <AnimatedSection
            title="Dates"
            isOpen={serviceRequestDetails}
            onToggle={toggleSRD}
          >
            {StaticData[0].dates.map((item, idx) => {
              const value = formData?.[item.attribute] || "";

              return (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems:
                      item.type === "textbox" ? "flex-start" : "center",
                    mb: 2,
                  }}
                >
                  <Typography className="input-text text-width">
                    {item.label}
                  </Typography>

                  <Box sx={{ flex: 1 }}>
                    {item.type === "textbox" ? (
                      <TextareaAutosize
                        className="textarea-general"
                        minRows={3}
                        style={{ width: "100%" }}
                        value={value}
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        className="input-general"
                        fullWidth
                        value={value}
                        disableUnderline
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </AnimatedSection>
        </Col>
      </Row>

      <AnimatedSection
              title="Attachments"
              isOpen={isAttachmentOpen}
              onToggle={toggleAttachment}
            >
              <AttachmentSection
                handleFileChange2={handleFileChange2}
                RowDataSr={dataView}
                document={document}
              />
            </AnimatedSection>
    </>
  );
};

export default SRForm;

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Typography,
  Input,
  Card,
  CardContent,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import AnimatedSection from "../ServesDetailsCom/AnimatedSection";
import AttachmentSection from "../ServesDetailsCom/AttachmentUploader";
import { SearchIcon } from "lucide-react";
import SelectValue from "../Create SR/SelectValue";

const SRForm = ({
  dataView = [],
  formData = {},
  setFormData = () => {},
  assetValues = [],
  departmentValues = [],
  relatedWO,
  mode,
}) => {
  const isView = mode === "view";
  const [selectOpen, setSelectOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(true);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(true);
  const [serviceRequestDetails, setServiceRequestDetails] = useState(true);
  const [isDatesOpen, setIsDatesOpen] = useState(true);

  const toggleSRD = () => setServiceRequestDetails((prev) => !prev);
  const toggleUserInfo = () => setIsUserInfoOpen((prev) => !prev);
  const toggleDates = () => setIsDatesOpen((prev) => !prev);

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
  }, [mode, dataView]);

  /* تغيير القيم */
  const handleChange = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  /* Config الفورم */
  const StaticData = [
    {
      header: [
        { label: "Service Request:", attribute: "ticketid" },
        { label: "Summary:", attribute: "description" },
        { label: "Related WO:", attribute: "recordkey" },
        { label: "Status:", attribute: "status" },
      ],

      ServiceRequestFields: [
        {
          label: "Details:",
          attribute: "description_longdescription",
          type: "textbox",
        },
        { label: "Asset:", attribute: "assetnum", icon: "search" },
        { label: "Asset Description:", attribute: "assetdesc" },
        { label: "Asset Site:", attribute: "assetsiteid" },
        { label: "Location:", attribute: "location" },
        { label: "Location Description:", attribute: "locationdesc" },
        { label: "Classification:", attribute: "classstructureid" },
        { label: "Class Description:", attribute: "classdesc" },
         { label: "Department:", attribute: "exedept", icon: "search" },
        { label: "Work Type:", attribute: "worktype" },
        { label: "Reported Priority:", attribute: "reportedpriority" },
        { label: "Service:", attribute: "commodity" },
        { label: "Vendor:", attribute: "vendor" },
        { label: "Site:", attribute: "siteid" },
        { label: "Internal Priority:", attribute: "internalpriority" },        
        { label: "Service Group:", attribute: "commoditygroup" },
        
      ],

      UserInformation: [
        { label: "Requested By:", attribute: "reportedby" },
        // { label: "Name:", attribute: "displayname" },
        // { label: "Phone:", attribute: "phone" },
        // { label: "E-mail:", attribute: "email" },
        { label: "Reported By:", attribute: "affectedperson" },
        // { label: "Name:", attribute: "displayname" },
        // { label: "Phone:", attribute: "phone" },
        // { label: "E-mail:", attribute: "email" },
      ],

      dates: [
        { label: "Reported Date:", attribute: "reportdate" },
        { label: "Requested Date:", attribute: "targstartdate" },
        // { label: "Target Start:", attribute: "targstartdate" },
        // { label: "Target Finish:", attribute: "targcompdate" },
      ],
    },
  ];

  const ServiceRequestFields = StaticData[0].ServiceRequestFields;
  const middleIndex = Math.ceil(ServiceRequestFields.length / 2);
  const leftFields = ServiceRequestFields.slice(0, middleIndex);
  const rightFields = ServiceRequestFields.slice(middleIndex);

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
          <Row className="justify-content-start">
            {StaticData[0].header.map((item, idx) => {
              let valueField = formData?.[item.attribute] || "";
              let isDisabled = false;

              // ===== Related WO Logic =====
              if (item.attribute === "recordkey") {
                if (mode === "create") {
                  valueField = "";
                  isDisabled = true;
                } else {
                  valueField = relatedWO?.recordkey || "";
                }
              }

              // ===== Service Request & Status disabled always =====
              if (
                item.attribute === "ticketid" ||
                item.attribute === "status"
              ) {
                isDisabled = true;
              }

              return (
                <Col xs={12} md={3} key={idx}>
                  <Box display="flex" alignItems="center">
                    <Typography className="input-text">{item.label}</Typography>
                    <Input
                      fullWidth
                      className="input-general"
                      value={valueField}
                      disableUnderline
                      disabled={isDisabled}
                      onChange={(e) =>
                        handleChange(item.attribute, e.target.value)
                      }
                      sx={{ color: "black" }}
                    />
                  </Box>
                </Col>
              );
            })}
          </Row>
        </CardContent>
      </Card>

      {/* ===== Service Request Details ===== */}
      <AnimatedSection
        title="Service Request Details"
        isOpen={serviceRequestDetails}
        onToggle={toggleSRD}
      >
        <Row>
          <Col md={6}>
            {leftFields.map((item, idx) => {
              const valueField = formData?.[item.attribute] || "";
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
                  <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                    {" "}
                    {item.type === "textbox" ? (
                      <TextareaAutosize
                        className="textarea-general"
                        minRows={3}
                        style={{ width: "100%" }}
                        value={valueField}
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        className="input-general"
                        fullWidth
                        value={valueField}
                        disableUnderline
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    )}
                    {item.icon === "search" && !isView && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          setCurrentField(item);
                          setSelectOpen(true);
                        }}
                      >
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Col>
          <Col md={6}>
            {rightFields.map((item, idx) => {
              const valueField = formData?.[item.attribute] || "";
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
                  <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                    {" "}
                    {item.type === "textbox" ? (
                      <TextareaAutosize
                        className="textarea-general"
                        minRows={3}
                        style={{ width: "100%" }}
                        value={valueField}
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        className="input-general"
                        fullWidth
                        value={valueField}
                        disableUnderline
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    )}
                    {item.icon === "search" && !isView && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          setCurrentField(item);
                          setSelectOpen(true);
                        }}
                      >
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Col>
        </Row>
      </AnimatedSection>

      <Row>
        <Col md={6}>
          <AnimatedSection
            title="User Information"
            isOpen={isUserInfoOpen}
            onToggle={toggleUserInfo}
          >
            {StaticData[0].UserInformation.map((item, idx) => {
              const valueField = formData?.[item.attribute] || "";
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
                        value={valueField}
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        className="input-general"
                        fullWidth
                        value={valueField}
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
            title="Dates"
            isOpen={isDatesOpen}
            onToggle={toggleDates}
          >
            {StaticData[0].dates.map((item, idx) => {
              const valueField = formData?.[item.attribute] || "";
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
                        value={valueField}
                        readOnly={isView}
                        onChange={(e) =>
                          handleChange(item.attribute, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        className="input-general"
                        fullWidth
                        value={valueField}
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

      {/* Select Value Modal */}
      {mode === "create" ? (
        <SelectValue
          open={selectOpen}
          field={currentField}
          value={
            currentField?.attribute === "assetnum"
              ? assetValues
              : departmentValues
          }
          tabs={
            currentField?.attribute === "assetnum"
              ? [
                  { label: "Asset", key: "assetnum" },
                  { label: "Description", key: "description" },
                  { label: "Location", key: "location" },
                  { label: "Site", key: "siteid" },
                ]
              : [
                  { label: "Value", key: "value" },
                  { label: "Description", key: "description" },
                ]
          }
          onClose={() => setSelectOpen(false)}
          onSelectValue={(val) => {
            handleChange(currentField.attribute, val);
            setSelectOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default SRForm;

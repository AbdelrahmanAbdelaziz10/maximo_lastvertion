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
import { useGlobal } from "../Context/GlobalContext";
import { SearchIcon } from "lucide-react";
import SelectValue from "../Create SR/SelectValue";

const SRForm = ({
  dataView = [],
  formData = {},
  setFormData = () => {},
  assetValues = [],
  departmentValues = [],
}) => {
  // ✅ استخدم القيمة من الـ context بدل mode
  const { value } = useGlobal(); // value = "create" | "view" | "edit"
  const isView = value === "view";
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
    if ((value === "view" || value === "edit") && dataView?.length) {
      setFormData(dataView[0]);
    }

    if (value === "create") {
      setFormData({});
    }
  }, [value, dataView, setFormData]);

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
        { label: "Status:", attribute: "status" },
      ],

      ServiceRequest: [
        {
          label: "Details:",
          attribute: "description_longdescription",
          type: "textbox",
        },
        { label: "Assets:", attribute: "assetnum", icon: "search" },
        { label: "Assets Description:", attribute: "assetdesc" },
        { label: "Location:", attribute: "location" },
        { label: "Location Description:", attribute: "locationdesc" },
        { label: "Assets Site:", attribute: "assetsiteid" },
        { label: "Classification:", attribute: "classstructureid" },
        { label: "Class Description:", attribute: "classdesc" },
        { label: "Department:", attribute: "exedept", icon: "search" },
        { label: "Work Type:", attribute: "worktype" },
        { label: "Reported Priority:", attribute: "reportedpriority" },
        { label: "Internal Priority:", attribute: "internalpriority" },
        { label: "Service Group:", attribute: "commoditygroup" },
        { label: "Service:", attribute: "commodity" },
        { label: "Vendor:", attribute: "vendor" },
        { label: "Site:", attribute: "siteid" },
      ],

      UserInformation: [
        { label: "Requested By:", attribute: "reportedby" },
        { label: "Name:", attribute: "displayname" },
        { label: "Phone:", attribute: "phone" },
        { label: "E-mail:", attribute: "email" },
        { label: "Reported By:", attribute: "affectedperson" },
        { label: "Name:", attribute: "displayname" },
        { label: "Phone:", attribute: "phone" },
        { label: "E-mail:", attribute: "email" },
      ],

      dates: [
        { label: "Reported Date:", attribute: "reportdate" },
        { label: "Requested Date:", attribute: "targstartdate" },
        { label: "Target Start:", attribute: "targstartdate" },
        { label: "Target Finish:", attribute: "targcompdate" },
      ],
    },
  ];

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
          <Row className=" justify-content-start">
            {StaticData[0].header.map((item, idx) => (
              <Col xs={12} md={item.label === "Summary" ? 6 : 3} key={idx}>
                <Box display="flex" alignItems="center">
                  <Typography className="input-text text-width">
                    {item.label}
                  </Typography>
                  <Input
                    fullWidth
                    className="input-general"
                    value={formData?.[item.attribute] || ""}
                    disabled={
                      item.attribute === "ticketid" ||
                      item.attribute === "status" ||
                      isView
                    }
                    disableUnderline
                    onChange={(e) =>
                      handleChange(item.attribute, e.target.value)
                    }
                  />
                </Box>
              </Col>
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
          </AnimatedSection>
        </Col>
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
        {value ==="create" ? (      <SelectValue
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
/>):(null)}


    </>
  );
};

export default SRForm;

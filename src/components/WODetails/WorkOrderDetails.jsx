import React, { useState } from "react";
import "../../Style/WorkOrderDetails.css";
import AnimatedSection from "../ServesDetailsCom/AnimatedSection";
import { Col, Row } from "react-bootstrap";
import SRUserInfo from "../ServesDetailsCom/SRUserInfo";
import { Box, IconButton, Input, TextField, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SpecificationsTable from "../ServesDetailsCom/SpecificationsTable";
import MultipleCIs from "./MultipleCIs";

const WorkOrderDetails = ({ RowDataSr }) => {
  const [serviceRequestDetails, setServiceRequestDetails] = useState(true);
  const [responsibility, setResponsibility] = useState(true);
  const [jobDetails, setJobDetails] = useState(true);
  const [priority, setPriority] = useState(true);
  const [assetDetails, setAssetDetails] = useState(true);
  const [seheduling, setSeheduling] = useState(true);
  const [followUpWork, setFollowUpWork] = useState(true);
  const [responsiblity, setResponsiblity] = useState(true);

  const toggleSRD = () => setServiceRequestDetails((prev) => !prev);
  const toggleWOR = () => setResponsibility((prev) => !prev);
  const toggleJD = () => setJobDetails((prev) => !prev);
  const togglePriority = () => setPriority((prev) => !prev);
  const toggleAssetD = () => setAssetDetails((prev) => !prev);
    const toggleSehedul = () => setSeheduling((prev) => !prev);
  const toggleFollowUpWork = () => setFollowUpWork((prev) => !prev);
  const toggleRespons = () => setResponsiblity((prev) => !prev);

  const UserInformation = [
    { label: "Parent WO:", Value: " ", Key: 5 },
    { label: "Classification:", Value: " ", Key: 6 },
    { label: "Class Description:", Value: " ", Key: 7 },
    { label: "Launch Entry Name:", Value: " ", Key: 8 },
  ];

  const UserInformation1 = [
    { label: "Site", Value: " ", Key: 1 },
    { label: "Class", Value: " ", Key: 2 },
    { label: "Work Type", Value: " ", Key: 3 },
    { label: "Project ID", Value: " ", Key: 4 },
    { label: "GL Account", Value: " ", Key: 5 },
    { label: "Failure Class", Value: " ", Key: 6 },
    { label: "Problem Code", Value: " ", Key: 7 },
    { label: "Store Room Material Status", Value: " ", Key: 8 },
    { label: "Direct Issue Material Status", Value: " ", Key: 9 },
    { label: "work Package Material Status", Value: " ", Key: 10 },
    { label: "Material Status Last Update", Value: " ", Key: 11 },
  ];

  const UserInformation2 = [
    {
      label: "Attachment",
      Value: "Attachments",
      Key: 1,
      type: "text-display",
    },
    { label: "Status", Value: "WQC", Key: 2, type: "text-display" },
    {
      label: "Status Date",
      Value: "29/04/2025 08:23",
      Key: 3,
      type: "text-display",
    },
    {
      label: "Inherits States Change",
      Value: "true",
      Key: 4,
      type: "check box",
      readOnly: false,
    },
    { label: "Accepts Charges", Value: "false", Key: 5, type: "check box" },
    {
      label: "Is Task",
      Value: "false",
      Key: 6,
      type: "check box",
      readOnly: false,
    },
    { label: "Under Flow Control", Value: "false", Key: 7, type: "check box" },
    {
      label: "Suspend Flow Control",
      Value: "false",
      Key: 8,
      type: "check box",
    },
    { label: "Flow Action", Value: " ", Key: 9, type: "text-display" },
    { label: "Flow Action Assist", Value: "false", Key: 10, type: "check box" },
  ];

  const WorkOrderDetails = [
    { label: "Actual Response Time:", Value: " ", Key: 1 },
    { label: "Actual Response Time:", Value: " ", Key: 2 },
    { label: "Waiting Material Time:", Value: " ", Key: 3 },
    { label: "Waiting Material Time:", Value: " ", Key: 4 },
    { label: "Physical Work:", Value: " ", Key: 5 },
    { label: "Physical Work:", Value: " ", Key: 6 },
  ];
  const WorkOrderDetails1 = [
    { label: "Actual MTTR:", Value: " ", Key: 1 },
    { label: "Actual MTTR:", Value: " ", Key: 2 },
    { label: "Reschedule Time:", Value: " ", Key: 3 },
    { label: "Reschedule Time:", Value: " ", Key: 4 },
  ];

  // Updated Responsibility data to match your design
  const Responsibility = [
    { label: "Reported By:", Value: "HELPDESK1", Key: 1 },
    { label: "Reported Date:", Value: "28/01/2023 15:55", Key: 2 },
    { label: "On Behalf Of:", Value: "10529", Key: 3 },
    { label: "Phone:", Value: "", Key: 4 },
  ];

  const Responsibility1 = [
    { label: "Department:", Value: "MECH", Key: 1 },
    { label: "Supervisor:", Value: "", Key: 2 },
    { label: "Crew:", Value: "", Key: 3 },
    { label: "Lead:", Value: "", Key: 4 },
    { label: "Work Group:", Value: "", Key: 5 },
    { label: "Vendor:", Value: "", Key: 6 },
    { label: "Crew Work Group:", Value: "", Key: 7 },
  ];

  const Responsibility2 = [
    { label: "Owner:", Value: "", Key: 1 },
    { label: "Owner Group:", Value: "", Key: 2 },
    { label: "Service Group:", Value: "", Key: 3 },
    { label: "Service:", Value: "", Key: 4 },
  ];
  const MultipleCIsData = [
    "Assets",
    "Location",
    "Configuration Item",
    "Target Description",
    "Sequence",
    "Mark Progress?",
    "Inspection Form",
    "Inspection Result",
    "Site",
    "Total Work Unite",
  ];
  const MultipleCIsVariable = [
    {
      attribute: "",
      description: "",
      dataType: "",
      dateValue: "",
      alphanumericValue: "",
      numericValue: "",
      unitOfMeasure: "",
      section: "",
      asstes: "",
      location: "",
      site: "",
    },
  ];

  const AddressInformation = [
    { label: "Service Address:", Value: "", Key: 1 },
    { label: "Description:", Value: "", Key: 2 },
    { label: "City:", Value: "", Key: 3 },
    { label: "Formatted Address:", Value: "", Key: 4 },
    { label: "State/province:", Value: "", Key: 5 },
    { label: "Street Address:", Value: "", Key: 6 },
  ];
  const WorkPermitData = ["Work permit", "Permit Type", "Primary"];
  const WorkPermitVariable = {
    attribute: "",
    description: "",
    dataType: "",
  };

  const AssetDetails = [
    {
      label: "Asset Up?",
      Value: "False",
      Key: 1,
      type: "check box",
      readOnly: false,
    },

    {
      label: "Need Shutdown?",
      Value: "False",
      Key: 2,
      type: "check box",
      readOnly: true,
    },
    {
      label: "Need Work Permit",
      Value: "false",
      Key: 3,
      type: "check box",
      readOnly: false,
    },
    {
      label: "Warranties Exist?",
      Value: "false",
      Key: 4,
      type: "check box",
      readOnly: true,
    },
    { label: "SLA Applied?", Value: "false", Key: 5, type: "check box" },
    {
      label: "Change to Store?",
      Value: "false",
      Key: 6,
      type: "check box",
    },
    { label: "Current Value:", Value: " ", Key: 9, type: "text-display" },
  ];
  const Priority = [
    {
      label: "Asset/Location Priority:",
      Value: "",
      Key: 1,
      type: "text-display",
    },
    { label: "Priority:", Value: "3", Key: 2, type: "text-display" },
    {
      label: "Priority Justification:",
      Value: "",
      Key: 3,
      type: "text-display",
    },
    {
      label: "Risk Assessment:",
      Value: "",
      Key: 3,
      type: "text-display",
    },
  ];
  const JobDetails = [
    { label: "Job Plan:", Value: "", Key: 1 },
    { label: "Job Plan Revision #:", Value: "", Key: 2 },
    { label: "PM:", Value: "", Key: 3 },
    { label: "Safety Plan:", Value: "", Key: 4 },
    { label: "Contract:", Value: "", Key: 5 },
    { label: "Inspection Form:", Value: "", Key: 6 },
    { label: "Inspection Result:", Value: "", Key: 7 },
    { label: "Total Work Units:", Value: "", Key: 8 },
  ];

  const FollowUpWork = [
    {
      label: "Originating Record:",
      Value: "SR-1078",
      Key: 1,
      type: "text-display",
    },
    {
      label: "Originating Record Class:",
      Value: "SR",
      Key: 2,
      type: "text-display",
    },
    {
      label: "Has Follow-up Work?",
      Value: "true",
      Key: 3,
      type: "check box",
      readOnly: false,
    },
    {
      label: "Rework:",
      Value: "",
      Key: 4,
      type: "text-display",
    },
    { label: "Interruptible?", Value: "false", Key: 5, type: "check box" },
    {
      label: "Interruptible shift:",
      Value: "",
      Key: 6,
      type: "text-display",
    },
    { label: "Is Milestone?	", Value: "false", Key: 7, type: "check box" },
  ];
  const SchedulingInformation1 = [
    { label: "Target Start:", Value: "29/01/2023 15:55", Key: 1, type: "date" },
    {
      label: "Target Finish:",
      Value: "29/01/2023 15:55",
      Key: 2,
      type: "date",
    },
    { label: "Scheduled Start:", Value: "", Key: 3, type: "date" },
    { label: "Scheduled Finish:", Value: "", Key: 4, type: "date" },
    { label: "Start No Earlier Than:", Value: "", Key: 5, type: "date" },
    { label: "Finish No Later Than:", Value: "", Key: 6, type: "date" },
  ];

  const SchedulingInformation2 = [
    { label: "Actual Start:", Value: "", Key: 1 },
    { label: "Actual Finish", Value: "", Key: 2 },
    { label: "Duration:", Value: "", Key: 3 },
    { label: "Time Remaining:", Value: "", Key: 4 },
    { label: "Predecessors:", Value: "", Key: 5 },
    { label: "Include Tasks in Schedule?", Value: "", Key: 6 },
  ];
  const SchedulingInformation3 = [
    { label: "Allowed Response Time:", Value: "", Key: 1 },
    { label: "Actual Response Time:", Value: "", Key: 2 },
    { label: "Allowed MTTR:", Value: "", Key: 3 },
    { label: "Actual MTTR:", Value: "", Key: 4 },
    { label: "Reschedule Time:", Value: "", Key: 5 },
    { label: "Waiting Material Time:", Value: "", Key: 6 },
  ];
  return (
    <>
      <Row className="px-4 stats-section justify-content-center">
        {/* LEFT COLUMN */}
        <Col xs={12} md={6} lg={5}>
          <Row>
            <Col md={6}>
              <Box
                sx={{
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  minHeight: "40px",
                }}
              >
                <Typography
                  sx={{
                    flexShrink: 0,
                    fontWeight: 400,
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    paddingRight: 2,
                    textAlign: "right",
                    lineHeight: "32px",
                  }}
                >
                  Work Order:
                </Typography>

                <Box sx={{ flex: 1 }}>
                  <Input
                    type="text"
                    fullWidth
                    value={""}
                    readOnly
                    disableUnderline
                    sx={{
                      width: "100%",
                      padding: "4px 8px",
                      borderBottom: "1px dotted #999",
                      fontSize: "0.875rem",
                      "& .MuiInput-input": {
                        textAlign: "left",
                        padding: 0,
                      },
                      "&:before, &:after": { display: "none" },
                    }}
                  />
                </Box>
              </Box>
            </Col>
            <Col md={6}>
              <Box sx={{ flex: 1 }}>
                <Input
                  type="text"
                  fullWidth
                  value={""}
                  readOnly
                  disableUnderline
                  sx={{
                    width: "100%",
                    padding: "4px 8px",
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    "& .MuiInput-input": {
                      textAlign: "left",
                      padding: 0,
                    },
                    "&:before, &:after": { display: "none" },
                  }}
                />
              </Box>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Box
                sx={{
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  minHeight: "32px",
                }}
              >
                <Typography
                  sx={{
                    flexShrink: 0,
                    fontWeight: 400,
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    paddingRight: 2,
                    textAlign: "right",
                    lineHeight: "32px",
                  }}
                >
                  Location:
                </Typography>

                <Box sx={{ flex: 1 }}>
                  <Input
                    type="text"
                    fullWidth
                    value={""}
                    readOnly
                    disableUnderline
                    sx={{
                      width: "100%",
                      padding: "4px 8px",
                      borderBottom: "1px dotted #999",
                      fontSize: "0.875rem",
                      "& .MuiInput-input": {
                        textAlign: "left",
                        padding: 0,
                      },
                      "&:before, &:after": { display: "none" },
                    }}
                  />
                </Box>
              </Box>
            </Col>
            <Col md={6}>
              <Box sx={{ flex: 1 }}>
                <Input
                  type="text"
                  fullWidth
                  value={""}
                  readOnly
                  disableUnderline
                  sx={{
                    width: "100%",
                    padding: "4px 8px",
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    "& .MuiInput-input": {
                      textAlign: "left",
                      padding: 0,
                    },
                    "&:before, &:after": { display: "none" },
                  }}
                />
              </Box>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Box
                sx={{
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  minHeight: "32px",
                }}
              >
                <Typography
                  sx={{
                    flexShrink: 0,
                    fontWeight: 400,
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    paddingRight: 2,
                    textAlign: "right",
                    lineHeight: "32px",
                  }}
                >
                  Asset:
                </Typography>

                <Box sx={{ flex: 1 }}>
                  <Input
                    type="text"
                    fullWidth
                    value={""}
                    readOnly
                    disableUnderline
                    sx={{
                      width: "100%",
                      padding: "4px 8px",
                      borderBottom: "1px dotted #999",
                      fontSize: "0.875rem",
                      "& .MuiInput-input": {
                        textAlign: "left",
                        padding: 0,
                      },
                      "&:before, &:after": { display: "none" },
                    }}
                  />
                </Box>
              </Box>
            </Col>
            <Col md={6}>
              <Box sx={{ flex: 1 }}>
                <Input
                  type="text"
                  fullWidth
                  value={""}
                  readOnly
                  disableUnderline
                  sx={{
                    width: "100%",
                    padding: "4px 8px",
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    "& .MuiInput-input": {
                      textAlign: "left",
                      padding: 0,
                    },
                    "&:before, &:after": { display: "none" },
                  }}
                />
              </Box>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Box
                sx={{
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  minHeight: "32px",
                }}
              >
                <Typography
                  sx={{
                    flexShrink: 0,
                    fontWeight: 400,
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    paddingRight: 2,
                    textAlign: "right",
                    lineHeight: "32px",
                  }}
                >
                  Configuration Item:
                </Typography>

                <Box sx={{ flex: 1 }}>
                  <Input
                    type="text"
                    fullWidth
                    value={""}
                    readOnly
                    disableUnderline
                    sx={{
                      width: "100%",
                      padding: "4px 8px",
                      borderBottom: "1px dotted #999",
                      fontSize: "0.875rem",
                      "& .MuiInput-input": {
                        textAlign: "left",
                        padding: 0,
                      },
                      "&:before, &:after": { display: "none" },
                    }}
                  />
                </Box>
              </Box>
            </Col>
            <Col md={6}>
              <Box sx={{ flex: 1 }}>
                <Input
                  type="text"
                  fullWidth
                  value={""}
                  readOnly
                  disableUnderline
                  sx={{
                    width: "100%",
                    padding: "4px 8px",
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    "& .MuiInput-input": {
                      textAlign: "left",
                      padding: 0,
                    },
                    "&:before, &:after": { display: "none" },
                  }}
                />
              </Box>
            </Col>
          </Row>
          {UserInformation?.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                marginBottom: 2,
                display: "flex",
                alignItems: "center",
                minHeight: "32px",
              }}
            >
              <Typography
                sx={{
                  flexShrink: 0,
                  fontWeight: 400,
                  color: "text.secondary",
                  fontSize: "0.875rem",
                  paddingRight: 2,
                  textAlign: "right",
                  lineHeight: "32px",
                }}
              >
                {item.label}
              </Typography>

              <Box sx={{ flex: 1 }}>
                <Input
                  type="text"
                  fullWidth
                  value={item.Value || ""}
                  readOnly
                  disableUnderline
                  sx={{
                    width: "100%",
                    padding: "4px 8px",
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    "& .MuiInput-input": {
                      textAlign: "left",
                      padding: 0,
                    },
                    "&:before, &:after": { display: "none" },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Col>
        {/* Medal COLUMN */}
        <Col xs={12} md={6} lg={4}>
          {UserInformation1?.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                marginBottom: 2,
                display: "flex",
                alignItems: "center",
                minHeight: "32px",
              }}
            >
              {/* Label Section - Fixed width */}
              <Typography
                sx={{
                  flexShrink: 0,
                  fontWeight: 500,
                  color: "text.secondary",
                  fontSize: "0.790rem",
                  textAlign: "right",
                  lineHeight: "35px",
                  width: "187px", // Fixed width for alignment
                }}
              >
                {item.label}:
              </Typography>

              {/* Input Section - Takes remaining space */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {" "}
                {/* minWidth: 0 prevents overflow */}
                <Input
                  type="text"
                  fullWidth
                  value={item.Value || ""}
                  readOnly
                  disableUnderline
                  sx={{
                    width: "100%",
                    padding: "4px 0", // Remove side padding for full width
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    backgroundColor: "transparent",
                    "& .MuiInput-input": {
                      textAlign: "left",
                      padding: 0,
                      color: "text.primary",
                    },
                    "&:before, &:after": { display: "none" },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Col>

        {/* RIGHT COLUMN */}
        <Col xs={12} md={6} lg={3}>
          {UserInformation2?.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                marginBottom: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* LABEL OR PLACEHOLDER */}
              {item.label !== "Attachment" ? (
                <Typography
                  sx={{
                    flexBasis: "140px",
                    flexShrink: 0,
                    fontWeight: 400,
                    color: "text.secondary",
                    fontSize: "0.800rem",
                    paddingRight: 0,
                    textAlign: "right",
                    lineHeight: "35px",
                  }}
                >
                  {item.label}:
                </Typography>
              ) : (
                <Box
                  sx={{
                    flexBasis: "100px",
                    flexShrink: 0,
                    paddingRight: 2,
                    height: "32px",
                  }}
                />
              )}

              {/* VALUE SECTION */}
              <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                {item.label === "Attachment" ? (
                  <Box
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      color: "#1976d2",
                      textDecoration: "underline",
                      fontSize: "0.875rem",
                    }}
                    // onClick={() => console.log("Open attachment viewer")}
                  >
                    <Typography sx={{ fontSize: "0.875rem" }}>
                      {item.Value}
                    </Typography>
                    <AttachFileIcon sx={{ transform: "rotate(20deg)" }} />
                  </Box>
                ) : item.type === "check box" ? (
                  <input
                    type="checkbox"
                    checked={item.Value === "true"}
                    readOnly={item.readOnly !== false}
                    style={{
                      transform: "scale(1.3)",
                      marginLeft: "8px",
                    }}
                  />
                ) : item.type === "text-display" ? (
                  <Box
                    sx={{
                      width: "100%",
                      padding: "4px 8px",
                      borderBottom: "1px dotted #999",
                      fontSize: "0.875rem",
                      minHeight: "32px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "0.875rem", color: "text.primary" }}
                    >
                      {item.Value}
                    </Typography>
                  </Box>
                ) : (
                  <Input
                    type="text"
                    fullWidth
                    value={item.Value || ""}
                    readOnly={item.readOnly !== false}
                    disableUnderline
                    sx={{
                      width: "100%",
                      padding: "4px 8px",
                      borderBottom: "1px dotted #999",
                      fontSize: "0.875rem",
                      "& .MuiInput-input": {
                        textAlign: "left",
                        padding: 0,
                      },
                      "&:before, &:after": { display: "none" },
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Col>
      </Row>
      {/* ===== Section 2: Job Details + Asset Details + Priority ===== */}
      <Row className="stats-section justify-content-center">
        <Col xs={12} md={5}>
          <AnimatedSection
            title="Job Details"
            isOpen={jobDetails}
            onToggle={toggleJD}
          >
            <SRUserInfo UserInformation={JobDetails} width="135px" />
          </AnimatedSection>
        </Col>
        <Col xs={12} md={3}>
          <AnimatedSection
            title="Asset Details"
            isOpen={assetDetails}
            onToggle={toggleAssetD}
          >
            {AssetDetails?.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* LABEL OR PLACEHOLDER */}
                {item.label !== "Attachment" ? (
                  <Typography
                    sx={{
                      flexBasis: "140px",
                      flexShrink: 0,
                      fontWeight: 400,
                      color: "text.secondary",
                      fontSize: "0.800rem",
                      paddingRight: 0,
                      textAlign: "right",
                      lineHeight: "35px",
                    }}
                  >
                    {item.label}:
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      flexBasis: "100px",
                      flexShrink: 0,
                      paddingRight: 2,
                      height: "32px",
                    }}
                  />
                )}

                {/* VALUE SECTION */}
                <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                  {item.label === "Attachment" ? (
                    <Box
                      sx={{
                        display: "flex",
                        cursor: "pointer",
                        color: "#1976d2",
                        textDecoration: "underline",
                        fontSize: "0.875rem",
                      }}
                      // onClick={() => console.log("Open attachment viewer")}
                    >
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        {item.Value}
                      </Typography>
                      <AttachFileIcon sx={{ transform: "rotate(20deg)" }} />
                    </Box>
                  ) : item.type === "check box" ? (
                    <input
                      type="checkbox"
                      checked={item.Value === "true"}
                      readOnly={item.readOnly !== false}
                      style={{
                        transform: "scale(1.3)",
                        marginLeft: "8px",
                      }}
                    />
                  ) : item.type === "text-display" ? (
                    <Box
                      sx={{
                        width: "100%",
                        padding: "4px 8px",
                        borderBottom: "1px dotted #999",
                        fontSize: "0.875rem",
                        minHeight: "32px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "0.875rem", color: "text.primary" }}
                      >
                        {item.Value}
                      </Typography>
                    </Box>
                  ) : (
                    <Input
                      type="text"
                      fullWidth
                      value={item.Value || ""}
                      readOnly={item.readOnly !== false}
                      disableUnderline
                      sx={{
                        width: "100%",
                        padding: "4px 8px",
                        borderBottom: "1px dotted #999",
                        fontSize: "0.875rem",
                        "& .MuiInput-input": {
                          textAlign: "left",
                          padding: 0,
                        },
                        "&:before, &:after": { display: "none" },
                      }}
                    />
                  )}
                </Box>
              </Box>
            ))}{" "}
          </AnimatedSection>
        </Col>
        <Col xs={12} md={4}>
          <AnimatedSection
            title="Priority"
            isOpen={priority}
            onToggle={togglePriority}
          >
            <SRUserInfo UserInformation={Priority} width="145px" />
          </AnimatedSection>
        </Col>
      </Row>
      {/* ===== Section 3:Duration Date Details ===== */}

      <AnimatedSection
        title="Duration Date Details"
        isOpen={serviceRequestDetails}
        onToggle={toggleSRD}
      >
        <Row className="px-4 stats-section justify-content-center">
          <Col xs={12} md={6}>
            <SRUserInfo UserInformation={WorkOrderDetails} />
          </Col>
          <Col xs={12} md={6}>
            <SRUserInfo UserInformation={WorkOrderDetails1} />
          </Col>
        </Row>
      </AnimatedSection>
      {/* ===== Section 4: Work Permit ===== */}

      <Row className="stats-section justify-content-center">
        <Col xs={12} md={6}>
          <AnimatedSection
            title="Address Information"
            isOpen={responsibility}
            onToggle={toggleWOR}
          >
            <SRUserInfo UserInformation={AddressInformation} width="130px" />
          </AnimatedSection>
        </Col>
        <Col xs={12} md={6}>
          <SpecificationsTable
            Title={"Work Permit"}
            variable={WorkPermitVariable}
            data={WorkPermitData}
          />
        </Col>
      </Row>
      {/* ===== Section 5: Multiple,assets,Location and CIs ===== */}
      <Row className="stats-section justify-content-center">
        <Col xs={12} md={12}>
          <MultipleCIs
            Title={"Multiple,Assets,Location and CIS"}
            variable={MultipleCIsVariable}
            data={MultipleCIsData}
          />
        </Col>
      </Row>
      {/* ===== Section 5: Multiple,assets,Location and CIs ===== */}
      <Row className="stats-section justify-content-center">
        <Col xs={12} md={9}>
          <AnimatedSection
            title="Scheduling Information"
            isOpen={seheduling}
            onToggle={toggleSehedul}
          >
            <Row className="g-1">
              <Col xs={12} md={4}>
                <SRUserInfo
                  UserInformation={SchedulingInformation1}
                  width="135px"
                />
              </Col>
              <Col xs={12} md={4}>
                <SRUserInfo
                  UserInformation={SchedulingInformation2}
                  width="170px"
                />
              </Col>{" "}
              <Col xs={12} md={4}>
                <SRUserInfo
                  UserInformation={SchedulingInformation3}
                  width="148px"
                />
              </Col>
            </Row>
          </AnimatedSection>
        </Col>
        <Col xs={12} md={3}>
          <AnimatedSection
            title="Follow-up Work"
            isOpen={followUpWork}
            onToggle={toggleFollowUpWork}
          >
            {FollowUpWork?.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* LABEL OR PLACEHOLDER */}
                {item.label !== "Attachment" ? (
                  <Typography
                    sx={{
                      flexBasis: "140px",
                      flexShrink: 0,
                      fontWeight: 400,
                      color: "text.secondary",
                      fontSize: "0.750rem",
                      paddingRight: 0,
                      textAlign: "right",
                      lineHeight: "35px",
                    }}
                  >
                    {item.label}
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      flexBasis: "100px",
                      flexShrink: 0,
                      paddingRight: 2,
                      height: "32px",
                    }}
                  />
                )}

                {/* VALUE SECTION */}
                <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                  {item.label === "Attachment" ? (
                    <Box
                      sx={{
                        display: "flex",
                        cursor: "pointer",
                        color: "#1976d2",
                        textDecoration: "underline",
                        fontSize: "0.875rem",
                      }}
                      // onClick={() => console.log("Open attachment viewer")}
                    >
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        {item.Value}
                      </Typography>
                      <AttachFileIcon sx={{ transform: "rotate(20deg)" }} />
                    </Box>
                  ) : item.type === "check box" ? (
                    <input
                      type="checkbox"
                      checked={item.Value === "true"}
                      readOnly={item.readOnly !== false}
                      style={{
                        transform: "scale(1.3)",
                        marginLeft: "8px",
                      }}
                    />
                  ) : item.type === "text-display" ? (
                    <Box
                      sx={{
                        width: "100%",
                        padding: "4px 8px",
                        borderBottom: "1px dotted #999",
                        fontSize: "0.875rem",
                        minHeight: "32px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "0.875rem", color: "text.primary" }}
                      >
                        {item.Value}
                      </Typography>
                    </Box>
                  ) : (
                    <Input
                      type="text"
                      fullWidth
                      value={item.Value || ""}
                      readOnly={item.readOnly !== false}
                      disableUnderline
                      sx={{
                        width: "100%",
                        padding: "4px 8px",
                        borderBottom: "1px dotted #999",
                        fontSize: "0.875rem",
                        "& .MuiInput-input": {
                          textAlign: "left",
                          padding: 0,
                        },
                        "&:before, &:after": { display: "none" },
                      }}
                    />
                  )}
                </Box>
              </Box>
            ))}{" "}
          </AnimatedSection>
        </Col>
      </Row>
      {/* ===== Section 7:Responsibility ===== */}

      <AnimatedSection
        title="Responsibility"
        isOpen={responsiblity}
        onToggle={toggleRespons}
      >
        <Row className="px-4 stats-section justify-content-center">
          <Col xs={12} md={4}>
            <SRUserInfo UserInformation={Responsibility} width="140px" />
          </Col>
          <Col xs={12} md={4}>
            <SRUserInfo UserInformation={Responsibility1} width="140px" />
          </Col>
          <Col xs={12} md={4}>
            <SRUserInfo UserInformation={Responsibility2} width="140px" />
          </Col>
        </Row>
      </AnimatedSection>
    </>
  );
};

export default WorkOrderDetails;

import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Box,
  Typography,
  Input,
  useTheme,
  CardContent,
  Card,
} from "@mui/material";
import SRUserInfo from "./SRUserInfo";
import AttachmentSection from "./AttachmentUploader";
import myImage from "../../assets/notfound.jpg";
import { useFetch } from "../../hooks/getFetch";
import AnimatedSection from "../ServesDetailsCom/AnimatedSection";
import QRDisplay from "./../QRDisplay";
import { DetailsList } from "../../../Data/config.json";
import SearchIcon from "@mui/icons-material/Search";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PreviewIcon from "@mui/icons-material/Preview";
import dataBase from "../../../Data/config.json";

const SRDetailsCom = ({
  RowDataSr,
  document,
  setFormData,
  formData,
  setDataUpdate,
  reportedphone,
  setReportedphone,
}) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusValue, setStatusValue] = useState("");

  useEffect(() => {
    if (RowDataSr?.[0]?.description) {
      setStatusValue(RowDataSr[0].description);
    }
  }, [RowDataSr]);

  const [isUserInfoOpen, setIsUserInfoOpen] = useState(true);
  const [isDatesOpen, setIsDatesOpen] = useState(true);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(true);
  const [serviceRequestDetails, setServiceRequestDetails] = useState(true);
  const [isQROpen, setIsQROpen] = useState(true);

  const toggleUserInfo = () => setIsUserInfoOpen((prev) => !prev);
  const toggleDates = () => setIsDatesOpen((prev) => !prev);
  const toggleAttachment = () => setIsAttachmentOpen((prev) => !prev);
  const toggleSRD = () => setServiceRequestDetails((prev) => !prev);
  const toggleQRCode = () => setIsQROpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await useFetch("srdata");
        setData(response);
      } catch (error) {
        console.error("Error fetching SR data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const icons = {
    search: <SearchIcon fontSize="small" />,
    link: <InsertLinkIcon fontSize="small" />,
    preview: <PreviewIcon fontSize="small" />,
  };

  // Info arrays
  const UserInformation2 = [
    {label: "Reported By",Value: RowDataSr[0]?.reportedbyname || " ",Key: 1,icon: true,},
    {label: "Name",Value: RowDataSr[0]?.reportedbyname || " ",Key: 2,icon: true,},
    {label: "Phone",
      Value: (
        <Input
          fullWidth
          value={reportedphone}
          onChange={(e) => {
            setReportedphone(e.target.value);
          }}
          sx={{ borderBottom: "1px dotted #999" }}
        />
      ),
      Key: 3,
    },
    { label: "E-mail", Value: RowDataSr[0]?.reportedemail || " ", Key: 4 },
  ];
  const ServiceRequestDetails = [
    { label: "Owner Group", Value: RowDataSr[0]?.OWNERGROUP || " ", Key: 1 },
    {
      label: "Details",
      Value: RowDataSr[0]?.description_longdescription || " ",
      Key: 2,
      type: "textbox",
    },
    { label: "Asset", Value: RowDataSr[0]?.reportedphone || " ", Key: 3 },
    { label: "Location", Value: RowDataSr[0]?.location || " ", Key: 4 },
    { label: "Configuration Item", Value: RowDataSr[0]?.cinum || " ", Key: 5 },
    {
      label: "Target Description",
      Value: RowDataSr[0]?.targetdesc || " ",
      Key: 6,
    },
    { label: "GL Account", Value: RowDataSr[0]?.glaccount || " ", Key: 7 }, // Not Found attribute
    { label: "Asset Site", Value: RowDataSr[0]?.assetsiteid || " ", Key: 8 },
  ];
  const ServiceRequestDetails2 = [
    { label: "Classification", Value: " ", Key: 1 }, // Not Found attribute
    { label: "Class Description", Value: " ", Key: 2 }, // Not Found attribute
    { label: "Department", Value: RowDataSr[0]?.exedept || " ", Key: 3 },
    { label: "Work Type", Value: RowDataSr[0]?.worktype || " ", Key: 4 },
    {
      label: "Reported Priority",
      Value: RowDataSr[0]?.reportedpriority || " ",
      Key: 5,
    },
    {
      label: "Internal Priority",
      Value: RowDataSr[0]?.internalpriority || " ",
      Key: 6,
    },
    {
      label: "Service Group ",
      Value: RowDataSr[0]?.commoditygroup || " ",
      Key: 7,
    }, // Not Found attribute
    { label: "Service ", Value: RowDataSr[0]?.commodity || " ", Key: 8 }, // Not Found attribute
    { label: "Vendor", Value: RowDataSr[0]?.vendor || " ", Key: 9 }, //  Not Found attribute
    { label: "Site", Value: RowDataSr[0]?.siteid || " ", Key: 10 },
    {
      label: "Create WO Options",
      Value: RowDataSr[0]?.createwomulti || " ",
      Key: 11,
    },
  ];
  const UserInformation = [
    {
      label: "Requested By",
      Value: RowDataSr[0]?.affectedperson || " ",
      Key: 1,
      icon: true,
    },
    {
      label: "Created By",
      Value: RowDataSr[0]?.affectedperson || " ",
      Key: 2,
      icon: true,
    },
    {
      label: "Name",
      Value: RowDataSr[0]?.affectedperson || " ",
      Key: 3,
      icon: true,
    },
    { label: "Phone", Value: RowDataSr[0]?.affectedphone || " ", Key: 4 },
    { label: "E-mail", Value: RowDataSr[0]?.affectedemail || " ", Key: 5 },
  ];

  const dates1 = [
    { label: "Reported Date", Value: RowDataSr[0]?.reportdate || " ", Key: 1 },
    { label: "Created by", Value: RowDataSr[0]?.affecteddate || " ", Key: 2 },
  ];

  const dates2 = [
    {
      label: "Target Contact",
      Value: RowDataSr[0]?.targetcontactdate || " ",
      Key: 1,
    },
    { label: "Target Start", Value: RowDataSr[0]?.targetstart || " ", Key: 2 },
    {
      label: "Target Finish",
      Value: RowDataSr[0]?.targetfinish || " ",
      Key: 3,
    },
  ];

  const dates3 = [
    {
      label: "Actual Contact",
      Value: RowDataSr[0]?.actualcontactdate || " ",
      Key: 1,
    },
    { label: "Actual Start", Value: RowDataSr[0]?.actualstart || " ", Key: 2 },
    {
      label: "Actual Finish",
      Value: RowDataSr[0]?.actualfinish || " ",
      Key: 3,
    },
  ];

  const handleFileChange2 = (files) => {
    // console.log("Files uploaded:", files);
  };

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
                <Typography
                  sx={{fontSize: "0.9rem",fontWeight: 500,
                    color: "text.secondary",textAlign: "left",}}
                >  Service Request:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.ticketid}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    color: "text.primary", // default color
                    transition: "border-color 0.2s ease, color 0.2s ease",
                    "& .MuiInput-input": {
                      p: 0,
                      whiteSpace: "pre-line",
                      transition: "color 0.2s ease",
                    },
                    "&:focus-within": {
                      borderBottomColor: "var(--srExtend-navBar)", // border عند التركيز
                    },
                  }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "text.secondary",
                    textAlign: "left",
                  }}
                >
                  Summary:
                </Typography>

                <Input
                  fullWidth
                  value={statusValue}
                  onChange={(e) => {
                    const newValue = e.target.value;

                    // تحديث القيمة على شكل State محلي
                    setStatusValue(newValue);

                    // تخزين القيمة داخل setDataUpdate في الأب
                    setDataUpdate((prev) => ({
                      ...prev,
                      "spi:description": newValue, // ← هنا القيمة بتروح للـ Update API
                    }));
                  }}
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    color: "text.primary", // default color
                    transition: "border-color 0.2s ease, color 0.2s ease",
                    "& .MuiInput-input": {
                      p: 0,
                      whiteSpace: "pre-line",
                      transition: "color 0.2s ease",
                    },
                    "&:focus-within": {
                      borderBottomColor: "var(--srExtend-navBar)", // border عند التركيز
                    },
                  }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "text.secondary",
                    textAlign: "left",
                  }}
                >
                  Owner:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.owner || " "}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    color: "text.primary", // default color
                    transition: "border-color 0.2s ease, color 0.2s ease",
                    "& .MuiInput-input": {
                      p: 0,
                      whiteSpace: "pre-line",
                      transition: "color 0.2s ease",
                    },
                    "&:focus-within": {
                      borderBottomColor: "var(--srExtend-navBar)", // border عند التركيز
                    },
                  }}
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "text.secondary",
                    textAlign: "left",
                  }}
                >
                  Status:
                </Typography>

                <Input
                  fullWidth
                  value={RowDataSr[0]?.status || " "}
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                    fontSize: "0.875rem",
                    color: "text.primary", // default color
                    transition: "border-color 0.2s ease, color 0.2s ease",
                    "& .MuiInput-input": {
                      p: 0,
                      whiteSpace: "pre-line",
                      transition: "color 0.2s ease",
                    },
                    "&:focus-within": {
                      borderBottomColor: "var(--srExtend-navBar)", // border عند التركيز
                    },
                  }}
                />
              </Box>
            </Col>
          </Row>
        </CardContent>
      </Card>

      {/* ===== Section 1: Service Request Details ===== */}
      <AnimatedSection
        title="Service Request Details"
        isOpen={serviceRequestDetails}
        onToggle={toggleSRD}
      >
        <Row className="px-4 py-0 stats-section justify-content-center">
          <Col xs={12} md={5}>
            <SRUserInfo
              UserInformation={ServiceRequestDetails}
              setFormDate={setFormData}
            />
          </Col>
          <Col xs={12} md={4}>
            <SRUserInfo UserInformation={ServiceRequestDetails2} />
          </Col>
          <Col xs={12} md={3}>
            <SRUserInfo UserInformation={ServiceRequestDetails2} />
          </Col>
        </Row>
      </AnimatedSection>

      {/* ===== Section 2: User Information ===== */}
      <AnimatedSection
        title="User Information"
        isOpen={isUserInfoOpen}
        onToggle={toggleUserInfo}
      >
        <Row className="px-4 stats-section justify-content-center">
          <Col xs={12} md={6}>
            <SRUserInfo
              UserInformation={UserInformation2}
              icons={icons}
              DetailsList={DetailsList}
            />
          </Col>
          <Col xs={12} md={6}>
            <SRUserInfo
              UserInformation={UserInformation}
              icons={icons}
              DetailsList={DetailsList}
            />
          </Col>
        </Row>
      </AnimatedSection>

      {/* ===== Section 3: Dates ===== */}
      <AnimatedSection
        title="Dates"
        isOpen={isDatesOpen}
        onToggle={toggleDates}
      >
        <Row className="px-4 stats-section justify-content-center">
          <Col xs={12} md={4}>
            <SRUserInfo UserInformation={dates1} />
          </Col>
          <Col xs={12} md={4}>
            <SRUserInfo UserInformation={dates2} />
          </Col>
          <Col xs={12} md={4}>
            <SRUserInfo UserInformation={dates3} />
          </Col>
        </Row>
      </AnimatedSection>

      {/* ===== Section 4: Attachments ===== */}
      <AnimatedSection
        title="Attachments"
        isOpen={isAttachmentOpen}
        onToggle={toggleAttachment}
      >
        <AttachmentSection
          handleFileChange2={handleFileChange2}
          RowDataSr={RowDataSr}
          document={document}
        />
      </AnimatedSection>

      {/* ===== Section 4: Attachments ===== */}
      {/* <AnimatedSection
        title="QR Code"
        isOpen={isQROpen}
        onToggle={toggleQRCode}
      >
        <QRDisplay />
      </AnimatedSection> */}
    </>
  );
};

export default SRDetailsCom;

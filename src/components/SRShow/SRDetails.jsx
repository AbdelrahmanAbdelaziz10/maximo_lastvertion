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
import myImage from "../../assets/notfound.jpg";
import { useFetch } from "../../hooks/getFetch";
import AnimatedSection from "../ServesDetailsCom/AnimatedSection";
import QRDisplay from "../QRDisplay";
import { DetailsList } from "../../../Data/config.json";
import SearchIcon from "@mui/icons-material/Search";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PreviewIcon from "@mui/icons-material/Preview";
import dataBase from "../../../Data/config.json";
import AttachmentSection from "../ServesDetailsCom/AttachmentUploader";
import SRSectionDetails from "./SRSectionDetails";

const SRDetails = ({ RowDataSr }) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusValue, setStatusValue] = useState("");

  useEffect(() => {
    if (RowDataSr?.[0]?.description) {
      setStatusValue(RowDataSr[0].description);
    }
  }, [RowDataSr]);

  // console.log("data:", RowDataSr);

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
  const UserInformation2 = [];
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
    {
      label: "Reported By",
      Value: RowDataSr[0]?.reportedbyname || " ",
      Key: 6,
      icon: true,
    },
    {
      label: "Name",
      Value: RowDataSr[0]?.reportedbyname || " ",
      Key: 7,
      icon: true,
    },
    { label: "Phone", Value: RowDataSr[0]?.affectedphone || "", Key: 8 },
    { label: "E-mail", Value: RowDataSr[0]?.reportedemail || " ", Key: 9 },
  ];

 const dates1 = [
  {
    label: "Reported Date",
    Value: RowDataSr[0]?.reportdate
      ? new Date(RowDataSr[0].reportdate).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).replace(",", " ")
      : " ",
    Key: 1,
  },
  {
    label: "Requested Date",
    Value: RowDataSr[0]?.affecteddate
      ? new Date(RowDataSr[0].affecteddate).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).replace(",", " ")
      : " ",
    Key: 2,
  },
];


  const dates2 = [
    {
      label: "Target Contact",
      Value: RowDataSr[0]?.targetcontactdate
      ?new Date(RowDataSr[0]?.targetcontactdate).toLocaleDateString("en-GB",{
        day:"2-digit",
        month:"2-digit",
        year:"numeric",
        hour:"2-digit",
        minute:"2-digit",
        hour12:false,
      }) .replace(","," ")
      :" ",
      Key: 1,
    },
    { label: "Target Start", Value: RowDataSr[0]?.targetstart
      ? new Date(RowDataSr[0]?.targetstart).toLocaleDateString("en-GB",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).replace(","," ")
      : " ", Key: 2 },
    {
      label: "Target Finish",
      Value: RowDataSr[0]?.targetfinish
      ? new Date(RowDataSr[0]?.targetfinish).toLocaleDateString("en-GB",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).replace(","," ")
      : " ",
      Key: 3,
    },
  ];

  const dates3 = [
    {
      label: "Actual Contact",
      Value: RowDataSr[0]?.actualcontactdate 
      ? new Date(RowDataSr[0]?.actualcontactdate).toLocaleDateString("en-GB",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).replace(","," ")
      : " ",
      Key: 1,
    },
    { label: "Actual Start", Value: RowDataSr[0]?.actualstart 
      ? new Date(RowDataSr[0]?.actualstart).toLocaleDateString("en-GB",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).replace(","," ")
      : " ", Key: 2 },
    {
      label: "Actual Finish",
      Value: RowDataSr[0]?.actualfinish 
      ? new Date(RowDataSr[0]?.actualfinish).toLocaleDateString("en-GB",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).replace(","," ")
      : " ",
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
                <Typography className="input-text">Service Request:</Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.ticketid}
                  disableUnderline
                  className="input-general"
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Summary:</Typography>
                <Input
                  fullWidth
                  value={statusValue}
                  disableUnderline
                  className="input-general"
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Owner:</Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.owner || " "}
                  disableUnderline
                  className="input-general"
                />
              </Box>
            </Col>
            <Col xs={12} md={6} lg={2}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Status:</Typography>
                <Input
                  fullWidth
                  value={RowDataSr[0]?.status || ""}
                  disableUnderline
                  className="input-general"
                />
              </Box>
            </Col>
          </Row>
        </CardContent>
      </Card>

      {/* ===== Section 1: Service Request Details ===== */}
      <Row>
        <Col xs={12} md={8}>
          <AnimatedSection
            title="Service Request Details"
            isOpen={serviceRequestDetails}
            onToggle={toggleSRD}
          >
            <Row className="px-1 py-0 stats-section justify-content-center">
              <Col xs={12} md={6}>
                <SRSectionDetails UserInformation={ServiceRequestDetails} />
              </Col>
              <Col xs={12} md={6}>
                <SRSectionDetails UserInformation={ServiceRequestDetails2} />
              </Col>
              {/* <Col xs={12} md={3}>
            <SRSectionDetails UserInformation={ServiceRequestDetails2} />
          </Col> */}
            </Row>
          </AnimatedSection>
        </Col>

        {/* ===== Section 2: User Information ===== */}
        <Col xs={12} md={4}>
          <AnimatedSection
            title="User Information"
            isOpen={isUserInfoOpen}
            onToggle={toggleUserInfo}
          >
            <Row className="px-2 stats-section justify-content-center">
              <Col xs={12} md={12}>
                <SRSectionDetails
                  UserInformation={UserInformation}
                  icons={icons}
                  DetailsList={DetailsList}
                />
              </Col>
            </Row>
          </AnimatedSection>
        </Col>
      </Row>

      {/* ===== Section 2: User Information ===== */}
      {/* <AnimatedSection
        title="User Information"
        isOpen={isUserInfoOpen}
        onToggle={toggleUserInfo}
      >
        <Row className="px-4 stats-section justify-content-center">
          <Col xs={12} md={6}>
            <SRSectionDetails
              UserInformation={UserInformation2}
              icons={icons}
              DetailsList={DetailsList}
            />
          </Col>
          <Col xs={12} md={6}>
            <SRSectionDetails
              UserInformation={UserInformation}
              icons={icons}
              DetailsList={DetailsList}
            />
          </Col>
        </Row>
      </AnimatedSection> */}

      {/* ===== Section 3: Dates ===== */}
      <AnimatedSection
        title="Dates"
        isOpen={isDatesOpen}
        onToggle={toggleDates}
      >
        <Row className="px-4 stats-section justify-content-center">
          <Col xs={12} md={4}>
            <SRSectionDetails UserInformation={dates1} />
          </Col>
          <Col xs={12} md={4}>
            <SRSectionDetails UserInformation={dates2} />
          </Col>
          <Col xs={12} md={4}>
            <SRSectionDetails UserInformation={dates3} />
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

export default SRDetails;

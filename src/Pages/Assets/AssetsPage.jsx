import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableData from "../../components/Common/TableData";
import ReportsModal from "../../components/ReportsModal";
import AddIcon from "@mui/icons-material/Add";
import { Assignment, BarChart, EventAvailable } from "@mui/icons-material";
import { useFetch } from "../../hooks/getFetch";
import StaticData from "../../../Data/config.json"
import AssetTable from "../../components/AssetsCom/AssetTable";

const AssetsPage = () => {
  //=== Const State =====
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [tableTitle, setTableTitle] = useState("Total Assets");

  // === State variables ===
  const [filter, setFilter] = useState("1");
  const [srDataTwo, setSrDataTwo] = useState([]);
  const [reportedBy, SetReportedBy] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
const [userData, setUserData] = useState(null);


  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem("UserInfo");
  
      if (!storedUserInfo) return;
  
      const parsedData = JSON.parse(storedUserInfo);
  
      setUserName(parsedData?.username ?? "");
      setPassword(parsedData?.password ?? "");
      setUserData(parsedData?.userData ?? null);

    } catch (error) {
      console.error("Failed to parse UserInfo from localStorage", error);
    }
  }, []);

  
  // لما userData تتغير اطبع الـ value
  useEffect(() => {
    if (userData) {
      SetReportedBy( userData["spi:userName"]);
    }
  }, [userData]);


  // === Dropdown actions ===
  const handleAction = (action) => {
    switch (action) {
      case "changeStatus":
        console.log("Changing status...");
        break;
      case "selectOwner":
        console.log("Selecting owner...");
        break;
      case "takeOwnership":
        console.log("Taking ownership...");
        break;
      case "runReports":
        setShowReportsModal(true);
        break;
      case "cognosAnalytics":
        console.log("Opening Cognos Analytics...");
        break;
      default:
        break;
    }
  };


 
  // === Fetch SR data ===
  const {
    data: sRData,
    loading: srLoading,
    error: srError,
  } = useFetch(
    userName && password
      ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=REPORTEDBY=%22${reportedBy}%22&_lid=${userName}&_lpwd=${password}`
      : null
  );

  // console.log("assets data:", sRData)
   // === Prepare data ===
  const allSRData = sRData?.member ?? [];


      const ShowTotalSr = (value) => {
    setFilter(value);

    if (value === "1") {
      setSrDataTwo(allSRData);
      setTableTitle("Total Assets");
    } 
  };


  // === Stats Data ===
  const stats = [
    {
      label: "Total Assets",
      value: allSRData.length,
      accentColor: "#157091", // Muted green
      icon: <Assignment className="stat-icon" style={{ color: "#157091" }} />,
      filter: "1",
    },
    {
      label: "Linked By Loc",
      value: 20,
      accentColor: "#d98a8a", // Muted red/pink
      icon: <BarChart className="stat-icon" style={{ color: "#b34d4d" }} />,
      filter: "2",
    },
    
  ];



  return (
    <div className="app-container mb-5">
      <Box
        component="main"
        sx={{
          transition: "margin 0.3s ease",
        }}
      >
        {/* ===== Header ===== */}
        <Row className="sr-header align-items-center g-3 my-4">
          <Col xs={12} md={4}>
            <h4 className="sr-title">Assets </h4>
          </Col>

          <Col xs={12} md={4} className="d-flex justify-content-md-center">
            <Dropdown>
              <Dropdown.Toggle className="sr-button">
                Select Action
                {/* <ArrowDropDownIcon /> */}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleAction("changeStatus")}>
                  Change Status
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAction("selectOwner")}>
                  Select Owner
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAction("takeOwnership")}>
                  Take Ownership
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleAction("runReports")}>
                  Run Reports
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAction("cognosAnalytics")}>
                  Cognos Analytics
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col xs={12} md={4} className="d-flex justify-content-md-end">
            <Link to="/create-SR" className="sr-button">
              <AddIcon fontSize="small" />
              <span>Create Assets</span>
            </Link>
          </Col>
        </Row>

        {/* ===== Stats Cards ===== */}
        {/* <Row className="mb-4">
          <Col lg={12} md={10}>
            <Grid container spacing={2}>
              {stats.map((item, index) => (
                <Grid size={2} key={index}>
                  <Box
                    className="stat-card-container"
                    style={{ borderBottomColor: item.accentColor }}
                    onClick={() => ShowTotalSr(item.filter)}
                  >
                    <Box>
                      <Typography className="stat-label">
                        {item.label}
                      </Typography>
                      <Typography className="stat-value">
                        {item.value}
                      </Typography>
                    </Box>
                    {item.icon}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Col>
        </Row> */}

        {/* ===== Tables ===== */}
        {srLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              minHeight: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <AssetTable
            loading={srLoading}
            error={srError}
            srDataTwo={srDataTwo}
            ColorTable="var(--srTotal-header)"
            routePage={"service-request"}
            update={"update-SR"}
            tableHeader={tableTitle} // ✅ هنا
          />
        )}

        {/* Reports Modal */}
        {showReportsModal && (
          <ReportsModal
            show={showReportsModal}
            onHide={() => setShowReportsModal(false)}
            reportType="SR"
          />
        )}
      </Box>
    </div>
  );
};

export default AssetsPage;

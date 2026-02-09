// ✅ ServiceRequest.jsx — Final Version

import { useEffect, useState } from "react";
import { Col, Row, Dropdown } from "react-bootstrap";
import { Box, Typography, Grid, CircularProgress, Tooltip } from "@mui/material";
import { Assignment, BarChart, EventAvailable } from "@mui/icons-material";
import { Link } from "react-router-dom";
import TableData from "../../components/Common/TableData";
import { useSidebar } from "../../components/Context/SidebarContext";
import AddIcon from "@mui/icons-material/Add";
import ReportsModal from "../../components/ReportsModal";
import { useFetch } from "../../hooks/getFetch";
import WFTableData from "../../components/Common/WFTableData";
import "../../Style/ServiceRequest.css";
import { motion, AnimatePresence } from "framer-motion";
import SaveIcon from "@mui/icons-material/Save";
import { IoMdCreate } from "react-icons/io";
import { useSRData } from "../../components/Context/SRDataContext";

const ServiceRequest = () => {
  const { setSrData, setTableTitle } = useSRData();
// const [tableTitle, setTableTitle] = useState("Total Service Request");



const ShowTotalSr = (value) => {
  setFilter(value);
};


  // === State variables ===
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [filter, setFilter] = useState("1");
  // const [srDataTwo, setSrDataTwo] = useState([]);
  const [color, setColor] = useState("linear-gradient(135deg, #ff9a9e, #f6416c)");
  const [showReportsModal, setShowReportsModal] = useState(false);
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [userData, setUserData] = useState(null);
const [reportedBy, SetReportedBy] = useState(null);

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


  // ✅ Get start & finish of current day
  const getStartDate = () => {
    const date = new Date();
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T00:00:00"
    );
  };

  const getFinishDate = () => {
    const date = new Date();
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T23:59:59"
    );
  };

  // ✅ Initialize start and end date only once
  useEffect(() => {
    setStartDateTime(getStartDate());
    setEndDateTime(getFinishDate());
  }, []);


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

  const {
    data: wfSRData,
    loading: wfSrLoading,
    error: wfSrError,
  } = useFetch(
    startDateTime && userName && password
      ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALWFASSIGN?lean=1&oslc.select=*&oslc.where=sr.targetfinish%3C%22${startDateTime}%22&_lid=${userName}&_lpwd=${password}`
      : null
  );

  const {
    data: dueDay,
    loading: dDSrLoading,
    error: dDSrError,
  } = useFetch(
    startDateTime && endDateTime && userName && password
      ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALWFASSIGN?lean=1&oslc.select=*&oslc.where=sr.targetfinish%3E=%22${startDateTime}%22%20and%20sr.targetfinish%3C=%22${endDateTime}%22&_lid=${userName}&_lpwd=${password}`
      : null
  );
  // console.log(`http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=REPORTEDBY=%22HELPDESK1%22&_lid=${userName}&_lpwd=${password}`)

  // === Prepare data ===
  const allSRData = sRData?.member ?? [];
  const allWFOverdue = wfSRData?.member ?? [];
  const allWFDueToday = dueDay?.member ?? [];

//   useEffect(() => {
//   setSrData(allSRData);
//   setTableTitle("Total Service Request");
// }, [allSRData]);

useEffect(() => {
  if (filter === "1") {
    setSrData(allSRData);
    setTableTitle("Total Service Request");
  } 
  else if (filter === "2") {
    setSrData(allWFOverdue);
    setTableTitle("Overdue Service Request");
  } 
  else if (filter === "3") {
    setSrData(allWFDueToday);
    setTableTitle("Due Today Service Request");
  }
}, [filter, allSRData, allWFOverdue, allWFDueToday]);

      // console.log( "Context Data:",allSRData );

  // === Sidebar ===
  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;

  // === Color change on card click ===
  const changeColor = (value) => {
    setColor(value);
  };

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

  // === Stats Data ===
  const stats = [
    {
      label: "Total SR",
      value: allSRData.length,
      accentColor: "#157091", // Muted green
      icon: <Assignment className="stat-icon" style={{ color: "#157091" }} />,
      filter: "1",
    },
    {
      label: "Overdue",
      value: allWFOverdue.length,
      accentColor: "#d98a8a", // Muted red/pink
      icon: <BarChart className="stat-icon" style={{ color: "#b34d4d" }} />,
      filter: "2",
    },
    {
      label: "Due Today",
      value: allWFDueToday.length,
      accentColor: "#e6c384", // Muted yellow/gold
      icon: <EventAvailable className="stat-icon" style={{ color: "#a68a4b" }} />,
      filter: "3",
    },
  ];


    console.log("filter Data:",filter)

  // === UI ===
  return (
    <div className="app-container mb-0">
      <Box
        component="main"
        sx={{
          transition: "margin 0.3s ease",
        }}
      >

{/* ===== Header ===== */}
      <Row className="sr-header align-items-center g-3 my-4 mt-0">
        <Col xs={12} md={8}>
          <h4 className="sr-title">Service Request </h4>
        </Col>
{/* 
        <Col xs={12} md={4} className="d-flex justify-content-md-center">
          <Dropdown>
            <Dropdown.Toggle className="sr-button">
              Select Action
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleAction("changeStatus")}>Change Status</Dropdown.Item>
              <Dropdown.Item onClick={() => handleAction("selectOwner")}>Select Owner</Dropdown.Item>
              <Dropdown.Item onClick={() => handleAction("takeOwnership")}>Take Ownership</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handleAction("runReports")}>Run Reports</Dropdown.Item>
              <Dropdown.Item onClick={() => handleAction("cognosAnalytics")}>Cognos Analytics</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col> */}

        <Col xs={12} md={4} className="d-flex justify-content-md-end">
                    <Link to="/create-SR" >
        <Tooltip title="Save" arrow placement="bottom">
                      <motion.div
                        className="print-iconBox create_sr"
                        whileTap={{ scale: 0.9, y: 3 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <IoMdCreate 
                          className="printer-icon"
                        />
                        Create Service Request
                      </motion.div>
                    </Tooltip>
                    </Link>
          {/* <Link to="/create-SR" className="sr-button">
            <AddIcon fontSize="small" />
            <span>Create Service Request</span>
          </Link> */}
        </Col>
      </Row>

      {/* ===== Stats Cards ===== */}
      <Row className="mb-4">
        <Col lg={6} md={10}>
          <Grid container spacing={2}>
            {stats.map((item, index) => (
              <Grid size={4} key={index}>
                <Box
                  className="stat-card-container"
                  style={{ borderBottomColor: item.accentColor }}
                  onClick={() => ShowTotalSr(item.filter)}
                >
                  <Box>
                    <Typography className="stat-label">{item.label}</Typography>
                    <Typography className="stat-value">{item.value}</Typography>
                  </Box>
                  {item.icon}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Col>
      </Row>

          {/* ===== Tables ===== */}
{(srLoading || wfSrLoading || dDSrLoading) ? (
  <Box sx={{ display: "flex", justifyContent: "center", minHeight: "300px" }}>
    <CircularProgress />
  </Box>
) : (
  filter === "1" ? (
    <TableData
      loading={srLoading}
      error={srError}
      // srDataTwo={srDataTwo}
      ColorTable="var(--srTotal-header)"
      routePage={"service-request"}
      update={"update-SR"}
      // tableHeader="Total Service Request" 
    />
  ) : filter === "2" ? (
    <WFTableData
      loading={wfSrLoading}
      error={wfSrError}
      // srDataTwo={srDataTwo}
      ColorTable="var(--srTotal-header)"
            routePage={"service-request"}
      // routePage={"service-request"}
      // update={"update-SR"}
      // tableHeader={tableTitle} // ✅ هنا
    />
  ) : filter === "3" ? (
    <WFTableData
      loading={dDSrLoading}
      error={dDSrError}
      // srDataTwo={srDataTwo}
      ColorTable="var(--srTotal-header)"
      // tableHeader={tableTitle} // ✅ هنا
    />
  ) : null
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

export default ServiceRequest;







// ✅ ServiceRequest.jsx — Final Version

// import { useEffect, useState } from "react";
// import { Col, Row, Dropdown } from "react-bootstrap";
// import { Box, Typography, Grid, CircularProgress, Tooltip } from "@mui/material";
// import { Assignment, BarChart, EventAvailable } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import TableData from "../../components/Common/TableData";
// import { useSidebar } from "../../components/Context/SidebarContext";
// import AddIcon from "@mui/icons-material/Add";
// import ReportsModal from "../../components/ReportsModal";
// import { useFetch } from "../../hooks/getFetch";
// import WFTableData from "../../components/Common/WFTableData";
// import "../../Style/ServiceRequest.css";
// import { motion, AnimatePresence } from "framer-motion";
// import SaveIcon from "@mui/icons-material/Save";
// import { IoMdCreate } from "react-icons/io";

// const ServiceRequest = () => {
// const [tableTitle, setTableTitle] = useState("Total Service Request");
// const ShowTotalSr = (value) => {
//   setFilter(value);

//   if (value === "1") {
//     setSrDataTwo(allSRData);
//     setTableTitle("Total Service Request");
//   } else if (value === "2") {
//     setSrDataTwo(allWFOverdue);
//     setTableTitle("Overdue Service Request");
//   } else if (value === "3") {
//     setSrDataTwo(allWFDueToday);
//     setTableTitle("Due Today Service Request");
//   }
// };


//   // === State variables ===
//   const [startDateTime, setStartDateTime] = useState("");
//   const [endDateTime, setEndDateTime] = useState("");
//   const [filter, setFilter] = useState("1");
//   const [srDataTwo, setSrDataTwo] = useState([]);
//   const [color, setColor] = useState("linear-gradient(135deg, #ff9a9e, #f6416c)");
//   const [showReportsModal, setShowReportsModal] = useState(false);
// const [userName, setUserName] = useState("");
// const [password, setPassword] = useState("");
// const [userData, setUserData] = useState(null);
// const [reportedBy, SetReportedBy] = useState(null);

// useEffect(() => {
//   try {
//     const storedUserInfo = localStorage.getItem("UserInfo");

//     if (!storedUserInfo) return;

//     const parsedData = JSON.parse(storedUserInfo);

//     setUserName(parsedData?.username ?? "");
//     setPassword(parsedData?.password ?? "");
//     setUserData(parsedData?.userData ?? null);

//   } catch (error) {
//     console.error("Failed to parse UserInfo from localStorage", error);
//   }
// }, []);

// // لما userData تتغير اطبع الـ value
// useEffect(() => {
//   if (userData) {
//     SetReportedBy( userData["spi:userName"]);
//   }
// }, [userData]);


//   // ✅ Get start & finish of current day
//   const getStartDate = () => {
//     const date = new Date();
//     const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
//     return (
//       date.getFullYear() +
//       "-" +
//       pad(date.getMonth() + 1) +
//       "-" +
//       pad(date.getDate()) +
//       "T00:00:00"
//     );
//   };

//   const getFinishDate = () => {
//     const date = new Date();
//     const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
//     return (
//       date.getFullYear() +
//       "-" +
//       pad(date.getMonth() + 1) +
//       "-" +
//       pad(date.getDate()) +
//       "T23:59:59"
//     );
//   };

//   // ✅ Initialize start and end date only once
//   useEffect(() => {
//     setStartDateTime(getStartDate());
//     setEndDateTime(getFinishDate());
//   }, []);


//   // === Fetch SR data ===
// const {
//   data: sRData,
//   loading: srLoading,
//   error: srError,
// } = useFetch(
//   userName && password
//     ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=REPORTEDBY=%22${reportedBy}%22&_lid=${userName}&_lpwd=${password}`
//     : null
// );

//   const {
//     data: wfSRData,
//     loading: wfSrLoading,
//     error: wfSrError,
//   } = useFetch(
//     startDateTime && userName && password
//       ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALWFASSIGN?lean=1&oslc.select=*&oslc.where=sr.targetfinish%3C%22${startDateTime}%22&_lid=${userName}&_lpwd=${password}`
//       : null
//   );

//   const {
//     data: dueDay,
//     loading: dDSrLoading,
//     error: dDSrError,
//   } = useFetch(
//     startDateTime && endDateTime && userName && password
//       ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALWFASSIGN?lean=1&oslc.select=*&oslc.where=sr.targetfinish%3E=%22${startDateTime}%22%20and%20sr.targetfinish%3C=%22${endDateTime}%22&_lid=${userName}&_lpwd=${password}`
//       : null
//   );
//   // console.log(`http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=REPORTEDBY=%22HELPDESK1%22&_lid=${userName}&_lpwd=${password}`)

//   // === Prepare data ===
//   const allSRData = sRData?.member ?? [];
//   const allWFOverdue = wfSRData?.member ?? [];
//   const allWFDueToday = dueDay?.member ?? [];
//   useEffect(() => {
//     setSrDataTwo(allSRData);
//   }, [sRData]);
//       console.log( "allSRData:",allSRData );

//   // === Sidebar ===
//   const { sidebarOpen } = useSidebar();
//   const sidebarWidth = sidebarOpen ? 220 : 65;

//   // === Color change on card click ===
//   const changeColor = (value) => {
//     setColor(value);
//   };

//   // === Dropdown actions ===
//   const handleAction = (action) => {
//     switch (action) {
//       case "changeStatus":
//         console.log("Changing status...");
//         break;
//       case "selectOwner":
//         console.log("Selecting owner...");
//         break;
//       case "takeOwnership":
//         console.log("Taking ownership...");
//         break;
//       case "runReports":
//         setShowReportsModal(true);
//         break;
//       case "cognosAnalytics":
//         console.log("Opening Cognos Analytics...");
//         break;
//       default:
//         break;
//     }
//   };

//   // === Stats Data ===
//   const stats = [
//     {
//       label: "Total SR",
//       value: allSRData.length,
//       accentColor: "#157091", // Muted green
//       icon: <Assignment className="stat-icon" style={{ color: "#157091" }} />,
//       filter: "1",
//     },
//     {
//       label: "Overdue",
//       value: allWFOverdue.length,
//       accentColor: "#d98a8a", // Muted red/pink
//       icon: <BarChart className="stat-icon" style={{ color: "#b34d4d" }} />,
//       filter: "2",
//     },
//     {
//       label: "Due Today",
//       value: allWFDueToday.length,
//       accentColor: "#e6c384", // Muted yellow/gold
//       icon: <EventAvailable className="stat-icon" style={{ color: "#a68a4b" }} />,
//       filter: "3",
//     },
//   ];

//   // === UI ===
//   return (
//     <div className="app-container mb-0">
//       <Box
//         component="main"
//         sx={{
//           transition: "margin 0.3s ease",
//         }}
//       >

// {/* ===== Header ===== */}
//       <Row className="sr-header align-items-center g-3 my-4 mt-0">
//         <Col xs={12} md={8}>
//           <h4 className="sr-title">Service Request </h4>
//         </Col>
// {/* 
//         <Col xs={12} md={4} className="d-flex justify-content-md-center">
//           <Dropdown>
//             <Dropdown.Toggle className="sr-button">
//               Select Action
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => handleAction("changeStatus")}>Change Status</Dropdown.Item>
//               <Dropdown.Item onClick={() => handleAction("selectOwner")}>Select Owner</Dropdown.Item>
//               <Dropdown.Item onClick={() => handleAction("takeOwnership")}>Take Ownership</Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item onClick={() => handleAction("runReports")}>Run Reports</Dropdown.Item>
//               <Dropdown.Item onClick={() => handleAction("cognosAnalytics")}>Cognos Analytics</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Col> */}

//         <Col xs={12} md={4} className="d-flex justify-content-md-end">
//                     <Link to="/create-SR" >
//         <Tooltip title="Save" arrow placement="bottom">
//                       <motion.div
//                         className="print-iconBox create_sr"
//                         whileTap={{ scale: 0.9, y: 3 }}
//                         whileHover={{ scale: 1.05 }}
//                         transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                       >
//                         <IoMdCreate 
//                           className="printer-icon"
//                         />
//                         Create Service Request
//                       </motion.div>
//                     </Tooltip>
//                     </Link>
//           {/* <Link to="/create-SR" className="sr-button">
//             <AddIcon fontSize="small" />
//             <span>Create Service Request</span>
//           </Link> */}
//         </Col>
//       </Row>

//       {/* ===== Stats Cards ===== */}
//       <Row className="mb-4">
//         <Col lg={6} md={10}>
//           <Grid container spacing={2}>
//             {stats.map((item, index) => (
//               <Grid size={4} key={index}>
//                 <Box
//                   className="stat-card-container"
//                   style={{ borderBottomColor: item.accentColor }}
//                   onClick={() => ShowTotalSr(item.filter)}
//                 >
//                   <Box>
//                     <Typography className="stat-label">{item.label}</Typography>
//                     <Typography className="stat-value">{item.value}</Typography>
//                   </Box>
//                   {item.icon}
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Col>
//       </Row>

//           {/* ===== Tables ===== */}
// {(srLoading || wfSrLoading || dDSrLoading) ? (
//   <Box sx={{ display: "flex", justifyContent: "center", minHeight: "300px" }}>
//     <CircularProgress />
//   </Box>
// ) : (
//   filter === "1" ? (
//     <TableData
//       loading={srLoading}
//       error={srError}
//       srDataTwo={srDataTwo}
//       ColorTable="var(--srTotal-header)"
//       routePage={"service-request"}
//       update={"update-SR"}
//       tableHeader="Total Service Request" 
//     />
//   ) : filter === "2" ? (
//     <WFTableData
//       loading={wfSrLoading}
//       error={wfSrError}
//       srDataTwo={srDataTwo}
//       ColorTable="var(--srTotal-header)"
//             routePage={"service-request"}
//       // routePage={"service-request"}
//       // update={"update-SR"}
//       tableHeader={tableTitle} // ✅ هنا
//     />
//   ) : filter === "3" ? (
//     <WFTableData
//       loading={dDSrLoading}
//       error={dDSrError}
//       srDataTwo={srDataTwo}
//       ColorTable="var(--srTotal-header)"
//       tableHeader={tableTitle} // ✅ هنا
//     />
//   ) : null
// )}



//           {/* Reports Modal */}
//           {showReportsModal && (
//             <ReportsModal
//               show={showReportsModal}
//               onHide={() => setShowReportsModal(false)}
//               reportType="SR"
//             />
//           )}
//       </Box>
//     </div>
//   );
// };

// export default ServiceRequest;

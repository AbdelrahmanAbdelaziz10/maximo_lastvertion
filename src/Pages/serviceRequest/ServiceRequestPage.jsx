import { useParams, useNavigate } from "react-router-dom";
import { useSidebar } from "../../components/Context/SidebarContext";
import { Box } from "@mui/material";
import "../../Style/SRPaggesDetails.css";
import SRMap from "../../components/ServesDetailsCom/SRMap";
import { useFetch } from "../../hooks/getFetch";
import ExtendNavBarTabs from "../../components/ServesDetailsCom/ExtendNavBarTabs";
import SRDetailsCom from "../../components/ServesDetailsCom/SRDetailsCom";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../components/Context/AuthContext";
import SRAddress from "../../components/ServesDetailsCom/SRAddress";
import SRSpecifications from "../../components/ServesDetailsCom/SRSpecifications";
import SRLog from "../../components/ServesDetailsCom/SRLog";
import QRDisplay from "../../components/QRDisplay";
import SRRelatedRecords from "../../components/ServesDetailsCom/SRRelatedRecords";
import printerImage from "../../assets/printer-icon.png";
// 👍 استيراد API_BASE
import { SR_API } from "../../config/api";
import SRDetails from "../../components/SRShow/SRDetails";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ReportsModal from "../../components/ReportsModal";
import Pops from "../../components/Common/Pops";
import MapCom from "../../components/ServesDetailsCom/MapCom";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Snackbar, Alert } from "@mui/material";
import { FaRoute } from "react-icons/fa6";

const tabs = [
  "Service Request",
  "Related Records",
  "Log",
  // "Specifications",
  // "Service Address",
  // "Map",
  // "QR Code",
];

const ServiceRequestPage = () => {
  const { id } = useParams();
  const [srId, setSrId] = useState(id);
  const navigate = useNavigate();
  const { username, userId, password } = useAuth();
  const { sidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = React.useState(0);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [map, setMap] = useState(false);

  const sidebarWidth = sidebarOpen ? 220 : 65;

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("UserInfo");
    if (stored) {
      const info = JSON.parse(stored);
      setUserName(info.username);
      setUserPassword(info.password);
    }
  }, []);

  {/* for next and Previous id  */}
  const changeSR = (direction) => {
  if (!srId) return;

  // SR-12 → 12
  const match = srId.match(/\d+/);
  if (!match) return;

  const currentNumber = parseInt(match[0], 10);
  const newNumber =
    direction === "next" ? currentNumber + 1 : currentNumber - 1;

  if (newNumber <= 0) return;

  const newSRId = `SR-${newNumber}`;

  setSrId(newSRId);
  navigate(`/service-request/${newSRId}`);
};

  // 🎯 URL النهائي بدون كتابة IP
  const SR_URL = `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=ticketid=%22${srId}%22&_lid=${userName}&_lpwd=${userPassword}`;
  const SR_URL1 = `http://192.168.0.73:9080/maxrest/oslc/os/MXSR?lean=1&oslc.select=*&oslc.where=ticketid=%22SR-12%22&_lid=Helpdesk%201&_lpwd=Test1234`;
  const {
    data: SRDataRow,
    loading: SRLoadingRow,
    error: SRErrorRow,
  } = useFetch(SR_URL);

  const RowDataSr = SRDataRow?.member ?? [];

  // console.log("data:",SRDataRow)

  const tabContents = [
    <SRDetails RowDataSr={RowDataSr} />,
    <SRRelatedRecords RowDataSr={RowDataSr} Id={srId} />,
    <SRLog RowDataSr={RowDataSr} />,
    // <SRSpecifications RowDataSr={RowDataSr} />,
    <SRAddress RowDataSr={RowDataSr} />,
    <SRMap />,
    // <QRDisplay
    //   qrUrl={`${window.location.origin}/maximo/service-request/${id}`}
    // />,
  ];

  return (
    <div className="mb-2">
      <ExtendNavBarTabs
        routePage={"service-request"}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Box sx={{ mt: 1, minHeight: 300 }}>
        {/* The button of work flow of SR*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: 2,
              gap: 1,
            }}
          >
            <Tooltip title="Previous SR" arrow placement="bottom">
              <motion.div
                className="print-iconBox"
                whileTap={{ scale: 0.9, y: 3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <SkipPreviousIcon
  className="printer-icon"
  onClick={() => changeSR("prev")}
/>
              </motion.div>
            </Tooltip>

            <Tooltip title="Save" arrow placement="bottom">
              <motion.div
                className="print-iconBox"
                whileTap={{ scale: 0.9, y: 3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <SaveIcon
                  className="printer-icon"
                />
              </motion.div>
            </Tooltip>

            <Tooltip title="Next SR" arrow placement="bottom">
              <motion.div
                className="print-iconBox"
                whileTap={{ scale: 0.9, y: 3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <SkipNextIcon
  className="printer-icon"
  onClick={() => changeSR("next")}
/>
              </motion.div>
            </Tooltip>
             <Tooltip title="Route Workflow" arrow placement="bottom">
              <motion.div
                className="print-iconBox"
                whileTap={{ scale: 0.9, y: 3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <FaRoute 
  className="printer-icon"
/>
              </motion.div>
            </Tooltip>
          </Box>
          {/* Header Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 2,
              gap: 1,
            }}
          >
            <Tooltip title="Scan QR" arrow placement="bottom">
              <motion.div
                className="print-iconBox"
                whileTap={{ scale: 0.9, y: 3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <QrCodeScannerIcon
                  className="printer-icon"
                  onClick={() => setShowReportsModal(true)}
                />
              </motion.div>
            </Tooltip>

            <Tooltip title="Show Location" arrow placement="bottom">
              <motion.div
                className="print-iconBox"
                whileTap={{ scale: 0.9, y: 3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <AddLocationAltIcon
                  className="printer-icon"
                  onClick={() => {
                    setShowReportsModal(true);
                    setMap(true);
                  }}
                />
              </motion.div>
            </Tooltip>

            <Tooltip title="Print" arrow placement="bottom">
              <motion.div
                className="print-iconBox"
                whileTap={{ scale: 0.9, y: 3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <img
                  src={printerImage}
                  alt="printer icon"
                  className="printer-icon"
                />
              </motion.div>
            </Tooltip>
          </Box>
        </Box>

        {/* Content */}
        {tabContents[activeTab]}

        {showReportsModal &&
          (map ? (
            <Pops
              Title="QR code For Service Request"
              component={<MapCom />}
              id={id}
              show={showReportsModal}
              onHide={() => {
                setShowReportsModal(false);
                setMap(false);
              }}
              reportType="SR"
            />
          ) : (
            <Pops
              Title="QR code For Service Request"
              component={
                <QRDisplay
                  qrUrl={`${window.location.origin}/maximo/service-request/${id}`}
                />
              }
              id={id}
              show={showReportsModal}
              onHide={() => setShowReportsModal(false)}
              reportType="SR"
            />
          ))}
      </Box>
    </div>
  );
};

export default ServiceRequestPage;

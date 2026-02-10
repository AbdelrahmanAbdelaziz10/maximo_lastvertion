import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Tooltip } from "@mui/material";
import { SkipNext, SkipPrevious, Save } from "@mui/icons-material";
import { IoMdCreate } from "react-icons/io";
import { FaRoute } from "react-icons/fa6";
import { motion } from "framer-motion";

import { useSidebar } from "../../components/Context/SidebarContext";
import { useAuth } from "../../components/Context/AuthContext";
import { useSRData } from "../../components/Context/SRDataContext";
import { useFetch } from "../../hooks/getFetch";

import ExtendNavBarTabs from "../../components/ServesDetailsCom/ExtendNavBarTabs";
import SRDetails from "../../components/SRShow/SRDetails";
import SRRelatedRecords from "../../components/ServesDetailsCom/SRRelatedRecords";
import SRLog from "../../components/ServesDetailsCom/SRLog";
import SRAddress from "../../components/ServesDetailsCom/SRAddress";
import SRMap from "../../components/ServesDetailsCom/SRMap";
import QRDisplay from "../../components/QRDisplay";
import Pops from "../../components/Common/Pops";
import MapCom from "../../components/ServesDetailsCom/MapCom";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import printerImage from "../../assets/printer-icon.png";
import "../../Style/SRPaggesDetails.css";

const tabs = ["Service Request", "Related Records", "Log"];

// ✅ استخراج ticketid سواء Total SR أو Overdue SR
const getTicketId = (item) => item?.ticketid || item?.sr?.[0]?.ticketid || null;

const ServiceRequestPage = () => {
  const { srData } = useSRData();
  const { id } = useParams();
  const [srId, setSrId] = useState(null);
  const navigate = useNavigate();
  const { username } = useAuth();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { sidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState(0);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [map, setMap] = useState(false);

  // ✅ بيانات اليوزر
  useEffect(() => {
    const stored = localStorage.getItem("UserInfo");
    if (stored) {
      const info = JSON.parse(stored);
      setUserName(info.username);
      setUserPassword(info.password);
    }
  }, []);

  // ✅ تحديد SR ID من context أو URL
  useEffect(() => {
    if (!srData?.length) return;

    const exists = srData.find((item) => getTicketId(item) === id);

    if (exists) {
      setSrId(getTicketId(exists));
    } else {
      const firstId = getTicketId(srData[0]);
      if (!firstId) return;

      setSrId(firstId);
      navigate(`/service-request/${firstId}`, { replace: true });
    }
  }, [id, srData, navigate]);

  // ✅ Next / Previous navigation
  const changeSR = (direction) => {
    if (!srId || !srData?.length) return;

    const currentIndex = srData.findIndex(
      (item) => getTicketId(item) === srId
    );

    if (currentIndex === -1) return;

    const newIndex = direction === "next"
      ? currentIndex + 1
      : currentIndex - 1;

    if (newIndex < 0 || newIndex >= srData.length) return;

    const newId = getTicketId(srData[newIndex]);
    if (!newId) return;

    setSrId(newId);
    navigate(`/service-request/${newId}`);
  };

  // ✅ Fetch SR Details
  const SR_URL = srId
    ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=ticketid=%22${srId}%22&_lid=${userName}&_lpwd=${userPassword}`
    : null;

  const { data: SRDataRow } = useFetch(SR_URL);
  const RowDataSr = SRDataRow?.member ?? [];

  const tabContents = [
    <SRDetails RowDataSr={RowDataSr} />,
    <SRRelatedRecords RowDataSr={RowDataSr} Id={srId} />,
    <SRLog RowDataSr={RowDataSr} />,
    <SRAddress RowDataSr={RowDataSr} />,
    <SRMap />,
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Link to="/create-SR">
              <Tooltip title="Create New" arrow>
                <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                  <IoMdCreate className="printer-icon" />
                </motion.div>
              </Tooltip>
            </Link>

            <Tooltip title="Save" arrow>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                <Save className="printer-icon" />
              </motion.div>
            </Tooltip>

            <Tooltip title="Previous SR" arrow>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                <SkipPrevious onClick={() => changeSR("prev")} className="printer-icon" />
              </motion.div>
            </Tooltip>

            <Tooltip title="Next SR" arrow>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                <SkipNext onClick={() => changeSR("next")} className="printer-icon" />
              </motion.div>
            </Tooltip>

            <Tooltip title="Route Workflow" arrow>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                <FaRoute className="printer-icon" />
              </motion.div>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Scan QR" arrow>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                <QrCodeScannerIcon onClick={() => setShowReportsModal(true)} className="printer-icon" />
              </motion.div>
            </Tooltip>

            <Tooltip title="Show Location" arrow>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                <AddLocationAltIcon
                  onClick={() => {
                    setShowReportsModal(true);
                    setMap(true);
                  }}
                  className="printer-icon"
                />
              </motion.div>
            </Tooltip>

            <Tooltip title="Print" arrow>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                <img src={printerImage} alt="printer" className="printer-icon" />
              </motion.div>
            </Tooltip>
          </Box>
        </Box>

        {tabContents[activeTab]}

        {showReportsModal &&
          (map ? (
            <Pops
              Title="QR code For Service Request"
              component={<MapCom />}
              id={srId}
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
              component={<QRDisplay qrUrl={`${window.location.origin}/maximo/service-request/${srId}`} />}
              id={srId}
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
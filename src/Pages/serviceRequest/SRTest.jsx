import React, { useEffect, useState } from 'react'
import ExtendNavBarTabs from '../../components/ServesDetailsCom/ExtendNavBarTabs';
import { Box , Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdCreate } from 'react-icons/io';
import { Save } from 'lucide-react';
import { SkipNext, SkipPrevious } from '@mui/icons-material';
import { FaRoute } from 'react-icons/fa6';
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import printerImage from "../../assets/printer-icon.png";
import { useSRData } from "../../components/Context/SRDataContext";
import { motion } from "framer-motion";
import SRForm from '../../components/SrTest/SRForm';
import { useFetch } from '../../hooks/getFetch';
import { useAuth } from '../../components/Context/AuthContext';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';



const SRTest = () => {
const [mode, setMode] = useState("view"); 

const tabs = ["Service Request", "Related Records", "Log"];
const getTicketId = (item) => item?.ticketid || item?.sr?.[0]?.ticketid || null;

const { srData, currentSrId: srId, setCurrentSrId } = useSRData();

  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
      const [showReportsModal, setShowReportsModal] = useState(false);
      const [map, setMap] = useState(false);
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

    setCurrentSrId(newId);
    navigate(`/service-request/${newId}`);
  };

  // ===== Form State =====
   const [formData, setFormData] = useState({
    DESCRIPTION: "",
    LOCATION: "",
    EXEDEPT: "",
    WORKTYPE: "",
    REPORTEDPRIORITY: "",
  });

    const { username } = useAuth();
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");


  // ✅ بيانات اليوزر
  useEffect(() => {
    const stored = localStorage.getItem("UserInfo");
    if (stored) {
      const info = JSON.parse(stored);
      setUserName(info.username);
      setUserPassword(info.password);
    }
  }, []);


  // ✅ Fetch SR Details
  const SR_URL = srId
    ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=ticketid=%22${srId}%22&_lid=${userName}&_lpwd=${userPassword}`
    : null;

  const { data: SRDataRow } = useFetch(SR_URL);
  const RowDataSr = SRDataRow?.member ?? [];

useEffect(()=>{
  console.log("test:",RowDataSr)

},[RowDataSr])

  return (
    <div className="mb-2">
   
   <ExtendNavBarTabs
        routePage={"service-request"}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
   

      <Box sx={{ mt: 1, minHeight: 300 }}>
       
          {mode==="view" ? (
            <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            gap: 1,
          }}>
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
          ):(
            
                     <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            my: 2,
            gap: 1,
          }}
        >

          <Box sx={{ display: "flex", gap: 1 }}>

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
  <Tooltip title="Create SR" arrow
  >
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                <MedicalServicesIcon className="printer-icon" />
              </motion.div>
            </Tooltip>
          </Box>
        </Box>
          )}
          


        {/* the common component for 3 status */}
<SRForm
  mode={mode}
  dataView={RowDataSr}
  formData={formData}
  setFormData={setFormData}
/>
</Box>
    </div>
  )
}

export default SRTest

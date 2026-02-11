import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import ExtendNavBarTabs from "../../components/ServesDetailsCom/ExtendNavBarTabs";
import CreateSRTable from "../../components/Create SR/CreateSRTable";
import CreateSRAddress from "../../components/Create SR/CreateSRAddress";
import CreateSRSpecifications from "../../components/Create SR/CreateSRSpecifications";
import CreateSRLog from "../../components/Create SR/CreateSRLog";
import CreateSRRelatedRecords from "../../components/Create SR/CreateSRRelatedRecords";
import SRMap from "../../components/ServesDetailsCom/SRMap";
import QRDisplay from "../../components/QRDisplay";
import { useSidebar } from "../../components/Context/SidebarContext";
import config from "../../../Data/config.json";
import { IoMdCreate } from "react-icons/io";
import { Save } from "@mui/icons-material";
import { FaRoute } from "react-icons/fa6";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import printerImage from "../../assets/printer-icon.png";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const CreateSR = () => {
  // ===== URL Params =====
  const { id } = useParams();

  // ===== Sidebar Context =====
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [map, setMap] = useState(false);


  // ===== Tabs =====
  const tabs = config.tabs;

  // ===== Local State =====
  const [activeTab, setActiveTab] = useState(0);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [formValid, setFormValid] = useState(true);

  // ===== User Data =====
  const userData = JSON.parse(localStorage.getItem("UserInfo"));

  // ===== Form State =====
   const [formData, setFormData] = useState({
    DESCRIPTION: "",
    LOCATION: "",
    EXEDEPT: "",
    WORKTYPE: "",
    REPORTEDPRIORITY: "",
  });
  // console.log("test:", formData);



  const handleCreateSR = async () => {
     if (!formData.DESCRIPTION.trim()) {
      alert("Validation", "Please enter Description");
      return;
    }

    setLoadingCreate(true);

    try {
      // تحويل formData إلى query string
      const queryParams = Object.entries({
        ...formData,
        _lid: userData.username,
        _lpwd: userData.password,
      })
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");

      const url = `http://192.168.0.73:9080/maxrest/rest/os/MXSR?_action=addchange&${queryParams}`;

      console.log("📤 URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("❌ Create SR failed:", errText);
        alert("Error", "Failed to create Service Request");
        return;
      }

      const result = await response.json();
      console.log("✅ Create SR Result:", result);

      alert("Success", "Service Request created successfully!");

      // إعادة تعيين الفورم
      setFormData({
        DESCRIPTION: "",
        LOCATION: "",
        EXEDEPT: "",
        WORKTYPE: "",
        REPORTEDPRIORITY: "",
      });
    } catch (error) {
      console.error("❌ Create SR error:", error);
      alert("Error", "Unexpected error while creating SR");
    } finally {
      setLoadingCreate(false);
    }
  };
  // ===== Tabs Content =====
  const tabContents = [
    <CreateSRTable
      key="create-sr-table"
      formData={formData}
      setFormData={setFormData}
    />,
    <CreateSRRelatedRecords key="related-records" />,
    <CreateSRLog key="log" />,
    // <CreateSRSpecifications key="specs" />,
    // <CreateSRAddress key="address" />,
    <SRMap key="map" />,
    // <QRDisplay key="qr" />,
  ];

  return (
    <div className="mb-5">
      <ExtendNavBarTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        routePage={"service-request"}
      />

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
            onClick={handleCreateSR}
  >
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} className="print-iconBox">
                <MedicalServicesIcon className="printer-icon" />
              </motion.div>
            </Tooltip>
          </Box>
        </Box>


      <Box sx={{ mt: 3, position: "relative", minHeight: 300 }}>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ position: "absolute", width: "100%" }}
          >
            {tabContents[activeTab] || (
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "text.secondary",
                  fontSize: "1rem",
                }}
              >
                No content available.
              </Box>
            )}
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* ===== Floating Create Button ===== */}
      {/* <Box
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCreateSR}
          disabled={loadingCreate || !formValid}
          sx={{
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            fontWeight: "bold",
            textTransform: "none",
            background:
              "linear-gradient(90deg, #3F9AAE 0%, var(--srExtend-navBar) 100%)",
            "&:hover": {
              background:
                "linear-gradient(90deg, var(--srExtend-navBar) 0%, #3F9AAE 100%)",
            },
          }}
        >
          {loadingCreate ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Create Service Request"
          )}
        </Button>
      </Box> */}
    </div>
  );
};

export default CreateSR;

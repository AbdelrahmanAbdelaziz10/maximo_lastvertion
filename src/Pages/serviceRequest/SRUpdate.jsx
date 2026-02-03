import React, { useEffect, useState } from "react";
import Navbar from "../../components/Common/Navbar";
import { Box, Button } from "@mui/material";
import Sidebar from "../../components/Common/Sidebar";
import ExtendNavBarTabs from "../../components/ServesDetailsCom/ExtendNavBarTabs";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "../../components/Context/SidebarContext";
import { useFetch } from "../../hooks/getFetch";
import { useParams } from "react-router-dom";
import SRDetailsCom from "../../components/ServesDetailsCom/SRDetailsCom";
import SRRelatedRecords from "../../components/ServesDetailsCom/SRRelatedRecords";
import SRLog from "../../components/ServesDetailsCom/SRLog";
import SRSpecifications from "../../components/ServesDetailsCom/SRSpecifications";
import SRAddress from "../../components/ServesDetailsCom/SRAddress";
import SRMap from "../../components/ServesDetailsCom/SRMap";
import QRDisplay from "../../components/QRDisplay";
import { SR_API } from "../../config/api";

const tabs = [
  "Service Request",
  "Related Records",
  "Log",
  "Specifications",
  "Service Address",
  "Map",
  "QR Code",
];

const SRUpdate = () => {
  const { id } = useParams();

  const { sidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = React.useState(0);

  const sidebarWidth = sidebarOpen ? 220 : 65;
  const [reportedphone, setReportedphone] = useState("");

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [dataUpdate, setDataUpdate] = useState({
    "spi:description": "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("UserInfo");
    if (stored) {
      const info = JSON.parse(stored);
      setUserName(info.username);
      setUserPassword(info.password);
    }
  }, []);

  const SR_URL = `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=ticketid=%22${id}%22&_lid=${userName}&_lpwd=${userPassword}`;

  const {
    data: SRDataRow,
    loading: SRLoadingRow,
    error: SRErrorRow,
  } = useFetch(SR_URL);

  const RowDataSr = SRDataRow?.member ?? [];
  useEffect(() => {
    if (RowDataSr[0]) {
      setReportedphone("01029952800");
    }
  }, [RowDataSr]);

  const IDupdate = RowDataSr[0]?.ticketuid;

  const tabContents = [
    <SRDetailsCom
      RowDataSr={RowDataSr}
      setDataUpdate={setDataUpdate}
      reportedphone={reportedphone}
      setReportedphone={setReportedphone}
    />,
    <SRRelatedRecords RowDataSr={RowDataSr} Id={id} />,
    <SRLog RowDataSr={RowDataSr} />,
    <SRSpecifications RowDataSr={RowDataSr} />,
    <SRAddress RowDataSr={RowDataSr} />,
    <SRMap />,
    <QRDisplay
      qrUrl={`${window.location.origin}/maximo/service-request/${id}`}
    />,
  ];

  const handleUpdateSR = async () => {
    try {
      if (!IDupdate) {
        console.error("No SR UID found (IDupdate is null)");
        return;
      }

      const updateURL = `http://192.168.0.73:9080/maxrest/oslc/os/MXSR/${IDupdate}?_lid=${userName}&_lpwd=${userPassword}`;

      const payload = {
        ...dataUpdate,
        "spi:reportedphone": reportedphone, // ← أهم سطر
      };

      const response = await fetch(updateURL, {
        method: "POST", // لازم POST مع PATCH override
        headers: {
          "Content-Type": "application/json",
          "x-method-override": "PATCH",
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update failed:", errorText);
        alert("❌Failed To Update SR");

        return;
      }
      alert("✅ SR Updated Successfully ");
      console.log("Done");
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ An error occurred during the update. ");
    }
  };

  return (
    <div className="mb-5">
      <ExtendNavBarTabs
        routePage={"service-request"}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Box sx={{ mt: 3, position: "relative", minHeight: 300 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", width: "100%" }}
          >
            {tabContents[activeTab]}
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box
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
          onClick={handleUpdateSR}
          sx={{
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            background:
              "linear-gradient(90deg, #3F9AAE 0%, var(--srExtend-navBar) 100%)",
            "&:hover": {
              background:
                "linear-gradient(90deg, var(--srExtend-navBar) 0%, #3F9AAE 100%)",
            },
          }}
        >
          Update Service Request
        </Button>
      </Box>
    </div>
  );
};

export default SRUpdate;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSidebar } from "../../components/Context/SidebarContext";
import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";
import { Box } from "@mui/material";
import ExtendNavBarTabs from "../../components/ServesDetailsCom/ExtendNavBarTabs";
import QRDisplay from "../../components/QRDisplay";
import { motion, AnimatePresence } from "framer-motion";
import SRMap from "../../components/ServesDetailsCom/SRMap";
import SRAddress from "../../components/ServesDetailsCom/SRAddress";
import SRRelatedRecords from "../../components/ServesDetailsCom/SRRelatedRecords";
import SRLog from "../../components/ServesDetailsCom/SRLog";
import SRSpecifications from "../../components/ServesDetailsCom/SRSpecifications";
import SafetyPlan from "../../components/WODetails/SafetyPlan";
import FailureReporting from "../../components/WODetails/FailureReporting";
import Assignment from "../../components/WODetails/Assignment";
import WorkOrderDetails from "../../components/WODetails/WorkOrderDetails";
import Actual from "../../components/WODetails/Actual";

const tabs = [
  "Work Order",
  "Assignments",
  "Related Records",
  "Actuals",
  "Safety plan",
  "Log",
  "Failure Reporting",
  "Specifications",
  "Service Address",
  "Map",
  "QR",
];

const WorkOrderPage = () => {
  const { id } = useParams();
  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;
  const [activeTab, setActiveTab] = useState(0);

  const tabContents = [
    <WorkOrderDetails RowDataSr={""} />,
    <Assignment RowDataSr={""} />,
    <SRRelatedRecords RowDataSr={""} />,
        <Actual RowDataSr={""} />,
    <SafetyPlan RowDataSr={""} />,
    <SRLog RowDataSr={""} />,
    <FailureReporting RowDataSr={""} />,
    <SRSpecifications RowDataSr={""} />,
    <SRAddress RowDataSr={""} />,
    <SRMap />,
    <QRDisplay />,
  ];

  return (
    <div className=" mb-5">
      <Navbar />

      <Box
        component="main"
        sx={{
          margin: { xs: "5rem 1rem 0", md: "6rem 2rem 0" },
          minHeight: "calc(100vh - 5rem)",
          transition: "margin 0.3s ease",
        }}
      >
        <Sidebar isOpen={sidebarOpen} width={sidebarWidth} />

        <main
          className="content-area mb-4"
          style={{ marginTop: -60, marginLeft: `${sidebarWidth}px` }}
        >
          {/* ===== NaBar Tab ===== */}
          <ExtendNavBarTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            routePage={"work-orders"}
          />
          {/* ===== Tab Content ===== */}
          <Box sx={{ mt: 3, position: "relative", minHeight: 300 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab} // important: makes animation trigger on change
                initial={{ opacity:0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ position: "absolute", width: "100%" }}
              >
                {tabContents[activeTab] ? (
                  typeof tabContents[activeTab] === "string" ? (
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
                      {tabContents[activeTab]}
                    </Box>
                  ) : (
                    tabContents[activeTab]
                  )
                ) : (
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
        </main>
      </Box>
    </div>
  );
};

export default WorkOrderPage;

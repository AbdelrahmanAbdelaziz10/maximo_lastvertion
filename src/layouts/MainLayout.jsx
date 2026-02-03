import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import { useSidebar } from "../components/Context/SidebarContext";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";
import ReportsModal from "../components/ReportsModal";

export default function MainLayout() {
  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 200 : 60;

  // ===== State للـ Reports Modal =====
  const [showReportsModal, setShowReportsModal] = useState(false);

  return (
    <div className="app-container">
      <Navbar />

      <Sidebar
        isOpen={sidebarOpen}
        width={sidebarWidth}
        onRunReports={() => setShowReportsModal(true)} // تمرير function للفتح
      />

      <Box
        component="main"
        sx={{
          marginTop: "3rem",
          marginLeft: `${sidebarWidth}px`,
          minHeight: "calc(100vh - 4rem)",
          transition: "margin 0.3s ease",
          padding: "1rem",
        }}
      >
        <Outlet />
      </Box>

      {/* Reports Modal هنا داخل MainLayout */}
      {showReportsModal && (
        <ReportsModal
          show={showReportsModal}
          onHide={() => setShowReportsModal(false)}
          reportType="SR"
        />
      )}
    </div>
  );
}
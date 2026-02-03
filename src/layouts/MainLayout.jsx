import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import { useSidebar } from "../components/Context/SidebarContext";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function MainLayout() {
  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;

  return (
    <div className="app-container">
      <Navbar />

      <Sidebar isOpen={sidebarOpen} width={sidebarWidth} />

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
    </div>
  );
}

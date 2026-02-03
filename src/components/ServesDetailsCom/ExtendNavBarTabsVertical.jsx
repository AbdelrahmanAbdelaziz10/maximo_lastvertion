import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ExtendNavBarTabsVertical = ({ tabs, activeTab, setActiveTab, routePage }) => {
  const navigate = useNavigate();

  return (
    <Box
    
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 80,
        background: "var(--srExtend-navBar)",
        color: "#fff",
        borderRadius: "0 12px 12px 0",
        overflow: "hidden",
        height: "80vh",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      {/* ===== Back Button ===== */}
      <Box
        onClick={() => navigate(`/${routePage}`)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 2,
          cursor: "pointer",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          transition: "background 0.2s",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 24 }} />
        <Typography sx={{ fontWeight: 600, fontSize: "0.85rem" }}>List View</Typography>
      </Box>

      {/* ===== Vertical Tabs ===== */}
      <Tabs
        orientation="vertical"
        value={activeTab}
        onChange={(e, value) => setActiveTab(value)}
        sx={{
          flex: 1,
          "& .MuiTab-root": {
            alignItems: "flex-start",
            justifyContent: "flex-start",
            textAlign: "left",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
            px: 2,
            py: 2,
            transition: "background 0.2s",
          },
          "& .Mui-selected": {
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: "0 8px 8px 0",
            fontWeight: 700,
          },
          "& .MuiTabs-indicator": {
            left: 0,
            width: 4,
            backgroundColor: "#fff",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} value={index} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ExtendNavBarTabsVertical;

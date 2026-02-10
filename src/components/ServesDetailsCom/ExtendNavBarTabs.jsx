import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ExtendNavBarTabs = ({ activeTab, setActiveTab, tabs,routePage }) => {
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "var(--srTotal-header)",
        color: "#fff",
        borderRadius: "0 0 12px 12px",
        px: 0.5,
        py: 1,
        mt: .5,
        mb: 0,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Back Button */}
      <Box
        onClick={() => navigate(`/${routePage}`)}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          mx: 2,
          "&:hover": { opacity: 0.85 },
        }}
      >
        {/* <ArrowBackIcon sx={{ fontSize: 20, color: "#fff", mr: 0.6 }} /> */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "#fff",
            fontSize: "0.8rem",
          }}
        >
          List View
        </Typography>
      </Box>

      {/* Tabs */}
<Tabs
  value={activeTab}
  onChange={handleChange}
  className="external-nave"
  TabIndicatorProps={{
    style: {color:"#fff", backgroundColor: "white", height: "3px"},
  }}
  sx={{
    minHeight: 38,
    width: "90%",
          color: "#fff !Important",
    "& .MuiTab-root": {
          color: "#fff !Important",
      flexGrow: 1,              // 👈 كل Tab ياخد عرض متساوي
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.85rem",
      minHeight: 38,
      px: 1,
      mx: 0,
      minWidth: "auto",

    },
    "& .Mui-selected": {
      backgroundColor: "rgba(255,255,255,0.15)",
          color: "#fff !Important",
      borderRadius: "8px 8px 0 0",
      fontWeight: 700,
    },
    "& .MuiTabs-flexContainer": {
      borderBottom: "none",
      width: "100%",
    },
  }}
>
  {Array.isArray(tabs) &&
    tabs.map((tab, index) => <Tab key={index} label={tab} />)}
</Tabs>

    </Box>
  );
};

export default ExtendNavBarTabs;

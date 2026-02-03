import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Collapse,
  Tooltip,
  Paper,
  Popper,
  MenuList,
  MenuItem,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Create as CreateIcon,
  ListAlt as WorkOrdersIcon,
  Business as AssetsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Category as TypesIcon,
  CheckCircle as StatusIcon,
  Construction as ConstructionIcon,
} from "@mui/icons-material";

import { Link, useLocation } from "react-router-dom";
import path from "path";

const Sidebar = ({ isOpen, width = 220 }) => {
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const [navbarHeight, setNavbarHeight] = useState(0);

  // تحديث ارتفاع Navbar ديناميكي
  useEffect(() => {
    const navbarEl = document.querySelector(".navbar-container"); // أضف هذا الكلاس للـ Navbar
    if (navbarEl) setNavbarHeight(navbarEl.offsetHeight);

    const handleResize = () => {
      if (navbarEl) setNavbarHeight(navbarEl.offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Service Request", icon: <CreateIcon />, path: "/service-request" },
    { text: "Assets", icon: <ConstructionIcon />, path: "/assets" },
    { text: "My Work Orders", icon: <WorkOrdersIcon />, path: "/work-orders" },
    { text: "Viewer AutoCad", icon: <AssetsIcon />, path: "/viewer" },
    {
      text: "Reports",
      icon: <ReportsIcon />,
      path: "/reports",
      subItems: [
        {
          text: "Work Order Types",
          path: "/reports/types",
          icon: <TypesIcon />,
        },
        {
          text: "Work Order Status",
          path: "/reports/status",
          icon: <StatusIcon />,
        },
      ],
    },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  useEffect(() => {
    setActivePath(location.pathname);
    const reportsItem = menuItems.find((item) => item.subItems);
    if (reportsItem?.subItems.some((sub) => sub.path === location.pathname)) {
      setReportsOpen(true);
    }
  }, [location.pathname]);

  const isItemActive = (item) =>
    item.path === activePath ||
    (item.subItems && item.subItems.some((sub) => sub.path === activePath));
  const isSubItemActive = (subItem) => subItem.path === activePath;
  const handleReportsToggle = () => setReportsOpen(!reportsOpen);
  const handleReportsHover = (event) => {
    if (!isOpen) {
      setAnchorEl(event.currentTarget);
      setPopperOpen(true);
    }
  };
  const handleReportsLeave = () => setPopperOpen(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
          backgroundColor: "var(--primary-color)",
          color: "#fff",
          borderRight: "none",
          transition: "width 0.3s",
          top: `${navbarHeight}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
        },
      }}
    >
      <List sx={{ px: 1, py: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.text}>
            {item.subItems ? (
              <>
                <ListItemButton
                  onClick={handleReportsToggle}
                  onMouseEnter={handleReportsHover}
                  onMouseLeave={handleReportsLeave}
                  sx={{
                    borderRadius: "5px",
                    mb: "4px",
                    backgroundColor: isItemActive(item)
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && (
                    <>
                      <ListItemText
                        primary={item.text}
                        sx={{ "& span": { fontWeight: "bold", color: "#fff" } }}
                      />
                      {reportsOpen ? <ExpandLess /> : <ExpandMore />}
                    </>
                  )}
                </ListItemButton>

                {isOpen && (
                  <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
                    <List disablePadding sx={{ ml: 2 }}>
                      {item.subItems.map((subItem) => (
                        <ListItemButton
                          key={subItem.text}
                          component={Link}
                          to={subItem.path}
                          sx={{
                            mb: "2px",
                            backgroundColor: isSubItemActive(subItem)
                              ? "rgba(255,255,255,0.2)"
                              : "transparent",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: "#fff", minWidth: 30 }}>
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={subItem.text}
                            sx={{
                              "& span": {
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                              },
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}

                {!isOpen && (
                  <Popper
                    open={popperOpen}
                    anchorEl={anchorEl}
                    placement="right-start"
                    sx={{ zIndex: 1300 }}
                  >
                    <Paper
                      onMouseEnter={() => setPopperOpen(true)}
                      onMouseLeave={handleReportsLeave}
                      elevation={3}
                      sx={{
                        minWidth: 200,
                        backgroundColor: "var(--primary-color)",
                        color: "#fff",
                      }}
                    >
                      <MenuList>
                        {item.subItems.map((subItem) => (
                          <MenuItem
                            key={subItem.text}
                            component={Link}
                            to={subItem.path}
                            onClick={handleReportsLeave}
                            sx={{
                              color: "#fff",
                              "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.1)",
                              },
                            }}
                          >
                            <ListItemIcon sx={{ color: "#fff", minWidth: 35 }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <Box sx={{ fontWeight: "bold" }}>
                              {subItem.text}
                            </Box>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Paper>
                  </Popper>
                )}
              </>
            ) : (
              <Tooltip title={!isOpen ? item.text : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: "5px",
                    mb: "4px",
                    backgroundColor: isItemActive(item)
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && (
                    <ListItemText
                      primary={item.text}
                      sx={{ "& span": { fontWeight: "bold", color: "#fff" } }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            )}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

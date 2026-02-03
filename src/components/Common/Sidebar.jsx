import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Tooltip,
  Paper,
  Popper,
  MenuList,
  MenuItem,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Create as CreateIcon,
  Construction as ConstructionIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

const Sidebar = ({ isOpen, width = 200, onRunReports }) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const popperOpen = Boolean(anchorEl);

  const [activePath, setActivePath] = useState("");
  const [navbarHeight, setNavbarHeight] = useState(0);

  // ===== Navbar Height =====
  useEffect(() => {
    const navbarEl = document.querySelector(".navbar-container");
    if (navbarEl) setNavbarHeight(navbarEl.offsetHeight);

    const handleResize = () => {
      if (navbarEl) setNavbarHeight(navbarEl.offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ===== Active Path =====
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // ===== Menu =====
  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Service Request",
      icon: <CreateIcon />,
      path: "/service-request",
      subItems: [
        { text: "Change Status", action: "changeStatus" },
        { text: "Select Owner", action: "selectOwner" },
        { text: "Take Ownership", action: "takeOwnership" },
        { text: "Run Reports", action: "runReports" },
        { text: "Cognos Analytics", action: "cognosAnalytics" },
      ],
    },
    {
      text: "Assets",
      icon: <ConstructionIcon />,
      path: "/assets",
    },
  ];

  // === Dropdown actions ===
  const handleAction = (action) => {
    switch (action) {
      case "changeStatus":
        console.log("Changing status...");
        break;
      case "selectOwner":
        console.log("Selecting owner...");
        break;
      case "takeOwnership":
        console.log("Taking ownership...");
        break;
      case "runReports":
        if (onRunReports) onRunReports(); // استدعاء callback من MainLayout
        break;
      case "cognosAnalytics":
        console.log("Opening Cognos Analytics...");
        break;
      default:
        break;
    }
  };

  const isItemActive = (item) =>
    item.path === activePath || (item.subItems && activePath.startsWith(item.path));

  // ===== Hover Handlers (Only when isOpen) =====
  const handleMouseEnter = (event) => {
    if (!isOpen) return;
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    if (!isOpen) return;
    setAnchorEl(null);
  };

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
            {/* ===== Item With Popper ===== */}
            {item.subItems ? (
              <>
                <Tooltip title={!isOpen ? item.text : ""} placement="right">
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      borderRadius: "5px",
                      p: ".4rem",
                      mb: "4px",
                      backgroundColor: isItemActive(item)
                        ? "rgba(255,255,255,0.2)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#fff", minWidth: 30 }}>
                      {item.icon}
                    </ListItemIcon>

                    {isOpen && (
                      <>
                        <ListItemText
                          primary={item.text}
                          sx={{
                            m: "0",
                            "& span": {
                              fontSize: ".9rem",
                              fontWeight: "bold",
                              color: "#fff",
                            },
                          }}
                        />
                        <IoMdArrowDropright />
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>

                {/* ===== Popper (Only if isOpen) ===== */}
                {isOpen && (
                  <Popper
                    open={popperOpen}
                    anchorEl={anchorEl}
                    placement="right-start"
                    sx={{ zIndex: 1300 }}
                  >
                    <Paper
                      elevation={3}
                      onMouseEnter={() => setAnchorEl(anchorEl)}
                      onMouseLeave={handleMouseLeave}
                      sx={{
                        minWidth: 220,
                        backgroundColor: "var(--primary-color)",
                        color: "#fff",
                      }}
                    >
                      <MenuList>
                        {item.subItems.map((subItem) => (
                          <MenuItem
                            key={subItem.text}
                            onClick={() => handleAction(subItem.action)}
                            sx={{
                              fontWeight: "bold",
                              color: "#fff",
                              "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.1)",
                              },
                            }}
                          >
                            {subItem.text}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Paper>
                  </Popper>
                )}
              </>
            ) : (
              /* ===== Normal Item ===== */
              <Tooltip title={!isOpen ? item.text : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: "4px",
                    p: ".3rem",
                    mb: "4px",
                    backgroundColor: isItemActive(item)
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff", minWidth: 30 }}>
                    {item.icon}
                  </ListItemIcon>

                  {isOpen && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        "& span": {
                          fontSize: ".9rem",
                          fontWeight: "600",
                          color: "#fff",
                        },
                      }}
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
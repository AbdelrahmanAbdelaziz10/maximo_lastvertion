import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Typography } from "@mui/material";
import { Menu as MenuIcon, Notifications } from "@mui/icons-material";
import { useState } from "react";
import logo from "../../assets/logo.png";
import "../../Style/NavBar.css";
import { Container } from "react-bootstrap";
import { useSidebar } from "../Context/SidebarContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const storedUserData = JSON.parse(localStorage.getItem("UserInfo"));
  const username = storedUserData?.username || "User";

  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await fetch("http://192.168.0.73:9080/maximo/oslc/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Maximo logout failed", err);
    }

    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      className="navbar-container"
      position="fixed"
      sx={{
        width: "100vw",
        height: "4rem",
        backgroundColor: "var(--primary-color)",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container fluid>
        <Toolbar
          sx={{
            minHeight: "4rem",
            px: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <IconButton onClick={toggleSidebar} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>

            <img src={logo} alt="Company Logo" className="navbar-logo" />
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconButton sx={{ color: "#fff" }}>
              <Notifications />
            </IconButton>

            {/* USERNAME (click to open menu) */}
            <Typography
              onClick={handleMenuOpen}
              sx={{ cursor: "pointer", fontWeight: "bold", userSelect: "none" }}
            >
              {username}
            </Typography>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <MenuItem disabled sx={{ fontWeight: "bold", opacity: 1 }}>
                {username}
              </MenuItem>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

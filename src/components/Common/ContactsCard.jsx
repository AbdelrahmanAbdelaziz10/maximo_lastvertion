import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import {
  Person as PersonIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Engineering as CivilIcon,
  Build as MechIcon,
  Bolt as UtilityIcon,
  Power as ElcIcon,
  Home as HKIcon,
} from "@mui/icons-material";

const ContactsCard = () => {
  const contacts = [
    { name: "Melanie Noble", department: "Civil", status: "Active" },
    { name: "Chase Day", department: "Mech", status: "Inactive" },
    { name: "Shawn Manning", department: "Utility", status: "Inactive" },
    { name: "Soren Durham", department: "Elc", status: "Active" },
    { name: "Cortez Herring", department: "HK", status: "Inactive" },
        { name: "Cortez Herring", department: "HK", status: "Inactive" },

  ];

  const getDepartmentIcon = (department) => {
    switch (department) {
      case "Civil":
        return <CivilIcon fontSize="small" />;
      case "Mech":
        return <MechIcon fontSize="small" />;
      case "Utility":
        return <UtilityIcon fontSize="small" />;
      case "Elc":
        return <ElcIcon fontSize="small" />;
      case "HK":
        return <HKIcon fontSize="small" />;
      default:
        return <PersonIcon fontSize="small" />;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box>
        <Row>
          <Col xs={12} md={8} sm={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Customer
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              You have 122 contacts
            </Typography>
          </Col>
          <Col xs={12} md={4} sm={12}>
            <Button variant="text" style={{color: "var(--primary-color)"}}>
              View all

            </Button>
          </Col>
        </Row>
      </Box>

      <List>
        {contacts.map((contact, index) => (
          <React.Fragment key={index}>
            <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "var(--primary-color)",
                    width: 35,
                    fontSize: "1.5rem", // More appropriate size for icons
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.5rem", // Ensures icon scales properly
                    },
                  }}
                >
                  {" "}
                  {getDepartmentIcon(contact.department)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {contact.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={contact.status}
                      color={contact.status === "Active" ? "success" : "error"}
                      icon={
                        contact.status === "Active" ? (
                          <ActiveIcon fontSize="small" />
                        ) : (
                          <InactiveIcon fontSize="small" />
                        )
                      }
                      sx={{ ml: 1 }}
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {contact.department} Department
                  </Typography>
                }
              />
            </ListItem>
            {index < contacts.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default ContactsCard;

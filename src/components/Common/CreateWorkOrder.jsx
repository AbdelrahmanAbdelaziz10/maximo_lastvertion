import React from "react";
import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CreateWorkOrder = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.22)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem",
        width: "100%",
      }}
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#4DA8DA",
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#1565c0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Create Work Order
      </Button>
    </Box>
  );
};

export default CreateWorkOrder;

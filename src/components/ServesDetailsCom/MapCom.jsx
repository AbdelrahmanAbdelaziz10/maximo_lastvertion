import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import SRMap from "./SRMap";

const MapCom = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  return (
    <>
      {/* Coordinates Row */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          mb: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Latitude */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography
            sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.85rem" }}
          >
            Latitude (Y):
          </Typography>
          <TextField
            size="small"
            variant="outlined"
            value={lat}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#888" },
              "& .MuiOutlinedInput-input": { padding: "8px" },
            }}
          />
        </Box>

        {/* Longitude */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography
            sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.85rem" }}
          >
            Longitude (X):
          </Typography>
          <TextField
            size="small"
            variant="outlined"
            value={lng}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#888" },
              "& .MuiOutlinedInput-input": { padding: "8px" },
            }}
          />
        </Box>
      </Box>

      {/* Map */}
      <SRMap setLat={setLat} setLng={setLng} />
    </>
  );
};

export default MapCom;

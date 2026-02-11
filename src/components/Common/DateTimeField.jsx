import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BsCalendar2DateFill } from "react-icons/bs";
import dayjs from "dayjs";

const DateTimeField = ({ value, onChange, readOnly = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        
       <DateTimePicker
  open={open}
  onClose={() => setOpen(false)}
  value={value ? dayjs(value) : null}
  onChange={(newValue) => {
    onChange?.(newValue?.format("YYYY-MM-DD HH:mm"));
  }}
  ampm={false}
  format="YYYY-MM-DD HH:mm"
  enableAccessibleFieldDOMStructure={false}
  slots={{
    textField: TextField,
  }}
  slotProps={{
    textField: {
      fullWidth: true,
      InputProps: { readOnly: false },
    },
  }}
/>


        {!readOnly && (
          <IconButton size="small" onClick={() => setOpen(true)}>
            <BsCalendar2DateFill
              style={{
                color: "var(--srExtend-navBar2)",
                fontSize: "18px",
              }}
            />
          </IconButton>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default DateTimeField;

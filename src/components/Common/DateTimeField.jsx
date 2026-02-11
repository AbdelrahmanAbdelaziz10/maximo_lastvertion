import React, { useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BsCalendar2DateFill } from "react-icons/bs";
import dayjs from "dayjs";

const DateTimeField = ({ value, onChange, readOnly = false }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative" }}>
        
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
    textField: () => null,
  }}
  slotProps={{
    popper: {
      anchorEl: anchorRef.current,
      placement: "bottom-start",
      disablePortal: false, // 👈 هنا تضيفها
    },
  }}
/>


        {!readOnly && (
          <IconButton
            size="small"
            ref={anchorRef}
            onClick={() => setOpen(true)}
          >
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

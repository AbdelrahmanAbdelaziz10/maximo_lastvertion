import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Col, Row } from "react-bootstrap";
import { Input, IconButton, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const CreateSRUserInfo = ({ UserInformation, width }) => {
  const theme = useTheme();

  return (
    <Row className="my-4 justify-content-between px-3">
      <Col xs={12}>
        {UserInformation?.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              marginBottom: 3,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {/* Label */}
            <Typography
              sx={{
                flexBasis: width || "150px",
                flexShrink: 0,
                fontWeight: 500,
                color: "text.secondary",
                textTransform: "capitalize",
              }}
            >
              {item.label}:
            </Typography>

            {/* Input + Optional Calendar Icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                gap: 0.5,
              }}
            >
              {item.type ? (
                <TextField
                  type={item.type || "text"}
                  fullWidth
                  multiline
                  rows={5}
                  variant="standard" // ✅ بيخليها بخط سفلي فقط
                  InputProps={{
                    disableUnderline: false, // ✅ نخلي الخط السفلي ظاهر
                  }}
                  sx={{
                    flex: 1,
                    "& .MuiInputBase-root": {
                      borderBottom: "1px dotted #999", // ✅ نخلي الخط السفلي dotted
                    },
                    "& .MuiInputBase-input": {
                      textAlign: "left",
                      paddingLeft: "4px",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottom: "1px dotted #999", // ✅ الخط قبل التركيز
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottom: "1px solid #000", // ✅ لما تعمل hover يكون solid
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "2px solid #1976d2", // ✅ لون الخط بعد التركيز (اختياري)
                    },
                  }}
                />
              ) : (
                <Input
                  type={item.type || "text"}
                  fullWidth
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                    "& input": { textAlign: "left" },
                  }}
                />
              )}

              {/* Show calendar icon if it's a date */}
              {item.type === "date" && (
                <IconButton
                  size="small"
                  sx={{ color: "#1565c0", marginTop: 1 }}
                >
                  <CalendarMonthIcon sx={{ fontSize: 22 }} />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Col>
    </Row>
  );
};

export default CreateSRUserInfo;

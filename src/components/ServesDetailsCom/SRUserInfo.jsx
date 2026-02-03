import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  IconButton,
  Paper,
  TextareaAutosize,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Row, Col } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PreviewIcon from "@mui/icons-material/Preview";
import SelectValue from "../Create SR/SelectValue";

// 🔹 Helper function: remove HTML tags
const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const SRUserInfo = ({
  UserInformation = [],
  labelWidth = "130px",
  DetailsList = [],
  icons,
  onFieldUpdate,
}) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectValueOpen, setSelectValueOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const defaultIcons = {
    search: <SearchIcon fontSize="small" />,
    link: <InsertLinkIcon fontSize="small" />,
    preview: <PreviewIcon fontSize="small" />,
  };

  const iconSet = icons || defaultIcons;

  const handleIconClick = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleOptionClick = (option, field) => {
    if (option === "Select Value") {
      setCurrentField(field);
      setSelectValueOpen(true);
    }
    setActiveIndex(null);
  };

  const handleSelectValue = (value) => {
    if (currentField && onFieldUpdate) {
      onFieldUpdate(currentField.Key, value);
    }
    setSelectValueOpen(false);
    setCurrentField(null);
  };

  return (
    <Row>
      <Col xs={12}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {UserInformation.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Label */}
                <Typography
                  sx={{
                    width: labelWidth,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "text.secondary",
                    textAlign: "left",
                  }}
                >
                  {item.label}:
                </Typography>

                {/* Input أو Textarea */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: item.type === "textbox" ? "flex-start" : "center",
                    borderBottom: "1px dotted #999",
                    "&:hover": {
                      borderBottomColor: theme.palette.primary.main,
                    },
                  }}
                >
                {item.type === "textbox" ? (
  <TextareaAutosize
    value={stripHtml(item.Value)}
    readOnly={false} // لو عايز يسمح بالكتابة، خلي false
    style={{
      width: "100%",
      fontSize: "0.875rem",
      padding: "0.5rem 0.8rem",
      color: theme.palette.text.primary,
      border: "none",
      borderBottom: "1px solid transparent", // default invisible
      resize: "none",
      backgroundColor: "transparent",
      fontFamily: "Roboto, Arial, sans-serif",
      lineHeight: 1.5,
      overflowY: "auto",
      outline: "none", // يمنع outline الافتراضي
      transition: "border-color 0.2s ease",
    }}
    onFocus={(e) => {
      e.target.style.borderBottomColor = "var(--srExtend-navBar)";
    }}
    onBlur={(e) => {
      e.target.style.borderBottomColor = "transparent";
    }}
  />
) : (
<Input
  fullWidth
  value={stripHtml(item.Value)}
  disableUnderline
  sx={{
    fontSize: "0.875rem",
    paddingLeft: ".8rem",
    color: "text.primary", // default color
    borderBottom: "1px solid transparent", // invisible by default
    transition: "border-color 0.2s ease, color 0.2s ease",
    "& .MuiInput-input": {
      p: 0,
      whiteSpace: "pre-line",
      transition: "color 0.2s ease",
    },
    "&:focus-within": {
      borderBottomColor: "var(--srExtend-navBar)", // border عند التركيز
    },
  }}
/>


)}


                  {item.icon && (
                    <IconButton
                      size="small"
                      onClick={() => handleIconClick(idx)}
                      sx={{
                        ml: 0.5,
                        color: isActive ? "primary.main" : "action.active",
                      }}
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                {/* Dropdown */}
                {isActive && (
                  <Paper
                    elevation={4}
                    sx={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      mt: 1,
                      minWidth: 220,
                      zIndex: 2000,
                      borderRadius: 1,
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    {DetailsList.map((option, i) => (
                      <Box
                        key={i}
                        onClick={() => handleOptionClick(option.title, item)}
                        sx={{
                          px: 2,
                          py: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: theme.palette.action.hover,
                          },
                          borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        {iconSet[option.icon]}
                        <Typography sx={{ fontSize: "0.85rem" }}>
                          {option.title}
                        </Typography>
                      </Box>
                    ))}
                  </Paper>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Select Value Modal */}
        <SelectValue
          open={selectValueOpen}
          field={currentField}
          onClose={() => setSelectValueOpen(false)}
          onSelectValue={handleSelectValue}
        />
      </Col>
    </Row>
  );
};

export default SRUserInfo;

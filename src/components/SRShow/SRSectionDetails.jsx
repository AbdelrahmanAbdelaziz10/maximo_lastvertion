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

const SRSectionDetails = ({
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
                <Typography className="input-text text-width">
                  {item.label}:
                </Typography>

                {/* Input أو Textarea */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems:
                      item.type === "textbox" ? "flex-start" : "center",
                  }}
                >
                  {item.type === "textbox" ? (
                    <TextareaAutosize
                      value={stripHtml(item.Value)}
                      readOnly={false}
                      className="textarea-general"
                      minRows={3}
                    />
                  ) : (
                    <Input
                      fullWidth
                      value={stripHtml(item.Value)}
                      disableUnderline
                      className="input-general"
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

export default SRSectionDetails;

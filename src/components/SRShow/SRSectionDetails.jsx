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
import DateTimeField from "../Common/DateTimeField";
import { useFetch } from "../../hooks/getFetch";

const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const SRSectionDetails = ({
  UserInformation = [],
  DetailsList = [],
  icons,
  onFieldUpdate,
}) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectValueOpen, setSelectValueOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  /* الداتا بتاعت ال Assets */
  const { data: AssetData, loading } = useFetch(
    "http://192.168.0.73:9080/maximo/oslc/os/PORTALASSET?lean=1&oslc.select=*&ignorers=1&ignorekeyref=1&_lid=maxadmin&_lpwd=maxadmin",
  );

  console.log("AssetData:", AssetData?.member);

  /* الداتا بتاعت ال Assets */
  const { data: DepartmentData, depLoading } = useFetch(
    'http://192.168.0.73:9080/maximo/oslc/os/PORTALALNDOMAIN?lean=1&oslc.select=*&oslc.where=domainid="DEPT"&_lid=maxadmin&_lpwd=maxadmin',
  );

  console.log("DepartmentData:", DepartmentData?.member);

  /*  استخدمت useMemo  علشان متعملش map  بعد كل  render*/

  const assetValues = React.useMemo(() => {
    return (
      AssetData?.member?.map((item) => ({
        assetnum: item.assetnum,
        description: item.description,
        location: item.location,
        siteid: item.siteid,
      })) || []
    );
  }, [AssetData]);

 const departmentValues = React.useMemo(() => {
    return (
      DepartmentData?.member?.map((item) => ({
        value: item.value,
        description: item.description,
      })) || []
    );
  }, [DepartmentData]);

  const selectValueConfig = {
    Assets: {
      value:assetValues ,
      tabs: [
        { label: "Asset", key: "assetnum" },
        { label: "Description", key: "description" },
        { label: "Location", key: "location" },
        { label: "Site", key: "siteid" },
      ],
    },
    Department: {
      value:departmentValues ,
      tabs: [
        { label: "Value", key: "value" },
        { label: "Description", key: "description" },
      ],
    },
  };

  const defaultIcons = {
    search: <SearchIcon fontSize="small" />,
    link: <InsertLinkIcon fontSize="small" />,
    preview: <PreviewIcon fontSize="small" />,
  };

  const iconSet = icons || defaultIcons;

  const handleSearchClick = (item) => {
    setCurrentField(item);
    setSelectValueOpen(true);
  };

  const handleSelectValue = (value) => {
    if (currentField && onFieldUpdate) {
      onFieldUpdate(currentField.Key, value);
    }
    setSelectValueOpen(false);
    setCurrentField(null);
  };

  const handleDateChange = (val, item) => {
    if (onFieldUpdate) {
      onFieldUpdate(item.Key, val);
    }
  };

  const renderIcon = (iconType, item, idx) => {
    switch (iconType) {
      case "search":
        return (
          <IconButton size="small" onClick={() => handleSearchClick(item)}>
            <SearchIcon fontSize="small" />
          </IconButton>
        );

      case "time":
        return (
          <DateTimeField
            value={item?.value}
            onChange={(val) => handleDateChange(val, item)}
          />
        );

      default:
        return null;
    }
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
                <Typography className="input-text text-width">
                  {item.label}:
                </Typography>

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

                  {renderIcon(item.icon, item, idx)}
                </Box>

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
          value={selectValueConfig[currentField?.label]?.value}
          tabs={selectValueConfig[currentField?.label]?.tabs}
          loading={loading}
          onClose={() => setSelectValueOpen(false)}
          onSelectValue={handleSelectValue}
        />
      </Col>
    </Row>
  );
};

export default SRSectionDetails;

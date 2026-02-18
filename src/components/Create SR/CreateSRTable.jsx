import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Box,
  Typography,
  Input,
  CardContent,
  Card,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import AnimatedSection from "../ServesDetailsCom/AnimatedSection";
import CreateAttachment from "./CreateAttachment";
import config from "../../../Data/config.json";
import SearchIcon from "@mui/icons-material/Search";
import SelectValue from "./SelectValue";
import { useFetch } from "../../hooks/getFetch";

const CreateSRTable = ({ RowDataSr, formData, setFormData }) => {
  // ====== State ======
  const [currentField, setCurrentField] = useState(null);

  const [sections, setSections] = useState({
    serviceRequestDetails: true,
    userInfo: true,
    dates: true,
    attachments: true,
  });

  const handleSelectValue = (value) => {
    if (currentField) {
      handleSmartInputChange(currentField, value); // تحديث الفورم
    }
    setSelectValueOpen(false);
    setCurrentField(null);
  };

  // console.log("data2:",formData)
  const [selectValueOpen, setSelectValueOpen] = useState(false);

  const handelSelectValue = (item) => {
    setCurrentField(item); // تحدد الفيلد اللي هيتعامل معاه المودال
    setSelectValueOpen(true);
  };

  // ====== Handlers ======
  const toggleSection = (key) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange2 = (files) => {
    // console.log("Files uploaded:", files);
  };
  // ====== Handle All Inputs (With formKey Support) ======
  const handleSmartInputChange = (item, value) => {
    const realKey = item.formKey || item.key;

    setFormData((prev) => ({
      ...prev,
      [realKey]: value,
    }));
  };

  /* الداتا بتاعت ال Assets */
  const { data: AssetData, loading } = useFetch(
    "http://192.168.0.73:9080/maximo/oslc/os/PORTALASSET?lean=1&oslc.select=*&ignorers=1&ignorekeyref=1&_lid=maxadmin&_lpwd=maxadmin",
  );
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

  console.log("AssetData:", AssetData?.member);

  /* الداتا بتاعت ال Department */
  const { data: DepartmentData, depLoading } = useFetch(
    'http://192.168.0.73:9080/maximo/oslc/os/PORTALALNDOMAIN?lean=1&oslc.select=*&oslc.where=domainid="DEPT"&_lid=maxadmin&_lpwd=maxadmin',
  );
  /*  استخدمت useMemo  علشان متعملش map  بعد كل  render*/

  const departmentValues = React.useMemo(() => {
    return (
      DepartmentData?.member?.map((item) => ({
        value: item.value,
        description: item.description,
      })) || []
    );
  }, [DepartmentData]);

  console.log("DepartmentData:", DepartmentData?.member);

  /* الداتا بتاعت ال Location */
  const { data: LocationData, locLoading } = useFetch(
    "http://192.168.0.73:9080/maximo/oslc/os/PORTALLOCATION?lean=1&oslc.select=*&ignorers=1&ignorekeyref=1&_lid=maxadmin&_lpwd=maxadmin",
  );
  /*  استخدمت useMemo  علشان متعملش map  بعد كل  render*/

  const locationValues = React.useMemo(() => {
    return (
      LocationData?.member?.map((item) => ({
        location: item.location,
        description: item.description,
        siteid: item.siteid,
      })) || []
    );
  }, [LocationData]);
  console.log("LocationData:", LocationData?.member);

  const selectValueConfig = {
    Assets: {
      value: assetValues,
      tabs: [
        { label: "Asset", key: "assetnum" },
        { label: "Description", key: "description" },
        { label: "Location", key: "location" },
        { label: "Site", key: "siteid" },
      ],
    },
    Department: {
      value: departmentValues,
      tabs: [
        { label: "Value", key: "value" },
        { label: "Description", key: "description" },
      ],
    },
    Location: {
      value: locationValues,
      tabs: [
        { label: "Location", key: "location" },
        { label: "Description", key: "description" },
        { label: "Site", key: "siteid" },
      ],
    },
  };

  const renderIcon = (iconType, item, idx) => {
    switch (iconType) {
      case "search":
        return (
          <IconButton size="small" onClick={() => handelSelectValue(item)}>
            <SearchIcon fontSize="small" />
          </IconButton>
        );

      //    case "time":
      // return (
      //   <DateTimeField
      //     value={item?.value}
      //     onChange={(val) => handleDateChange(val, item, idx)}
      //   />
      // );

      default:
        return null;
    }
  };

  // ====== UI ======
  return (
    <>
      {/* ===== Header Section ===== */}
      <Card
        sx={{
          marginBottom: 2,
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
        }}
      >
        <CardContent>
          <Row className="g-3 justify-content-around">
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography className="input-text">Service Request:</Typography>
                <Input
                  fullWidth
                  value={RowDataSr?.[0]?.ticketid || ""}
                  className="input-general"
                  disableUnderline
                />
              </Box>
            </Col>

            <Col xs={12} md={6} lg={6}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Description:</Typography>
                <Input
                  fullWidth
                  value={formData.DESCRIPTION || ""}
                  onChange={(e) => handleChange("DESCRIPTION", e.target.value)}
                  className="input-general"
                  disableUnderline
                />
              </Box>
            </Col>

            {/* <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Owner Group:</Typography>
                <Input
                  fullWidth
                  value={formData.ownerGroup}
                  onChange={(e) => handleChange("ownerGroup", e.target.value)}
                  className="input-general"
                  disableUnderline
                />
              </Box>
            </Col> */}

            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography className="input-text">Status:</Typography>
                <Input
                  fullWidth
                  readOnly
                  value={formData.STATUS}
                  onChange={(e) => handleChange("STATUS", e.target.value)}
                  className="input-general"
                  disableUnderline
                />
              </Box>
            </Col>
          </Row>
        </CardContent>
      </Card>
      <Row>
        <Col xs={12} md={6}>
          {/* ===== Service Request Details ===== */}
          <AnimatedSection
            title="Service Request Details"
            isOpen={sections.serviceRequestDetails}
            onToggle={() => toggleSection("serviceRequestDetails")}
          >
            <Row className="px-1 stats-section justify-content-center">
              <Col xs={12} md={12}>
                {/* ========== LEFT SECTION ========== */}

                {config?.ServiceRequestDetails?.map((item, idx) => (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "135px 1fr auto",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    {/* Label */}
                    <Typography className="input-text">
                      {item.label}:
                    </Typography>

                    {item.type === "textbox" ? (
                      <TextareaAutosize
                        value={formData[item.formKey || item.key] || ""}
                        onChange={(e) =>
                          handleSmartInputChange(item, e.target.value)
                        }
                        readOnly={false}
                        className="textarea-general"
                        minRows={3}
                      />
                    ) : (
                      <Input
                        fullWidth
                        value={formData[item.formKey || item.key] || ""}
                        onChange={(e) =>
                          handleSmartInputChange(item, e.target.value)
                        }
                        className="input-general "
                        disableUnderline
                      />
                    )}
                    {renderIcon(item.icon, item, idx)}
                  </Box>
                ))}
              </Col>

              {/* <Col xs={12} md={6}>

                {config?.ServiceRequestDetails?.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "135px 1fr",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Typography className="input-text">
                      {item.label}:
                    </Typography>

                    <Input
                      fullWidth
                      value={formData[item.formKey || item.key] || ""}
                      onChange={(e) =>
                        handleSmartInputChange(item, e.target.value)
                      }
                      className="input-general"
                      disableUnderline
                    />
                  </Box>
                ))}
              </Col> */}
            </Row>
          </AnimatedSection>
        </Col>
        {/* ===== User Information ===== */}
        <Col xs={12} md={6}>
          <Col xs={12} md={12}>
            <AnimatedSection
              title="User Information"
              isOpen={sections.userInfo}
              onToggle={() => toggleSection("userInfo")}
            >
              {config?.UserInformationAll?.map((item) => (
                <Box
                  key={item.key}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "110px 1fr",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {/* Label */}
                  <Typography className="input-text">{item.label}:</Typography>
                  <Input
                    fullWidth
                    value={formData[item.key] || ""}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                    className="input-general"
                    disableUnderline
                  />
                </Box>
              ))}
            </AnimatedSection>
          </Col>
          <Col xs={12} md={12}>
            <AnimatedSection
              title="Dates"
              isOpen={sections.dates}
              onToggle={() => toggleSection("dates")}
            >
              {config?.DatesGroups?.map((group, colIdx) => (
                <Col xs={12} md={12} key={colIdx}>
                  {group.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "115px 1fr",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      {/* Label */}
                      <Typography className="input-text">
                        {item.label}:
                      </Typography>
                      <Input
                        fullWidth
                        value={formData[item.key] || ""}
                        onChange={(e) => handleChange(item.key, e.target.value)}
                        className="input-general"
                        disableUnderline
                      />
                    </Box>
                  ))}
                </Col>
              ))}
            </AnimatedSection>
          </Col>
        </Col>
      </Row>
      {/* ===== Dates ===== */}
      {/* <AnimatedSection
        title="Dates"
        isOpen={sections.dates}
        onToggle={() => toggleSection("dates")}
      >
        <Row className="px-4 stats-section justify-content-center">
          {config?.DatesGroups?.map((group, colIdx) => (
            <Col xs={12} md={4} key={colIdx}>
              {group.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "115px 1fr",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Typography className="input-text">{item.label}:</Typography>
                  <Input
                    fullWidth
                    value={formData[item.key] || ""}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                    className="input-general"
                    disableUnderline
                  />
                </Box>
              ))}
            </Col>
          ))}
        </Row>
      </AnimatedSection> */}

      {/* ===== Attachments ===== */}
      <AnimatedSection
        title="Attachments"
        isOpen={sections.attachments}
        onToggle={() => toggleSection("attachments")}
      >
        <CreateAttachment
          handleFileChange2={handleFileChange2}
          RowDataSr={RowDataSr}
          document={document}
        />
      </AnimatedSection>

      {/* Select Value Modal */}
      <SelectValue
        open={selectValueOpen}
        field={currentField}
        value={selectValueConfig[currentField?.label]?.value}
        tabs={selectValueConfig[currentField?.label]?.tabs}
        loading={currentField?.label === "Department" ? depLoading : loading}
        onClose={() => setSelectValueOpen(false)}
        onSelectValue={handleSelectValue}
      />
    </>
  );
};

export default CreateSRTable;

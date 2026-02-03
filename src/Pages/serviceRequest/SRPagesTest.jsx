import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Box } from "@mui/material";
import { useSidebar } from "../../components/Context/SidebarContext";
import { useAuth } from "../../components/Context/AuthContext";
import { useFetch } from "../../hooks/getFetch";

import ExtendNavBarTabsVertical from "../../components/ServesDetailsCom/ExtendNavBarTabsVertical";
import SRDetailsCom from "../../components/ServesDetailsCom/SRDetailsCom";
import SRRelatedRecords from "../../components/ServesDetailsCom/SRRelatedRecords";
import SRLog from "../../components/ServesDetailsCom/SRLog";
import SRSpecifications from "../../components/ServesDetailsCom/SRSpecifications";
import SRAddress from "../../components/ServesDetailsCom/SRAddress";
import SRMap from "../../components/ServesDetailsCom/SRMap";
import QRDisplay from "../../components/QRDisplay";
import "../../test.css";
const SRPagesTest = () => {
  const { id } = useParams();
  const { sidebarOpen } = useSidebar();
  const { username, password } = useAuth();

  const [activeTab, setActiveTab] = useState(0);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const sidebarWidth = sidebarOpen ? 220 : 65;

  // ===== Tabs =====
  const tabs = [
    "Service Request",
    "Related Records",
    "Log",
    "Specifications",
    "Service Address",
    "Map",
    "QR Code",
  ];

  // ===== Fetch SR Data =====
  useEffect(() => {
    const stored = localStorage.getItem("UserInfo");
    if (stored) {
      const info = JSON.parse(stored);
      setUserName(info.username);
      setUserPassword(info.password);
    }
  }, []);

  const SR_URL = `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=ticketid=%22${id}%22&_lid=${userName}&_lpwd=${userPassword}`;

  const { data: SRDataRow } = useFetch(SR_URL);
  const RowDataSr = SRDataRow?.member ?? [];

  // ===== Tab Contents =====
  const tabContents = [
    <SRDetailsCom RowDataSr={RowDataSr} />,
    <SRRelatedRecords RowDataSr={RowDataSr} Id={id} />,
    <SRLog RowDataSr={RowDataSr} />,
    <SRSpecifications RowDataSr={RowDataSr} />,
    <SRAddress RowDataSr={RowDataSr} />,
    <SRMap />,
    <QRDisplay
      qrUrl={`${window.location.origin}/maximo/service-request/${id}`}
    />,
  ];

  return (
    <Box className="mb-5">
      <Box className="g-0 main-box">
        {/* ===== Sidebar Tabs ===== */}
        <Box className="my-3 nav-box">
          <ExtendNavBarTabsVertical
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            routePage="service-request"
          />
        </Box>

        {/* ===== Tab Content ===== */}
        <Box className="body-box">
          <Box sx={{ p: 3, minHeight: "100vh" }}>{tabContents[activeTab]}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SRPagesTest;

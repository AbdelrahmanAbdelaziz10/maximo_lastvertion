import React, { useEffect, useState } from "react";
import ExtendNavBarTabs from "../../components/ServesDetailsCom/ExtendNavBarTabs";
import { Box, Tooltip } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdCreate } from "react-icons/io";
import { Save } from "lucide-react";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { FaRoute } from "react-icons/fa6";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import printerImage from "../../assets/printer-icon.png";
import { useSRData } from "../../components/Context/SRDataContext";
import { motion } from "framer-motion";
import SRForm from "../../components/SrTest/SRForm";
import { useFetch } from "../../hooks/getFetch";
import { useAuth } from "../../components/Context/AuthContext";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import { useGlobal } from "./../../components/Context/GlobalContext";
import Pops from "../../components/Common/Pops";
import QRDisplay from "../../components/QRDisplay";
import MapCom from "../../components/ServesDetailsCom/MapCom";
import { Snackbar, Alert } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachmentSection from "../../components/ServesDetailsCom/AttachmentUploader";

const SRTest = () => {
  // const { value, setValue } = useGlobal(); // value = "create" | "view" | "edit"
  const { id } = useParams();
  /* chick for know the type */
  const location = useLocation();

  // تحديد الوضع
  const mode =
    location.pathname.includes("/service-request/create") ? "create" : "view";

  console.log("Mode:", mode);
console.log("Param id:", id);
  const { srData, currentSrId: srId, setCurrentSrId } = useSRData();
  const navigate = useNavigate();
  const { username } = useAuth();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [showReportsModal, setShowReportsModal] = useState(false);
    const [attachment, setAttachment] = useState(false);

  const [map, setMap] = useState(false);
  const [RowDataSr, setRowDataSr] = useState([]);
  /* mui alert stats */
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

  const tabs = ["Service Request"];
  const getTicketId = (item) =>
    item?.ticketid || item?.sr?.[0]?.ticketid || null;

  // ===== Form State =====
  const [formData, setFormData] = useState({
    DESCRIPTION: "",
    LOCATION: "",
    EXEDEPT: "",
    WORKTYPE: "",
    REPORTEDPRIORITY: "",
  });

  // ✅ بيانات اليوزر
  useEffect(() => {
    const stored = localStorage.getItem("UserInfo");
    if (stored) {
      const info = JSON.parse(stored);
      setUserName(info.username);
      setUserPassword(info.password);
    }
  }, []);

  // ✅ تحديد SR ID من context أو URL أو أول عنصر في srData
  useEffect(() => {
    if (!srData?.length) return;

    const targetId = id || getTicketId(srData[0]);
    if (!targetId) return;

    // ⚠️ ما نعملش redirect لو id موجود أو id === "create"
    if (!id || id === "create") return;

    if (srId !== targetId) {
      setCurrentSrId(targetId);
      navigate(`/service-request/${targetId}`, { replace: true });
    }
  }, [id, srData]);

  // ✅ Fetch SR Details
  const SR_URL = srId
    ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=ticketid=%22${srId}%22&_lid=${userName}&_lpwd=${userPassword}`
    : null;

  const { data: SRDataRow } = useFetch(SR_URL);

  // fetch api for get related WO
  const { data: relatedWO } = useFetch(
    `http://192.168.0.73:9080/maxrest/oslc/os/PORTALRELATEDRECORD?lean=1&oslc.select=*&oslc.where=relatedreckey="${srId}"&_lid=${userName}&_lpwd=${userPassword}`,
  );
  console.log("wo:", relatedWO);

  /* Assets */
  const { data: AssetData } = useFetch(
    `http://192.168.0.73:9080/maximo/oslc/os/PORTALASSET?lean=1&oslc.select=*&_lid=${userName}&_lpwd=${userPassword}`,
  );
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

  /* Department */
  const { data: DepartmentData } = useFetch(
    `http://192.168.0.73:9080/maximo/oslc/os/PORTALALNDOMAIN?lean=1&oslc.select=*&oslc.where=domainid="DEPT"&_lid=${userName}&_lpwd=${userPassword}`,
  );
  const departmentValues = React.useMemo(() => {
    return (
      DepartmentData?.member?.map((item) => ({
        value: item.value,
        description: item.description,
      })) || []
    );
  }, [DepartmentData]);

  useEffect(() => {
    if (SRDataRow?.member?.length) {
      setRowDataSr(SRDataRow.member);
      // console.log("RowDataSr:", SRDataRow.member);
    }
  }, [SRDataRow]);

  // ✅ Next / Previous navigation
  const changeSR = (direction) => {
    if (!srId || !srData?.length) return;

    const currentIndex = srData.findIndex((item) => getTicketId(item) === srId);
    if (currentIndex === -1) return;

    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0 || newIndex >= srData.length) return;

    const newId = getTicketId(srData[newIndex]);
    if (!newId) return;

    setCurrentSrId(newId);
    navigate(`/service-request/${newId}`);
  };

  const handleCreateSR = async () => {
    if (!formData?.description?.trim()) {
      setAlertState({
        open: true,
        message: "Please enter Description",
        severity: "error",
      });
      return;
    }

    if (!userName || !userPassword) {
      setAlertState({
        open: true,
        message: "User credentials not found",
        severity: "error",
      });
      return;
    }

    try {
      // تجهيز البيانات للإرسال
      const queryParams = Object.entries({
        DESCRIPTION: formData.description || "",
        LOCATION: formData.location || "",
        EXEDEPT: formData.exedept || "",
        WORKTYPE: formData.worktype || "",
        REPORTEDPRIORITY: formData.reportedpriority || "",
        _lid: userName,
        _lpwd: userPassword,
      })
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join("&");

      const url = `http://192.168.0.73:9080/maxrest/rest/os/MXSR?_action=addchange&${queryParams}`;

      console.log("📤 Create SR URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("❌ Create SR failed:", errText);
        // alert("Error", "Failed to create Service Request");
        setAlertState({
          open: true,
          message: "Failed to create Service Request",
          severity: "error",
        });
        return;
      }

      const result = await response.json();
      console.log("✅ SR Created:", result);

      // alert("Success", "Service Request created successfully!");
      setAlertState({
        open: true,
        message: "Service Request created successfully!",
        severity: "success",
      });

      // لو حابب ترجع لوضع view بعد الإنشاء
      if (result?.ticketid) {
        setCurrentSrId(result.ticketid);
        navigate(`/service-request/${result.ticketid}`);
        // setValue("view");
      }
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      // alert("Error", "Unexpected error while creating SR");
      setAlertState({
        open: true,
        message: "Unexpected error while creating SR",
        severity: "error",
      });
    }
  };

  const handleFileChange2 = (files) => {
    // console.log("Files uploaded:", files);
  };

  useEffect(() => {
  if (id === "create") {
    setCurrentSrId(null);
  }
}, [id]);

  return (
    <div className="mb-2">
      <ExtendNavBarTabs
        routePage={"service-request"}
        tabs={tabs}
        activeTab={activeTab ?? 0}
        setActiveTab={setActiveTab}
      />

      <Box sx={{ mt: 1, minHeight: 300 }}>
        {/* أيقونات الإجراءات */}
        {mode === "create" ? (
          <Box sx={{ display: "flex", justifyContent: "end", mb: 2, gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Tooltip title="Add Attachment" arrow>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <AttachFileIcon
                    onClick={() => {
                      setAttachment(true);
                      // setMap(true);
                    }}
                    className="printer-icon"
                  />
                </motion.div>
              </Tooltip>
              <Tooltip title="Show Location" arrow>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <AddLocationAltIcon
                    onClick={() => {
                      setShowReportsModal(true);
                      setMap(true);
                    }}
                    className="printer-icon"
                  />
                </motion.div>
              </Tooltip>
              <Tooltip title="Create SR" arrow onClick={handleCreateSR}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <MedicalServicesIcon className="printer-icon" />
                </motion.div>
              </Tooltip>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
             <Tooltip
  title="Create New"
  arrow
  onClick={() => {
    navigate("/service-request/create");
  }}
>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <IoMdCreate className="printer-icon" />
                </motion.div>
              </Tooltip>
              <Tooltip title="Save" arrow>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <Save className="printer-icon" />
                </motion.div>
              </Tooltip>
              <Tooltip title="Previous SR" arrow>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <SkipPrevious
                    onClick={() => changeSR("prev")}
                    className="printer-icon"
                  />
                </motion.div>
              </Tooltip>
              <Tooltip title="Next SR" arrow>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <SkipNext
                    onClick={() => changeSR("next")}
                    className="printer-icon"
                  />
                </motion.div>
              </Tooltip>
              <Tooltip title="Route Workflow" arrow>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <FaRoute className="printer-icon" />
                </motion.div>
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Scan QR" arrow>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <QrCodeScannerIcon
                    onClick={() => setShowReportsModal(true)}
                    className="printer-icon"
                  />
                </motion.div>
              </Tooltip>
              <Tooltip title="Show Location" arrow>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <AddLocationAltIcon
                    onClick={() => {
                      setShowReportsModal(true);
                      setMap(true);
                    }}
                    className="printer-icon"
                  />
                </motion.div>
              </Tooltip>
              <Tooltip title="Print" arrow>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="print-iconBox"
                >
                  <img
                    src={printerImage}
                    alt="printer"
                    className="printer-icon"
                  />
                </motion.div>
              </Tooltip>
            </Box>
          </Box>
        )}

        {/* Form Component */}
        <SRForm
          ValueData={SRDataRow?.member}
          dataView={RowDataSr}
          formData={formData}
          setFormData={setFormData}
          assetValues={assetValues}
          departmentValues={departmentValues}
          relatedWO={relatedWO?.member?.[0]}
          mode={mode}
        />
        {/* For show map and location */}
       {/* Map or QR Modal */}
{showReportsModal && !attachment && (
  <Pops
    Title="QR code For Service Request"
    component={
      map ? <MapCom /> : <QRDisplay qrUrl={`${window.location.origin}/maximo/service-request/${srId}`} />
    }
    id={srId}
    show={showReportsModal}
    onHide={() => {
      setShowReportsModal(false);
      setMap(false);
    }}
    reportType="SR"
  />
)}

{/* Attachment Modal */}
{attachment && (
  <Pops
    Title="Attachments"
    component={
      <AttachmentSection
        handleFileChange2={handleFileChange2}
        RowDataSr={RowDataSr}
        document={document}
      />
    }
    id={srId}
    show={attachment}
    onHide={() => setAttachment(false)}
    reportType="SR"
  />
)}

      </Box>
      {/* Show sweet alert  */}

      <Snackbar
        open={alertState.open}
        autoHideDuration={4000}
        onClose={() => setAlertState({ ...alertState, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={alertState.severity}
          variant="filled"
          onClose={() => setAlertState({ ...alertState, open: false })}
          sx={{ width: "100%" }}
          autoHideDuration={1000}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SRTest;

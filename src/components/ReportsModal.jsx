// Components/Common/ReportsModal.jsx
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import "../Style/ReportsModal.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import FormsModal from "./FormsModal";
import {useFetch} from '../hooks/useFetch'

const ReportsModal = ({ show, onHide, reportType }) => {
  const [selectedReport, setSelectedReport] = useState("");
  const [isCursorOutside, setIsCursorOutside] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [reportName, setReportName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const modalRef = useRef(null);
  const { data: posts } = useFetch(reportType, "");
  const { data: reportPosts } = useFetch(reportType, reportName);
  const apiReports = posts?.["rdfs:member"] || [];
  const apiReportsName = reportPosts?.["rdfs:member"] || [];

  // ✅ Pagination based on SR length
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(apiReports.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ✅ Handle mouse in/out cursor logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        setIsCursorOutside(!isInside);
      }
    };

    if (show) {
      document.addEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "wait";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "default";
    };
  }, [show]);

  useEffect(() => {
    if (show) {
      document.body.style.cursor = isCursorOutside ? "wait" : "default";
    }
  }, [isCursorOutside, show]);

  const showReportFinall = (report) => {
    if (report && report["spi:description"] === "Open Ticket Detail") {
      // Use proxy URL to avoid CORS issues
      const proxyUrl = `http://192.168.0.73:2525/WebViewerExample/run?__report=report/woPrint2.rptdesign&__format=pdf`;

      const customPage = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>BIRT Report - Your Application</title>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              height: 100vh; 
              overflow: hidden;
              font-family: Arial, sans-serif;
            }
            .loading {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              flex-direction: column;
            }
            .spinner {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #3498db;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin-bottom: 20px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            iframe { 
              width: 100%; 
              height: 100vh; 
              border: none; 
            }
          </style>
        </head>
        <body>
          <div id="loading" class="loading">
            <div class="spinner"></div>
            <p>Loading BIRT Report...</p>
          </div>
          <iframe 
            id="reportFrame"
            src="${proxyUrl}" 
            onload="document.getElementById('loading').style.display='none'"
            onerror="document.getElementById('loading').innerHTML='<p>Error loading report. <a href=\'${proxyUrl}\' target=\'_blank\'>Click here to open directly</a></p>'"
          ></iframe>
        </body>
        </html>
      `;

      const newWindow = window.open("", "_blank");
      newWindow.document.write(customPage);
      newWindow.document.close();
      onHide();
    }
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setReportName(report["spi:reportname"]);
    // console.log("Selected Report:", report);
  };

  return (
    <>
      {showForm ? (
        <FormsModal apiReportsName={apiReportsName} show={showForm} onHide={() => setShowForm(false)} />
      ) : (
        <Modal
          show={show}
          onHide={onHide}
          centered
          className="reports-modal"
        >
          <div ref={modalRef}>
            <Modal.Header closeButton className="modal-header-custom">
              <Modal.Title>Reports and Schedules</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={12}>
                  {/* Filter Section with Arrow */}
                  <Box sx={{ mb: 3 }} className="filter-section d-flex">
                    <div className="filter-header">
                      <span className="filter-arrow">▼</span>
                      <h6 className="fw-bold filter-title">Filter</h6>
                    </div>
                    <div className="filter-content">
                      <div className="d-flex align-items-center filter-items">
                        <div className="pagination-arrows">
                          <button
                            className="arrow-btn"
                            disabled={currentPage === 1}
                            onClick={() => paginate(currentPage - 1)}
                          >
                            <ArrowCircleLeftIcon className="arrow" />
                          </button>
                          <span className="page-info">
                            {indexOfFirstItem + 1} -{" "}
                            {Math.min(indexOfLastItem, apiReports.length)} of{" "}
                            {apiReports.length}
                          </span>
                          <button
                            className="arrow-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => paginate(currentPage + 1)}
                          >
                            <ArrowCircleRightIcon className="arrow" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Col>

                <Col md={12}>
                  <Box sx={{ mb: 3 }}>
                    <h6 className="fw-bold">Description</h6>
                    <div className="report-options">
                      {currentItems.map((report) => (
                        <div
                          key={report["spi:reportid"]}
                          className={`report-option ${
                            selectedReport === report ? "selected" : ""
                          }`}
                          onClick={() => handleReportClick(report)}
                        >
                          {report["spi:description"] || "Unnamed Report"}
                        </div>
                      ))}
                    </div>
                  </Box>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="modal-footer-custom">
              {/* <Button
            variant="primary"
            disabled={!selectedReport}
            onClick={() => showReportFinall(selectedReport)}
          >
            Run Report
          </Button> */}
              <Button
                className="new-fancy-row-btn"
                disabled={!selectedReport}
                onClick={() => {
                  setShowForm(true); // open Forms modal
                }}
              >
                Next
              </Button>

              <Button className="custom-btn-outline cancel-report" onClick={onHide}>
                Cancel
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ReportsModal;

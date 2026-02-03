// Components/Common/ReportsModal.jsx
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import "../../Style/ReportsModal.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useFetch } from "../../hooks/useFetch";
import FormsModal from "../FormsModal";
import QRDisplay from "../QRDisplay";


const Pops = ({ Title, show, onHide, reportType ,component}) => {
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




  return (
    <>
     
        <Modal
          show={show}
          onHide={onHide}
          centered
          className="reports-modal"
        >
          <div ref={modalRef}>
            <Modal.Header closeButton className="modal-header-custom">
              <Modal.Title> {Title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={12}>
                  {component}
                </Col>
              </Row>
            </Modal.Body>
            {/* <Modal.Footer className="modal-footer-custom">
             
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
            </Modal.Footer> */}
          </div>
        </Modal>
    </>
  );
};

export default Pops;

import { useEffect, useState } from "react";
import { Col, Container, Row, Dropdown, Table, Button } from "react-bootstrap";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { useSidebar } from "../../components/Context/SidebarContext";
import ReportsModal from "../../components/ReportsModal";
import "../../Style/ServiceRequest.css";
import TableData from "../../components/Common/TableData";

const currentItems2 = [
  {
    ticketid: "WO-001",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "CLOSED",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
  {
    ticketid: "WO-002",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "NEW",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
  {
    ticketid: "WO-003",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "INPROG",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
  {
    ticketid: "WO-004",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "CLOSED",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
  {
    ticketid: "WO-005",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "New",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
  {
    ticketid: "WO-006",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "INPROG",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
  {
    ticketid: "WO-007",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "CLOSED",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
  {
    ticketid: "WO-008",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "NEW",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
  {
    ticketid: "WO-009",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "INPROG",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
  {
    ticketid: "WO-010",
    description: "Low water pressure",
    exedept: "MECH",
    worktype: "CM",
    reportedpriority: "3",
    reportedby: "HELPDESK1",
    reportdate: "2022-11-06T10:14:59+02:00",
    status: "CLOSED",
    statusdate: "2022-11-06T10:40:06+02:00",
  },
];

const WorkOrder = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [showReportsModal, setShowReportsModal] = useState(false);

  // Static data for service requests
  const [srData] = useState([
    {
      id: 1,
      number: "WO-001",
      status: "Open",
      owner: "John Doe",
      priority: "High",
      created: "2025-09-15",
    },
    {
      id: 2,
      number: "WO-002",
      status: "In Progress",
      owner: "Jane Smith",
      priority: "Medium",
      created: "2025-09-16",
    },
    {
      id: 3,
      number: "WO-003",
      status: "Closed",
      owner: "Mike Johnson",
      priority: "Low",
      created: "2025-09-10",
    },
    {
      id: 4,
      number: "WO-004",
      status: "Open",
      owner: "Sarah Wilson",
      priority: "High",
      created: "2025-09-17",
    },
    {
      id: 5,
      number: "WO-005",
      status: "Pending",
      owner: "Alex Brown",
      priority: "Medium",
      created: "2025-09-14",
    },
    {
      id: 6,
      number: "WO-006",
      status: "In Progress",
      owner: "Chris Green",
      priority: "Low",
      created: "2025-09-18",
    },
    {
      id: 7,
      number: "WO-007",
      status: "Closed",
      owner: "Emma White",
      priority: "High",
      created: "2025-09-12",
    },
    {
      id: 8,
      number: "WO-008",
      status: "Pending",
      owner: "Oliver Black",
      priority: "Medium",
      created: "2025-09-19",
    },
    {
      id: 9,
      number: "WO-009",
      status: "Open",
      owner: "Sophia Blue",
      priority: "Low",
      created: "2025-09-11",
    },
    {
      id: 10,
      number: "WO-010",
      status: "Closed",
      owner: "Liam Gray",
      priority: "High",
      created: "2025-09-20",
    },
    {
      id: 1,
      number: "WO-001",
      status: "Open",
      owner: "John Doe",
      priority: "High",
      created: "2025-09-15",
    },
    {
      id: 2,
      number: "WO-002",
      status: "In Progress",
      owner: "Jane Smith",
      priority: "Medium",
      created: "2025-09-16",
    },
    {
      id: 3,
      number: "WO-003",
      status: "Closed",
      owner: "Mike Johnson",
      priority: "Low",
      created: "2025-09-10",
    },
    {
      id: 4,
      number: "WO-004",
      status: "Open",
      owner: "Sarah Wilson",
      priority: "High",
      created: "2025-09-17",
    },
    {
      id: 5,
      number: "WO-005",
      status: "Pending",
      owner: "Alex Brown",
      priority: "Medium",
      created: "2025-09-14",
    },
    {
      id: 6,
      number: "WO-006",
      status: "In Progress",
      owner: "Chris Green",
      priority: "Low",
      created: "2025-09-18",
    },
    {
      id: 7,
      number: "WO-007",
      status: "Closed",
      owner: "Emma White",
      priority: "High",
      created: "2025-09-12",
    },
    {
      id: 8,
      number: "WO-008",
      status: "Pending",
      owner: "Oliver Black",
      priority: "Medium",
      created: "2025-09-19",
    },
    {
      id: 9,
      number: "WO-009",
      status: "Open",
      owner: "Sophia Blue",
      priority: "Low",
      created: "2025-09-11",
    },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = srData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = srData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const { sidebarOpen } = useSidebar();
  const sidebarWidth = sidebarOpen ? 220 : 65;

  const handleAction = (action) => {
    setSelectedAction(action);

    switch (action) {
      case "changeStatus":
        console.log("Changing status...");
        break;
      case "selectOwner":
        console.log("Selecting owner...");
        break;
      case "takeOwnership":
        console.log("Taking ownership...");
        break;
      case "runReports":
        console.log("Running reports...");
        setShowReportsModal(true);
        break;
      case "cognosAnalytics":
        console.log("Opening Cognos Analytics...");
        break;
      default:
        break;
    }
  };

  const handleCloseReportsModal = () => {
    setShowReportsModal(false);
  };

  // Static data for dashboard cards
  const dashboardStats = {
    serviceRequests: 550,
    allWorkOrders: 1050,
    pendingWorkOrders: 150,
    closedWorkOrders: 900,
  };

  return (
    <div className="app-container mb-5">
      <Box
        component="main"
        sx={{
          transition: "margin 0.3s ease",
        }}
      >
        {/* ===== Header ===== */}
        <Row className="my-4 justify-content-between">
          <Col xs={8} md={4}>
            <h4
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Work Order 👋
            </h4>
          </Col>
          <Col xs={4} md={4} sm={4} className="d-flex justify-content-center">
            <Dropdown className="report">
              <Dropdown.Toggle
                variant="primary"
                className="create-service-dropdown "
                style={{
                  backgroundColor: "#1565c0",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <AddIcon className="create-icon" />
                <span>Select Action</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="report_menu">
                <Dropdown.Item onClick={() => handleAction("changeStatus")}>
                  Change Status
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAction("selectOwner")}>
                  Select Owner
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAction("takeOwnership")}>
                  Take Ownership
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleAction("runReports")}>
                  Run Reports
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAction("cognosAnalytics")}>
                  Cognos Analytics
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={3} md={4} className="d-flex justify-content-end">
            <Link className="create-service">
              <AddIcon />
              Create Work Order
            </Link>
            {/* <EmailSend /> */}
          </Col>
        </Row>

        {/* Dashboard Stats */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Box
              className="stat-card"
              sx={{ p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}
            >
              <h6 className="text-primary">Service Requests</h6>
              <h4 className="fw-bold">{dashboardStats.serviceRequests}</h4>
            </Box>
          </Col>
          <Col md={3} className="mb-3">
            <Box
              className="stat-card"
              sx={{ p: 2, backgroundColor: "#e8f5e9", borderRadius: 2 }}
            >
              <h6 className="text-success">All Work Orders</h6>
              <h4 className="fw-bold">{dashboardStats.allWorkOrders}</h4>
            </Box>
          </Col>
          <Col md={3} className="mb-3">
            <Box
              className="stat-card"
              sx={{ p: 2, backgroundColor: "#fff3e0", borderRadius: 2 }}
            >
              <h6 className="text-warning">Pending Work Orders</h6>
              <h4 className="fw-bold">{dashboardStats.pendingWorkOrders}</h4>
            </Box>
          </Col>
          <Col md={3} className="mb-3">
            <Box
              className="stat-card"
              sx={{ p: 2, backgroundColor: "#fbe9e7", borderRadius: 2 }}
            >
              <h6 className="text-danger">Closed Work Orders</h6>
              <h4 className="fw-bold">{dashboardStats.closedWorkOrders}</h4>
            </Box>
          </Col>
        </Row>

        {/* Service Requests Table */}
        <TableData
          srDataTwo={currentItems2}
          tableHeader={"Work Order"}
          routePage={"work-orders"}
        />
      </Box>
      {showReportsModal && (
        <ReportsModal
          show={showReportsModal}
          onHide={handleCloseReportsModal}
          reportType={"WOTRACK"}
        />
      )}
    </div>
  );
};

export default WorkOrder;

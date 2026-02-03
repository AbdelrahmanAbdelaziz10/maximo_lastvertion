import { Box, CardContent, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Filter } from "lucide-react";
import {
  Container,
  Row,
  Col,
  Nav,
  Card,
  Table,
  Form,
  Button,
} from "react-bootstrap";
const Actual = ({ RowDataSr }) => {
  const TasksWO = [
    "Sequence	",
    "Task",
    "Summary",
    "	Estimated Duration",
    "Done?",
    "Status",
  ];
  const ChildrenWO = [
    "Sequence	",
    "Work Order",
    "Summary",
    "Location",
    "Asset",
    "Status",
  ];
  const TasksWOVariable = {
    sequence: "",
    task: "",
    summary: "",
    duration: "",
    done: "",
    status: "",
  };
  const ChildrenWOVariable = {
    sequence: "",
    task: "",
    summary: "",
    duration: "",
    done: "",
    status: "",
  };

  const [showFilter, setShowFilter] = useState(false);
  const [rows, setRows] = useState([]);
  const [activeTab, setActiveTab] = useState("Labor");
  const [workLogData, setWorkLogData] = useState([]);
  const handleAddRow = () => {
    setRows([...rows, TasksWOVariable]);
  };

  const handleWorkLogCheckboxChange = (index) => {
    const newData = [...workLogData];
    newData[index].viewable = !newData[index].viewable;
    setWorkLogData(newData);
  };

  return (
    <>
      {/* ===== Header Section ===== */}
      <Card
        sx={{
          marginBottom: 5,
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent>
          <Row className="g-2 justify-content-around ">
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Service Request:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr?.ticketid || ""}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Input
                  fullWidth
                  value={RowDataSr?.description || " "}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>

            <Col xs={12} md={6} lg={2}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Site:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr?.siteid || " "}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Status:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr?.status || " "}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "text.secondary",
                  }}
                >
                  Parent WO:
                </Typography>
                <Input
                  fullWidth
                  value={RowDataSr?.status || " "}
                  readOnly
                  sx={{
                    flex: 1,
                    paddingLeft: 1,
                    borderBottom: "1px dotted #999",
                  }}
                />
              </Box>
            </Col>
          </Row>
        </CardContent>
      </Card>
      {/* ===== Section 2: Children of Work Order ===== */}
      <Row>
        <Col xs={12} md={12}>
          <div className="specs-fancy-wrapper">
            {/* Header Bar */}
            <div className="specs-fancy-header">
              <h3>Children of Work Order</h3>

              <div className="specs-fancy-actions">
                <button
                  className={`filter-fancy-btn ${showFilter ? "active" : ""}`}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <i className="fa fa-filter"></i> Filter
                </button>

                <button className="icon-fancy-btn" title="Refresh">
                  <i className="fa fa-refresh"></i>
                </button>

                <span className="rows-fancy-info">0 - 0 of 0</span>

                <button className="icon-fancy-btn" title="Download">
                  <i className="fa fa-download"></i>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="specs-fancy-table-container">
              <table className="specs-fancy-table">
                <thead>
                  <tr>
                    {ChildrenWO?.map((item, index) => (
                      <th key={index}> {item} </th>
                    ))}
                    {/* <th>Description</th>
              <th>Data Type</th>
              <th>Date Value</th>
              <th>Alphanumeric Value</th>
              <th>Numeric Value</th>
              <th>Unit of Measure</th>
              <th>Section</th> */}
                  </tr>

                  {showFilter && (
                    <tr className="filter-fancy-row">
                      {[
                        "text",
                        "text",
                        "text",
                        "text",
                        "text",
                        "text",
                        // "date",
                        // "text",
                        // "number",
                        // "text",
                        // "text",
                      ].map((type, idx) => (
                        <td key={idx}>
                          <input
                            type={type}
                            placeholder={type === "date" ? "" : "Search..."}
                          />
                        </td>
                      ))}
                    </tr>
                  )}
                </thead>

                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="fancy-empty-msg">
                        <div className="no-fancy-rows">
                          <p>There are no rows to display.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    rows.map((r, i) => (
                      <tr key={i}>
                        <td>{r.attribute}</td>
                        <td>{r.description}</td>
                        <td>{r.dataType}</td>
                        <td>{r.dateValue}</td>
                        <td>{r.alphanumericValue}</td>
                        <td>{r.numericValue}</td>
                        <td>{r.unitOfMeasure}</td>
                        <td>{r.section}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* New Row Button */}
            <div className="new-fancy-row-container">
              <button
                className="new-fancy-row-btn-next mx-2"
                onClick={handleAddRow}
              >
                <i className="fa fa-plus"></i> Select Work Order
              </button>
              <button className="new-fancy-row-btn" onClick={handleAddRow}>
                <i className="fa fa-plus"></i> New Row
              </button>
            </div>
          </div>
        </Col>
      </Row>
      {/* ===== Section 3: Tasks for Work Order ===== */}
      <Row>
        <Col xs={12} md={12}>
          <div className="specs-fancy-wrapper">
            {/* Header Bar */}
            <div className="specs-fancy-header">
              <h3>Tasks for Work Order</h3>

              <div className="specs-fancy-actions">
                <button
                  className={`filter-fancy-btn ${showFilter ? "active" : ""}`}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <i className="fa fa-filter"></i> Filter
                </button>

                <button className="icon-fancy-btn" title="Refresh">
                  <i className="fa fa-refresh"></i>
                </button>

                <span className="rows-fancy-info">0 - 0 of 0</span>

                <button className="icon-fancy-btn" title="Download">
                  <i className="fa fa-download"></i>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="specs-fancy-table-container">
              <table className="specs-fancy-table">
                <thead>
                  <tr>
                    {TasksWO?.map((item, index) => (
                      <th key={index}> {item} </th>
                    ))}
                    {/* <th>Description</th>
              <th>Data Type</th>
              <th>Date Value</th>
              <th>Alphanumeric Value</th>
              <th>Numeric Value</th>
              <th>Unit of Measure</th>
              <th>Section</th> */}
                  </tr>

                  {showFilter && (
                    <tr className="filter-fancy-row">
                      {[
                        "text",
                        "text",
                        "text",
                        "text",
                        "text",
                        "text",
                        // "date",
                        // "text",
                        // "number",
                        // "text",
                        // "text",
                      ].map((type, idx) => (
                        <td key={idx}>
                          <input
                            type={type}
                            placeholder={type === "date" ? "" : "Search..."}
                          />
                        </td>
                      ))}
                    </tr>
                  )}
                </thead>

                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="fancy-empty-msg">
                        <div className="no-fancy-rows">
                          <p>There are no rows to display.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    rows.map((r, i) => (
                      <tr key={i}>
                        <td>{r.attribute}</td>
                        <td>{r.description}</td>
                        <td>{r.dataType}</td>
                        <td>{r.dateValue}</td>
                        <td>{r.alphanumericValue}</td>
                        <td>{r.numericValue}</td>
                        <td>{r.unitOfMeasure}</td>
                        <td>{r.section}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* New Row Button */}
            <div className="new-fancy-row-container">
              <button className="new-fancy-row-btn" onClick={handleAddRow}>
                <i className="fa fa-plus"></i> New Row
              </button>
            </div>
          </div>
        </Col>
      </Row>
      {/* ===== Section 4: Tasks for Work Order ===== */}

      <Card className="shadow-sm mb-5">
        {/* Header with Tabs */}
        <Card.Header className="border-bottom p-2 pt-0 mb-1">
          <Nav variant="tabs" className="border-0">
            <Nav.Item>
              <Nav.Link
                active={activeTab === "Labor"}
                onClick={() => setActiveTab("Labor")}
                className="py-3 px-4 fw-semibold border-0"
                style={{
                  backgroundColor:
                    activeTab === "Labor" ? "#1976d2" : "transparent",
                  color: activeTab === "Labor" ? "#fff" : "#1976d2",
                  borderBottom:
                    activeTab === "Labor" ? "2px solid #1976d2" : "none",
                }}
              >
                Labor
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === "Materials"}
                onClick={() => setActiveTab("Materials")}
                className="py-3 px-4 fw-semibold border-0"
                style={{
                  backgroundColor:
                    activeTab === "Materials" ? "#1976d2" : "transparent",
                  color: activeTab === "Materials" ? "white" : "#1976d2",
                  borderBottom:
                    activeTab === "Materials" ? "2px solid #1976d2" : "none",
                }}
              >
                Materials
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === "Services"}
                onClick={() => setActiveTab("Services")}
                className="py-3 px-4 fw-semibold border-0"
                style={{
                  backgroundColor:
                    activeTab === "Services" ? "#1976d2" : "transparent",
                  color: activeTab === "Services" ? "white" : "#1976d2",
                  borderBottom:
                    activeTab === "Services" ? "2px solid #1976d2" : "none",
                }}
              >
                Services
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === "Tools"}
                onClick={() => setActiveTab("Tools")}
                className="py-3 px-4 fw-semibold border-0"
                style={{
                  backgroundColor:
                    activeTab === "Tools" ? "#1976d2" : "transparent",
                  color: activeTab === "Tools" ? "white" : "#1976d2",
                  borderBottom:
                    activeTab === "Tools" ? "2px solid #1976d2" : "none",
                }}
              >
                Tools
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body className="p-0">
          {/* Labor Content */}
          {activeTab === "Labor" && (
            <>
              {/* Toolbar Section */}
              <Row className="align-items-center bg-light py-2 px-3 m-0 border-bottom">
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold me-3">Labor</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setShowFilter(!showFilter)}
                      className="d-flex align-items-center"
                    >
                      <Filter size={14} className="me-1" />
                      Filter
                    </Button>
                  </div>
                </Col>
                <Col md={6} className="text-end">
                  <span className="text-muted small">0 - 0 of 0</span>
                </Col>
              </Row>

              {/* Table Section */}
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-3 py-2 border-end">Task </th>
                      <th className="px-3 py-2 border-end">Labor </th>
                      <th className="px-3 py-2 border-end">Name</th>
                      <th className="px-3 py-2 border-end">Approved?</th>
                      <th className="px-3 py-2 border-end">Start Date</th>
                      <th className="px-3 py-2 border-end">Start Time</th>
                      <th className="px-3 py-2 border-end">End Time</th>
                      <th className="px-3 py-2 border-end">Regular Hours</th>
                      <th className="px-3 py-2 border-end">Rate</th>
                    </tr>
                  </thead>

                  {/* Filter Row */}
                  {showFilter && (
                    <tbody>
                      <tr className="bg-white">
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                      </tr>
                    </tbody>
                  )}

                  {/* Data Rows */}
                  <tbody>
                    {workLogData.map((row, index) => (
                      <tr key={index} className="border-top">
                        <td className="px-3 py-2 border-end">
                          <div className="d-flex align-items-center text-primary cursor-pointer">
                            <ChevronRight size={16} className="me-1" />
                            {row.record}
                          </div>
                        </td>
                        <td className="px-3 py-2 border-end">{row.class}</td>
                        <td className="px-3 py-2 border-end">
                          {row.createdBy}
                        </td>
                        <td className="px-3 py-2 border-end">{row.date}</td>
                        <td className="px-3 py-2 border-end">{row.type}</td>
                        <td className="px-3 py-2 border-end">{row.summary}</td>
                        <td className="px-3 py-2 text-center">
                          <Form.Check
                            type="checkbox"
                            checked={row.viewable}
                            onChange={() => handleWorkLogCheckboxChange(index)}
                            className="d-inline-block"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Footer */}
              <Card.Footer className="bg-white border-0 py-3">
                <div className="d-flex justify-content-end">
                  <Button variant="primary" size="sm">
                    New Row
                  </Button>
                </div>
              </Card.Footer>
            </>
          )}

          {/* Materials Content */}
          {activeTab === "Materials" && (
            <>
              {/* Toolbar Section */}
              <Row className="align-items-center bg-light py-2 px-3 m-0 border-bottom">
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold me-3">Materials</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setShowFilter(!showFilter)}
                      className="d-flex align-items-center"
                    >
                      <Filter size={14} className="me-1" />
                      Filter
                    </Button>
                  </div>
                </Col>
                <Col md={6} className="text-end">
                  <span className="text-muted small">0 - 0 of 0</span>
                </Col>
              </Row>

              {/* Table Section */}
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-3 py-2 border-end">Task</th>
                      <th className="px-3 py-2 border-end">Item</th>
                      <th className="px-3 py-2 border-end">Description</th>
                      <th className="px-3 py-2 border-end">Transaction Type</th>
                      <th className="px-3 py-2 border-end">Storeroom</th>
                      <th className="px-3 py-2 border-end">Quantity</th>
                      <th className="px-3 py-2 border-end">Bin</th>
                    </tr>
                  </thead>

                  {/* Filter Row */}
                  {showFilter && (
                    <tbody>
                      <tr className="bg-white">
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                      </tr>
                    </tbody>
                  )}

                  {/* Empty State */}
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        There are no rows to display.
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* Footer */}
              <Card.Footer className="bg-white border-0 py-3">
                <div className="d-flex justify-content-end">
                  <Button variant="primary" size="sm">
                    New Row
                  </Button>
                </div>
              </Card.Footer>
            </>
          )}
          {/*  Services Content */}
          {activeTab === "Services" && (
            <>
              {/* Toolbar Section */}
              <Row className="align-items-center bg-light py-2 px-3 m-0 border-bottom">
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold me-3">Services </span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setShowFilter(!showFilter)}
                      className="d-flex align-items-center"
                    >
                      <Filter size={14} className="me-1" />
                      Filter
                    </Button>
                  </div>
                </Col>
                <Col md={6} className="text-end">
                  <span className="text-muted small">0 - 0 of 0</span>
                </Col>
              </Row>

              {/* Table Section */}
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-3 py-2 border-end">Task</th>
                      <th className="px-3 py-2 border-end">Service</th>
                      <th className="px-3 py-2 border-end">Description</th>
                      <th className="px-3 py-2 border-end">Quantity</th>
                      <th className="px-3 py-2 border-end"> Unit Cost</th>
                      <th className="px-3 py-2 border-end"> Loaded Cost</th>
                    </tr>
                  </thead>

                  {/* Filter Row */}
                  {showFilter && (
                    <tbody>
                      <tr className="bg-white">
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                      </tr>
                    </tbody>
                  )}

                  {/* Empty State */}
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        There are no rows to display.
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* Footer */}
              <Card.Footer className="bg-white border-0 py-3">
                <div className="d-flex justify-content-end">
                  <Button variant="primary" size="sm">
                    New Row
                  </Button>
                </div>
              </Card.Footer>
            </>
          )}
          {/*  lockout Content */}
          {activeTab === "Tools" && (
            <>
              {/* Toolbar Section */}
              <Row className="align-items-center bg-light py-2 px-3 m-0 border-bottom">
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold me-3">Tools </span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setShowFilter(!showFilter)}
                      className="d-flex align-items-center"
                    >
                      <Filter size={14} className="me-1" />
                      Filter
                    </Button>
                  </div>
                </Col>
                <Col md={6} className="text-end">
                  <span className="text-muted small">0 - 0 of 0</span>
                </Col>
              </Row>

              {/* Table Section */}
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-3 py-2 border-end">Task</th>
                      <th className="px-3 py-2 border-end">Tool</th>
                      <th className="px-3 py-2 border-end">Description</th>
                      <th className="px-3 py-2 border-end">Quantity</th>
                      <th className="px-3 py-2 border-end"> Tool Hours</th>
                      <th className="px-3 py-2 border-end"> Rate </th>
                      <th className="px-3 py-2 border-end"> Line Cost</th>
                      <th className="px-3 py-2 border-end"> Outside? </th>
                      <th className="px-3 py-2 border-end"> Location </th>
                    </tr>
                  </thead>

                  {/* Filter Row */}
                  {showFilter && (
                    <tbody>
                      <tr className="bg-white">
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                        <td className="p-0 border-end">
                          <Form.Control
                            size="sm"
                            placeholder="Filter..."
                            className="border-0 rounded-0 w-85 shadow-none"
                          />
                        </td>
                      </tr>
                    </tbody>
                  )}

                  {/* Empty State */}
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        There are no rows to display.
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* Footer */}
              <Card.Footer className="bg-white border-0 py-3">
                <div className="d-flex justify-content-end">
                  <Button variant="primary" size="sm">
                    New Row
                  </Button>
                </div>
              </Card.Footer>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Actual;

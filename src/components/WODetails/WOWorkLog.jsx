import { useState } from "react";
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
import SpecificationsTable from "../ServesDetailsCom/SpecificationsTable";

const WOWorkLog = () => {
 const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("hazards");
  const [workLogData, setWorkLogData] = useState([
    
  ]);



  const handleWorkLogCheckboxChange = (index) => {
    const newData = [...workLogData];
    newData[index].viewable = !newData[index].viewable;
    setWorkLogData(newData);
  };

  return (
    <Container fluid className="p-0">
      <Card className="shadow-sm">
        {/* Header with Tabs */}
        <Card.Header className="border-bottom p-2 pt-0 mb-1">
          <Nav variant="tabs" className="border-0">
            <Nav.Item>
              <Nav.Link
                active={activeTab === "hazards"}
                onClick={() => setActiveTab("hazards")}
                className="py-3 px-4 fw-semibold border-0"
                style={{
                  backgroundColor:
                    activeTab === "hazards" ? "#1976d2" : "transparent",
                  color: activeTab === "hazards" ? "#fff" : "#1976d2",
                  borderBottom:
                    activeTab === "hazards" ? "2px solid #1976d2" : "none",
                }}
              >
                Hazards and Precautions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === "materials"}
                onClick={() => setActiveTab("materials")}
                className="py-3 px-4 fw-semibold border-0"
                style={{
                  backgroundColor:
                    activeTab === "materials"
                      ? "#1976d2"
                      : "transparent",
                  color: activeTab === "materials" ? "white" : "#1976d2",
                  borderBottom:
                    activeTab === "materials"
                      ? "2px solid #1976d2"
                      : "none",
                }}
              >
                Hazardous Materials
              </Nav.Link>
            </Nav.Item>
                        <Nav.Item>
              <Nav.Link
                active={activeTab === "lockout"}
                onClick={() => setActiveTab("lockout")}
                className="py-3 px-4 fw-semibold border-0"
                style={{
                  backgroundColor:
                    activeTab === "lockout"
                      ? "#1976d2"
                      : "transparent",
                  color: activeTab === "lockout" ? "white" : "#1976d2",
                  borderBottom:
                    activeTab === "lockout"
                      ? "2px solid #1976d2"
                      : "none",
                }}
              >
                Lock Out/Tag Out
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body className="p-0">
          {/* hazards Content */}
          {activeTab === "hazards" && (
            <>
              {/* Toolbar Section */}
              <Row className="align-items-center bg-light py-2 px-3 m-0 border-bottom">
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold me-3">Work Logs</span>
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
                      <th className="px-3 py-2 border-end">Hazard</th>
                      <th className="px-3 py-2 border-end">Hazard Description</th>
                      <th className="px-3 py-2 border-end">Hazard Type</th>
                      <th className="px-3 py-2 border-end">Related Location</th>
                      <th className="px-3 py-2 border-end">Related Asset</th>
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

          {/* materials Content */}
          {activeTab === "materials" && (
            <>
              {/* Toolbar Section */}
              <Row className="align-items-center bg-light py-2 px-3 m-0 border-bottom">
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold me-3">Communication Logs</span>
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
                      <th className="px-3 py-2 border-end">Hazard</th>
                      <th className="px-3 py-2 border-end">Hazard Description</th>
                      <th className="px-3 py-2 border-end">Related Location</th>
                      <th className="px-3 py-2 border-end">Related Asset</th>
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
          {activeTab === "lockout" && (
            <>
              {/* Toolbar Section */}
              <Row className="align-items-center bg-light py-2 px-3 m-0 border-bottom">
                <Col md={6}>
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold me-3">Communication Logs</span>
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
                      <th className="px-3 py-2 border-end">Hazard</th>
                      <th className="px-3 py-2 border-end">Hazard Description</th>
                      <th className="px-3 py-2 border-end">Related Location</th>
                      <th className="px-3 py-2 border-end">Related Asset</th>
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

         {/* ===== Section 1: Service Request Details ===== */}
          
                      <SpecificationsTable Title={"Precautions"} />
                    
    </Container>
  );
}


export default WOWorkLog

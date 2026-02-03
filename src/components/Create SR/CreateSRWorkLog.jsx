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

const CreateSRWorkLog = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("workLog");
  const [workLogData, setWorkLogData] = useState([]);

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
                active={activeTab === "workLog"}
                onClick={() => setActiveTab("workLog")}
                className="py-3 px-4 fw-semibold border-0"
                style={{
                  backgroundColor:
                    activeTab === "workLog"
                      ? "var(--srExtend-navBar)"
                      : "transparent",
                  color: activeTab === "workLog" ? "white" : "var(--srExtend-navBar)",
                  borderBottom:
                    activeTab === "workLog" ? "2px solid var(--srExtend-navBar)" : "none",
                }}
              >
                Work Log
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === "communicationLog"}
                onClick={() => setActiveTab("communicationLog")}
                className="py-3 px-4 fw-semibold border-0"
                style={{
                  backgroundColor:
                    activeTab === "communicationLog"
                      ? "var(--srExtend-navBar)"
                      : "transparent",
                  color: activeTab === "communicationLog" ? "white" : "var(--srExtend-navBar)",
                  borderBottom:
                    activeTab === "communicationLog"
                      ? "2px solid var(--srExtend-navBar)"
                      : "none",
                }}
              >
                Communication Log
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body className="p-0">
          {/* Work Log Content */}
          {activeTab === "workLog" && (
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
                      <th className="px-3 py-2 border-end">Record</th>
                      <th className="px-3 py-2 border-end">Class</th>
                      <th className="px-3 py-2 border-end">Created By</th>
                      <th className="px-3 py-2 border-end">
                        Date <small className="text-muted">▼</small>
                      </th>
                      <th className="px-3 py-2 border-end">Type</th>
                      <th className="px-3 py-2 border-end">Summary</th>
                      <th className="px-3 py-2 text-center">Viewable?</th>
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
  {workLogData.length > 0 ? (
    workLogData.map((row, index) => (
      <tr key={index} className="border-top">
        <td className="px-3 py-2 border-end">
          <div className="d-flex align-items-center text-primary cursor-pointer">
            <ChevronRight size={16} className="me-1" />
            {row.record}
          </div>
        </td>
        <td className="px-3 py-2 border-end">{row.class}</td>
        <td className="px-3 py-2 border-end">{row.createdBy}</td>
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
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center py-4">
        <h6 className="m-0 text-muted">There are no rows to display</h6>
      </td>
    </tr>
  )}
</tbody>

                </Table>
              </div>

              {/* Footer */}
              <Card.Footer className="bg-white border-0 py-3">
                <div className="d-flex justify-content-end">
                  <Button className="new-fancy-row-btn" size="sm">
                    New Row
                  </Button>
                </div>
              </Card.Footer>
            </>
          )}

          {/* Communication Log Content */}
          {activeTab === "communicationLog" && (
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
                      <th className="px-3 py-2 border-end">
                        Originating application ID
                      </th>
                      <th className="px-3 py-2 border-end">Is Global Issue?</th>
                      <th className="px-3 py-2 border-end">Created By</th>
                      <th className="px-3 py-2 border-end">To</th>
                      <th className="px-3 py-2 border-end">
                        Date
                        {/* <small className="text-muted">▼</small> */}
                      </th>
                      <th className="px-3 py-2 border-end">Subject</th>
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
                      <td
                        colSpan="6"
                        className="text-center py-4 text-muted"
                      >
                        There are no rows to display
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* Footer */}
              <Card.Footer className="bg-white border-0 py-3">
                <div className="d-flex justify-content-end">
                  <Button className="new-fancy-row-btn" size="sm">
                    New Row
                  </Button>
                </div>
              </Card.Footer>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateSRWorkLog;

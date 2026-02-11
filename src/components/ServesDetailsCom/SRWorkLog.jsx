import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Container,
  Nav,
  Card,
  Button,
} from "react-bootstrap";
import TableHeader from "../Common/Table/TableHeader";
import staticData from "../../../Data/config.json";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

const filterKeys = [
  "Originating",
  "CreatedBy",
  "Date",
  "Subject",
];

export default function SRWorkLog() {
  const [activeTab, setActiveTab] = useState("workLog");
  const [workLogData, setWorkLogData] = useState([
    {
      record: "WO-371",
      createdBy: "HELPDESK1",
      date: "06/11/2022 12:04",
      summary: "في انتشار توفر الخدمات من قبل المورد",
    },
  ]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const rowsPerPage = 12;
  const [showFilters, setShowFilters] = useState(false);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleWorkLogCheckboxChange = (index) => {
    const newData = [...workLogData];
    newData[index].viewable = !newData[index].viewable;
    setWorkLogData(newData);
  };

  /* ================= Filtering ================= */
  const filteredData = useMemo(() => {
    return workLogData.filter((row) =>
      filterKeys.every((key) => {
        if (!filters[key]) return true;
        return row[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      })
    );
  }, [workLogData, filters]);

  return (
    <Container fluid className="p-0">


      {/* <Card className="shadow-sm">
        <Card.Header className="border-bottom  p-2 pt-0 ">
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
                  color:
                    activeTab === "workLog" ? "#fff" : "var(--srExtend-navBar)",
                  borderBottom:
                    activeTab === "workLog"
                      ? "2px solid #1976d2"
                      : "none",
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
                  color:
                    activeTab === "communicationLog"
                      ? "white"
                      : "var(--srExtend-navBar)",
                  borderBottom:
                    activeTab === "communicationLog"
                      ? "2px solid #1976d2"
                      : "none",
                }}
              >
                Communication Log
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        </Card> */}


        <Card>
        {/* Table Content */}
        <Card.Body className="p-0 m">
          <TableContainer component={Paper}>
            <Table stickyHeader sx={{
              overflow:"hidden"
            }}>
              {/* ===== Merged Header ===== */}
              <TableHeader
                ColorTable="var(--srTotal-header)"
                tableHeader={
                  activeTab === "workLog" ? "Work Logs" : "Communication Logs"
                }
                srDataTwo={filteredData}
                filters={filters}
                setFilters={setFilters}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                page={page}
                handleChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                filterKeys={filterKeys}
                titleSection={
                 staticData?.WorkLogs                }
              />

              {/* ===== Table Body ===== */}
              <TableBody>
                {activeTab === "workLog" && filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Box
                          display="flex"
                          alignItems="center"
                          color="primary.main"
                          sx={{ cursor: "pointer" }}
                        >
                          <ChevronRight size={16} className="me-1" />
                          {row.record}
                        </Box>
                      </TableCell>
                      <TableCell>{row.createdBy}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.summary}</TableCell>
                     
                    </TableRow>
                  ))
                ) : activeTab === "workLog" && filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      No rows to display.
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      There are no rows to display.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Card.Footer className="bg-white border-0 py-3">
          <div className="d-flex justify-content-end gap-3">
            <Button size="sm" className="new-fancy-row-btn">
              New Row
            </Button>
          </div>
        </Card.Footer>
        </Card.Body>

        {/* Footer */}
        
      </Card>
    </Container>
  );
}

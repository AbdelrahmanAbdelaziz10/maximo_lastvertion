import { useState } from "react";
import * as React from "react";
import { Container, Card, Table, Button } from "react-bootstrap";
import "../../Style/SRRelatedTickets.css";
import staticData from "../../../Data/config.json";
import TableHeader from "../Common/Table/TableHeader";
import { TableContainer, Table as MuiTable } from "@mui/material";


const filterKeys = [
    "ticketid",
    "description",
    "class",
    "status",
    "relationship"
  ];

  
const SRRelatedTickets = () => {
  const [page, setPage] = React.useState(0);
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({});

  const rowsPerPage = 12;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <Container fluid className="p-0 mb-5">
      <Card className="shadow-sm border-0 rounded-3 overflow-hidden">
        <Card.Body className="p-0" n>

          {/* ===== TABLE HEADER (FULL WIDTH) ===== */}
          <TableContainer  sx={{ width: "100%" }}>
            <MuiTable  stickyHeader sx={{ width: "100%" }}>
              <TableHeader
                ColorTable="var(--srTotal-header)"
                tableHeader="Related Tickets"
                srDataTwo={[]}
                filters={filters}
                setFilters={setFilters}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                page={page}
                handleChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                filterKeys={filterKeys}
                titleSection={staticData?.SRRelatedTicketsTable1}
              />
            </MuiTable>
          </TableContainer>

          {/* ===== BOOTSTRAP TABLE BODY ===== */}
          <div className="table-responsive">
            <Table hover className="mb-0">
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    There are no rows to display.
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

        </Card.Body>

        {/* ===== FOOTER ===== */}
        <Card.Footer className="bg-white border-0 py-3">
          <div className="d-flex justify-content-end gap-3">
            <Button
              variant="outline-primary"
              size="sm"
              className="custom-btn-outline"
            >
              Select Ticket
            </Button>

            <Button size="sm" className="new-fancy-row-btn">
              New Row
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SRRelatedTickets;

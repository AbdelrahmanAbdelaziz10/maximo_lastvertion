import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, Trash2 } from "lucide-react";
import {
  Container,
  Card,
} from "react-bootstrap";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
} from "@mui/material";
import TableHeader from "../Common/Table/TableHeader";
import staticData from "../../../Data/config.json";
import "../../Style/SRRelatedTickets.css";
import "../../Style/SpecificationsTable.css";

/* ================= Filter Keys ================= */
const filterKeys = [
  "recordkey",
  "description",
  // "class",
  "status",
  "relationship",
];

/* ================= Default Row ================= */
const DEFAULT_ROW = {
  recordkey: "WO-371",
  description:
    "مشكله في الستاره الضوئيه غرفه الاجتماعات جناح الوزير",
  class: "WORKORDER",
  status: "WMATL",
  relationship: "FOLLOWUP",
};

const SRRelatedWO = ({ relatedData }) => {
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const rowsPerPage = 12;

  const [workOrders, setWorkOrders] = useState([]);

  const totalColumns =
    staticData?.SRRelatedWorkOrder?.length || 6;

  /* ================= Sync Props Safely ================= */
  useEffect(() => {
    if (Array.isArray(relatedData) && relatedData.length) {
      setWorkOrders(relatedData);
    } else {
      setWorkOrders([DEFAULT_ROW]);
    }
  }, [relatedData]);

  /* ================= Pagination ================= */
  const handleChangePage = (_, newPage) => setPage(newPage);

  /* ================= Filtering ================= */
  const filteredData = useMemo(() => {
    return workOrders.filter((row) =>
      filterKeys.every((key) => {
        if (!filters[key]) return true;
        return row[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      }),
    );
  }, [workOrders, filters]);

  const currentRows = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredData, page]);

  /* ================= Actions ================= */
  const handleDeleteRow = (index) => {
    setWorkOrders((prev) =>
      prev.filter((_, i) => i !== index),
    );
  };

  return (
    <Container fluid className="p-0 mb-5">
      <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
        <Card.Body className="p-0">
          <TableContainer>
            <Table stickyHeader size="small"
            sx={{
              overflow:"hidden"
            }}
            >
              {/* ===== Header ===== */}
              <TableHeader
                ColorTable="var(--srTotal-header)"
                tableHeader="Related Work Orders"
                titleSection={staticData?.SRRelatedWorkOrder}
                srDataTwo={filteredData}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                filters={filters}
                setFilters={setFilters}
                filterKeys={filterKeys}
              />

              {/* ===== Body ===== */}
              <TableBody>
                {currentRows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={totalColumns}
                      align="center"
                      sx={{ py: 4, color: "text.secondary" }}
                    >
                      🚫 No related work orders
                    </TableCell>
                  </TableRow>
                ) : (
                  currentRows.map((row, index) => (
                    <TableRow
                      key={row.recordkey}
                      hover
                      sx={{
                        "& td": {
                          borderBottom:
                            "1px solid rgba(0,0,0,.08)",
                        },
                      }}
                    >
                      <TableCell>
                        <div className="d-flex align-items-start text-start fw-medium cursor-pointer">
                          <ChevronRight size={16} className="me-1" />
                          {row.recordkey}
                        </div>
                      </TableCell>

                      <TableCell>{row.description}</TableCell>
                      {/* <TableCell>{row.class}</TableCell> */}
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.relationship}</TableCell>

                      {/* <TableCell align="center">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            handleDeleteRow(index)
                          }
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card.Body>

        {/* ===== FOOTER ===== */}
        <Card.Footer className="bg-white border-0 py-3">
          <div className="d-flex justify-content-end gap-3">
            {/* <Button
              variant="outline-primary"
              size="sm"
              className="custom-btn-outline"
            >
              Select Ticket
            </Button> */}

            <Button size="sm" className="new-fancy-row-btn">
              New Row
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SRRelatedWO;

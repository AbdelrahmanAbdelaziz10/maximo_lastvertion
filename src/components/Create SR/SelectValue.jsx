import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward, Download } from "@mui/icons-material";
import "../../Style/SelectValue.css";
import { tableData } from "../../../Data/config.json";
import { Filter } from "lucide-react";

const SelectValue = ({ open, onClose, onSelectValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false); // يبدأ مخفي
  const [filters, setFilters] = useState({
    person: "",
    name: "",
    title: "",
    dept: "",
    location: "",
    site: "",
    org: "",
  });
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const itemsPerPage = 12;

  /* ========= FILTER ========= */
  const filteredData = tableData.filter((row) =>
    Object.keys(filters).every((key) =>
      String(row[key]).toLowerCase().includes(filters[key].toLowerCase())
    )
  );

  /* ========= PAGINATION ========= */
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const columns = [
    { key: "person", label: "Person" },
    { key: "name", label: "Name" },
    { key: "title", label: "Title" },
    { key: "dept", label: "Department" },
    { key: "location", label: "Location" },
    { key: "site", label: "Site" },
    { key: "org", label: "Organization" },
  ];

  /* ========= HANDLERS ========= */
  const handleRowClick = (row, index) => {
    setSelectedRowIndex(index);
  };

  const handleOk = () => {
    if (selectedRowIndex !== null) {
      onSelectValue?.(paginatedData[selectedRowIndex]);
    }
    onClose();
    setSelectedRowIndex(null);
  };

  const handleCancel = () => {
    onClose();
    setSelectedRowIndex(null);
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        // تجاهل أي نقر خارجية أو escape
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        onClose();
      }}
      disableEscapeKeyDown
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          width: "70vw",
          maxWidth: "70vw",
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      {/* ========= HEADER ========= */}
      <Box
        sx={{
          px: 2,
          py: 1.2,
          background: "linear-gradient(90deg,#0b5f77,#0f7a9c)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize="1rem" fontWeight={600}>
          Select Value
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            size="small"
            startIcon={<Filter size={20} />}
            onClick={() => setShowFilter((prev) => !prev)} // toggle عند كل ضغط
            sx={{
              color: "white",
              textTransform: "none",
              backgroundColor: "rgba(255,255,255,.2)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,.3)",
              },
            }}
          >
            Filter
          </Button>

          <IconButton
            size="small"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            sx={{ color: "white" }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>

          <Typography fontSize=".8rem" fontWeight={500}>
            {totalItems === 0 ? "0 – 0" : `${startIndex + 1} – ${endIndex}`} of{" "}
            {totalItems}
          </Typography>

          <IconButton
            size="small"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            sx={{ color: "white" }}
          >
            <ArrowForward fontSize="small" />
          </IconButton>

          <IconButton size="small" sx={{ color: "white" }}>
            <Download fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* ========= TABLE ========= */}
      <DialogContent sx={{ p: 0 }}>
        <Table stickyHeader>
          <TableHead>
            {/* ---------- Header Titles ---------- */}
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{ fontSize: ".8rem", fontWeight: 600 }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>

            {/* ---------- Filter Inputs تحت العناوين ---------- */}
            {showFilter && (
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.key} sx={{ p: 0.5 }}>
                    <input
                      type="text"
                      placeholder={`Search ${col.label}`}
                      value={filters[col.key]}
                      onChange={(e) => {
                        setFilters({ ...filters, [col.key]: e.target.value });
                        setCurrentPage(1);
                      }}
                      style={{
                        width: "100%",
                        padding: "4px 6px",
                        fontSize: "0.75rem",
                        borderRadius: "0px",
                        border:"0px",
                        borderBottom: "1px solid #ccc",
                        outline: "none",
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableHead>

          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={() => handleRowClick(row, index)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRowIndex === index ? "#cce4ff" : "transparent",
                    "&:hover": { backgroundColor: "#f1f8ff" },
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className="table-column">
                      {row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>

      {/* ========= FOOTER ========= */}
      <DialogActions
        sx={{
          px: 2,
          py: 1.5,
          borderTop: "1px solid #ddd",
          background: "#fafafa",
        }}
      >
        <Button variant="contained" onClick={handleOk}>
          OK
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectValue;

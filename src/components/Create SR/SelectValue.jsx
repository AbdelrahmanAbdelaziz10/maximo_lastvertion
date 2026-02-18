import React, { useState, useEffect } from "react";
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
import { Filter } from "lucide-react";
import "../../Style/SelectValue.css";

const SelectValue = ({
  open,
  onClose,
  onSelectValue,
  value = [],
  tabs = [],
  loading = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const itemsPerPage = 12;

  /* ===== Columns ===== */
  const columns =
    tabs?.map((tab) => ({
      key: tab.key,
      label: tab.label,
    })) || [];

  /* ===== Initialize Filters ===== */
  useEffect(() => {
    const newFilters = {};
    tabs?.forEach((t) => (newFilters[t.key] = ""));
    setFilters(newFilters);
    setCurrentPage(1);
  }, [tabs]);

  /* ===== Filtering ===== */
  const filteredData = (value || []).filter((row) =>
    Object.keys(filters).every((key) =>
      String(row?.[key] ?? "")
        .toLowerCase()
        .includes(filters[key]?.toLowerCase() || "")
    )
  );

  /* ===== Pagination ===== */
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const paginatedData = filteredData.slice(startIndex, endIndex);

  /* ===== Handlers ===== */
  const handleRowClick = (_, index) => {
    setSelectedRowIndex(index);
  };

const handleOk = () => {
  if (selectedRowIndex !== null) {
    const selectedRow = paginatedData[selectedRowIndex];

    // نرجع القيمة الأساسية بدل object كامل
    const firstKey = tabs[0]?.key; // أول tab هو المفتاح اللي هيتحط في input
    onSelectValue?.(selectedRow[firstKey]);
  }
  handleCancel();
};

  const handleCancel = () => {
    setSelectedRowIndex(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
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
      {/* ===== Header ===== */}
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
            startIcon={<Filter size={18} />}
            onClick={() => setShowFilter((prev) => !prev)}
            sx={{
              color: "white",
              textTransform: "none",
              backgroundColor: "rgba(255,255,255,.2)",
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

          <Typography fontSize=".8rem">
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

      {/* ===== Table ===== */}
      <DialogContent sx={{ p: 0 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>{col.label}</TableCell>
              ))}
            </TableRow>

            {showFilter && (
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.key} sx={{ p: 0.5 }}>
                    <input
                      type="text"
                      placeholder={`Search ${col.label}`}
                      value={filters[col.key] || ""}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          [col.key]: e.target.value,
                        });
                        setCurrentPage(1);
                      }}
                      style={{
                        width: "100%",
                        padding: "4px",
                        border: 0,
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
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
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>

      {/* ===== Footer ===== */}
      <DialogActions sx={{ px: 2, py: 1.5 }}>
        <Button className="new-fancy-row-btn" onClick={handleOk}>
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

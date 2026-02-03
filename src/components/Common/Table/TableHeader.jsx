import React from "react";
import {
  Box,
  Button,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Filter } from "lucide-react";
import { ArrowBack, ArrowForward, Download } from "@mui/icons-material";

const TableHeader = ({
  ColorTable,
  tableHeader,
  titleSection = [],
  srDataTwo = [],
  page,
  rowsPerPage,
  handleChangePage,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  filterKeys = [],
}) => {
  const totalColumns = titleSection.length;

  /* ================= Filtered Data ================= */
  const filteredData = React.useMemo(() => {
    return srDataTwo.filter((row) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return row[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      }),
    );
  }, [srDataTwo, filters]);

  const from = filteredData.length === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, filteredData.length);

  return (
    <TableHead className="Table-head">
      {/* ===== Title + Pagination + Filter ===== */}
      <TableRow>
        <TableCell
          colSpan={totalColumns}
          sx={{
            color: "white",
            fontWeight: "bold",
            background: ColorTable || "linear-gradient(90deg,#1565c0,#1e88e5)",
            p: 1,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* ===== Title ===== */}
            <span>{tableHeader}</span>

            <Box display="flex" alignItems="center" gap={1}>
              {/* ===== Filter Button ===== */}
              <Button
                onClick={() => setShowFilters((prev) => !prev)}
                startIcon={<Filter size={18} />}
                sx={{
                  color: "white",
                  fontSize: ".9rem",
                  height: 32,
                  textTransform: "none",
                  backgroundColor: "rgba(255,255,255,.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,.3)",
                  },
                }}
              >
                Filter
              </Button>

              {/* ===== Pagination Capsule ===== */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  px: 1.5,
                  py: 0.3,
                  borderRadius: "20px",
                  // backgroundColor: "rgba(255,255,255,.25)",
                }}
              >
                {/* Prev */}
                <Button
                  onClick={(e) => handleChangePage(e, page - 1)}
                  disabled={page === 0}
                  sx={{
                    minWidth: 32,
                    color: "white",
                    fontSize: "1.6rem", // 👈 كبر هنا
                    fontWeight: "bold", // 👈 اختياري
                    lineHeight: 1,
                    "&:disabled": { opacity: 0.4 },
                  }}
                >
                  <ArrowBack fontSize="small" />
                </Button>

                {/* Text */}
                <Box sx={{ fontSize: ".9rem", whiteSpace: "nowrap" }}>
                  {from} – {to} of {filteredData.length}
                </Box>

                {/* Next */}
                <Button
                  onClick={(e) => handleChangePage(e, page + 1)}
                  disabled={(page + 1) * rowsPerPage >= filteredData.length}
                  sx={{
                    minWidth: 32,
                    color: "white",
                    fontSize: "1.6rem", // 👈 كبر هنا
                    fontWeight: "bold",
                    lineHeight: 1,
                    "&:disabled": { opacity: 0.4 },
                  }}
                >
                  <ArrowForward fontSize="small" />
                </Button>
              </Box>
            </Box>
          </Box>
        </TableCell>
      </TableRow>

      {/* ===== Column Titles ===== */}
      <TableRow>
        {titleSection.map((title, index) => (
          <TableCell key={index} sx={{ fontSize: ".8rem", fontWeight: 600 }}>
            {title}
          </TableCell>
        ))}
      </TableRow>

      {/* ===== Filters Row ===== */}
      {showFilters && (
        <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
          {filterKeys.map((key) => (
            <TableCell key={key} sx={{ p: 0 }}>
              <TextField
                variant="standard"
                fullWidth
                placeholder="Search"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: ".75rem",
                    m: ".4rem",
                    px: 1,
                    py: 0.5,
                    borderBottom: "1px solid rgba(0,0,0,.2)",
                    "&:hover": {
                      borderBottom: "1px solid var(--srExtend-navBar2)",
                    },
                  },
                }}
              />
            </TableCell>
          ))}
        </TableRow>
      )}
    </TableHead>
  );
};

export default TableHeader;

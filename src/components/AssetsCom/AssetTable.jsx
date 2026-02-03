import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Box,
  Button,
  TableContainer,
  TextField,
} from "@mui/material";
import "../../Style/Tabledata.css";
import { Link } from "react-router-dom";
import StaticData from "../../../Data/config.json";
import FilterListIcon from "@mui/icons-material/FilterList";

const AssetTable = ({
  srDataTwo = [],
  ColorTable,
  loading,
  error,
  tableHeader,
  routePage,
}) => {
  const [page, setPage] = React.useState(0);
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({});

  const rowsPerPage = 12;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  /* ================= Filter Logic ================= */
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

  const currentRows = React.useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredData, page]);

  /* ================= Loading ================= */
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  /* ================= Error ================= */
  if (error) {
    return (
      <Box display="flex" justifyContent="center" p={4} color="error.main">
        Error loading data: {error.message || error}
      </Box>
    );
  }

  return (
    <Box className="Table-com">
      <Paper elevation={0}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              {/* ===== Title + Pagination + Filter ===== */}
              <TableRow
                className="Table-title"
                sx={{
                  background: ColorTable,
                }}
              >
                <TableCell
                  className="Table_Header"
                  colSpan={7}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    background:
                      ColorTable || "linear-gradient(90deg,#1565c0,#1e88e5)",
                  }}
                >
                  {tableHeader}
                </TableCell>

                <TableCell
                  colSpan={2}
                  sx={{
                    p: 0,
                    background:
                      ColorTable || "linear-gradient(90deg,#1565c0,#1e88e5)",
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="end">
                    {/* ===== Filter Button ===== */}
                    <Button
                      onClick={() => setShowFilters((prev) => !prev)}
                      startIcon={<FilterListIcon />}
                      sx={{
                        color: "white",
                        minWidth: 90,
                        height: 40,
                        mr: 1,
                        backgroundColor: "rgba(255,255,255,.2)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,.3)",
                        },
                      }}
                    >
                      Filter
                    </Button>

                    <TablePagination
                      component="div"
                      count={filteredData.length}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[]}
                      onPageChange={handleChangePage}
                      sx={{
                        color: "white",
                        marginTop: 0,
                        "& .MuiSvgIcon-root": { color: "white" },
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>

              {/* ===== Column Headers ===== */}
              <TableRow className="table-header">
                {StaticData?.AssetTable?.map((title, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontSize: ".8rem",
                      fontWeight: "600",
                    }}
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>

              {/* ===== Filter Inputs ===== */}
              {showFilters && (
                <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                  {[
                    "ticketid",
                    "description",
                    "exedept",
                    "worktype",
                    "reportedpriority",
                    "reportedby",
                    "status",
                    "reportdate",
                    "site",
                  ].map((colKey, index) => (
                    <TableCell key={colKey} sx={{ p: 0, m: 0 }}>
                      <TextField
                        variant="standard"
                        fullWidth
                        size="small"
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            [colKey]: e.target.value,
                          }))
                        }
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            width: "85%",
                            fontSize: "1rem",
                            fontWeight: 600,
                            padding: "0.5rem 0.2rem",
                            margin: " .4rem 0.5rem", // فواصل بين الأعمدة
                            borderBottom: "1px solid rgba(0,0,0,0.2)",
                            transition: "all 0.2s",
                            "&:hover": {
                              borderBottom: "1px solid var(--srExtend-navBar2)",
                              backgroundColor: "rgba(0,0,0,0.03)",
                            },
                            "&.Mui-focused": {
                              borderBottom: "2px solid var(--srExtend-navBar2)",
                            },
                          },
                        }}
                        inputProps={{
                          style: {
                            fontSize: "0.75rem",
                            padding: 0,
                            margin: 0,
                          },
                        }}
                        sx={{ m: 0, p: 0 }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableHead>

            {/* ================= Body ================= */}
            <TableBody>
              {currentRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    🚫 No Data Found
                  </TableCell>
                </TableRow>
              ) : (
                currentRows.map((item) => (
                  <TableRow key={item.ticketid} hover>
                    <TableCell className="table-column">
                      <Link
                        to={`/${routePage}/${item.ticketid}`}
                        style={{
                          textDecoration: "underline",
                          color: "var(--srExtend-navBar2)",
                          fontWeight: 500,
                        }}
                      >
                        {item.ticketid}
                      </Link>
                    </TableCell>

                    <TableCell className="table-column">
                      {item.description}
                    </TableCell>
                    <TableCell className="table-column">
                      {item.exedept}
                    </TableCell>
                    <TableCell className="table-column">
                      {item.worktype}
                    </TableCell>
                    <TableCell className="table-column">
                      {item.reportedpriority}
                    </TableCell>
                    <TableCell className="table-column">
                      {item.reportedby}
                    </TableCell>
                    <TableCell className="table-column">
                      {item.status}
                    </TableCell>
                    <TableCell className="table-column">
                      {item.reportdate}
                    </TableCell>
                    <TableCell className="table-column">
                      {item.reportdate}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default AssetTable;

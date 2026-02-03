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
import { Filter } from "lucide-react";
import TableHeader from "./Table/TableHeader";

  const filterKeys = [
    "ticketid",
    "description",
    "exedept",
    "worktype",
    "reportedpriority",
    "reportedby",
    "status",
    "reportdate",
  ];


const TableData = ({
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
           <TableHeader
    ColorTable={ColorTable}
    tableHeader={tableHeader}
    srDataTwo={srDataTwo}
    filters={filters}
    setFilters={setFilters}
    showFilters={showFilters}
    setShowFilters={setShowFilters}
    page={page}
    handleChangePage={handleChangePage}
    rowsPerPage={rowsPerPage}
    titleSection={StaticData?.SRTable}
    filterKeys={filterKeys}
  />

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
                  <TableRow
                    key={item.ticketid}
                    sx={{
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor: "#f5faff",
                        transform: "scale(1.001)",
                        overflow: "hidden",
                      },
                    }}
                  >
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
                      {item.exedept }
                    </TableCell>
                    <TableCell className="table-column">
                      {item.worktype }
                    </TableCell>
                    <TableCell className="table-column">
                      {item.reportedpriority }
                    </TableCell>
                    <TableCell className="table-column">
                      {item.reportedby }
                    </TableCell>
<TableCell className="table-column">
  <span
    className={`status-badge ${
      ["closed", "cancelled"].includes(item.status?.toLowerCase())
        ? "status-danger"
        : "status-normal"
    }`}
  >
    {item.status}
  </span>
</TableCell>
                    <TableCell className="table-column">
                      {item.reportdate
                        ? new Date(item.reportdate).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                          .replace(",", " ")
                        :null}
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

export default TableData;

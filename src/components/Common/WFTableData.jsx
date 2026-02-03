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
import { Link, useNavigate } from "react-router-dom";
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

const WFTableData = ({
  srDataTwo,
  ColorTable,
  loading,
  error,
  update,
  routePage,
  tableHeader,
}) => {
  const [page, setPage] = React.useState(0);
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({});

  const rowsPerPage = 10; // fixed to 10 rows per page
  // console.log("new Api:", srDataTwo);
  const navigate = useNavigate(); // ✅ hook for navigation

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

  // ✅ Always slice from tableData
  const currentRows = React.useMemo(() => {
    return srDataTwo.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [srDataTwo, page]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 4,
          color: "error.main",
        }}
      >
        Error loading data: {error.message || error}
      </Box>
    );
  }

  // console.log(currentRows);

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
              
            <TableBody>
              {srDataTwo.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    🚫 No Data Found
                  </TableCell>
                </TableRow>
              ) : (
                currentRows.map((item, index) => {
                  const sr = item?.sr?.[0]; // ✅ safe access
                  if (!sr) {
                    return null; // skip rows without sr data
                  }

                  return (
                    <TableRow
                      key={sr.ticketid || index}
                      hover
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
                          to={`/${routePage}/${sr.ticketid}`}
                          style={{
                            textDecoration: "underline",
                            color: "var(--srExtend-navBar2)",
                            fontWeight: 500,
                          }}
                        >
                          {sr.ticketid || "NULL"}
                        </Link>
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.description || "NULL"}
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.exedept || "NULL"}
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.worktype || "NULL"}
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.reportedpriority || "NULL"}
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.reportedby || "NULL"}
                      </TableCell>
                      <TableCell className="table-column">
                        <span
                          className={`status-badge ${
                            ["closed", "cancelled"].includes(sr.status?.toLowerCase())
                              ? "status-danger"
                              : "status-normal"
                          }`}
                        >
                          {sr.status}
                        </span>
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.reportdate
                          ? new Date(sr.reportdate)
                              .toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                              .replace(",", " :")
                          : "NULL"}
                      </TableCell>
                      {/*                    <TableCell className="table-column">
{sr.statusdate || "NULL"}</TableCell> */}
                      {/*                    <TableCell className="table-column">

                     <Button
                                   size="small"
                                   variant="outlined"
                                   sx={{
                                     borderRadius: "20px",
                                     textTransform: "none",
                                     fontWeight: "bold",
                                     px: 2,
                                     "&:hover": {
                                       backgroundColor: "#1565c0",
                                       color: "white",
                                     },
                                   }}
                                   onClick={() =>
                                     navigate(`/${update}/${sr.ticketid}`)
                                   } // ✅ navigate to details page
                                 >
                                   Update
                                 </Button>
                  </TableCell> */}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default WFTableData;

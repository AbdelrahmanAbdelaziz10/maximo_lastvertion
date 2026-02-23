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
import { useSRData } from "../Context/SRDataContext";
import { useGlobal } from "../Context/GlobalContext";

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
  ColorTable,
  loading,
  error,
  update,
  routePage,
  tableHeader,
}) => {
  const { value, setValue } = useGlobal();
  const [page, setPage] = React.useState(0);
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({});
  const { srData, tableTitle } = useSRData();
  const rowsPerPage = 10; // fixed to 10 rows per page
  // console.log("new Api:", srData);
  const navigate = useNavigate(); // ✅ hook for navigation

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  /* ================= Filter Logic ================= */
  const filteredData = React.useMemo(() => {
    return srData.filter((row) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return row[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      }),
    );
  }, [srData, filters]);

  // ✅ Always slice from tableData
  const currentRows = React.useMemo(() => {
    return srData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [srData, page]);

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
              tableHeader={tableTitle}
              srData={srData}
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
              {srData.length === 0 ? (
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
                      <TableCell
                        className="table-column"
                        onClick={() => {
                          setValue("view");
                          console.log("value:", value);
                        }}
                      >
                        <Link
                          to={`/${routePage}/${sr.ticketid}`}
                          // to={`/${routePage}/details`}
                          style={{
                            textDecoration: "underline",
                            color: "var(--srExtend-navBar2)",
                            fontWeight: 500,
                          }}
                        >
                          {sr.ticketid}
                        </Link>
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.description}
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.exedept}
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.worktype}
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.reportedpriority}
                      </TableCell>
                      <TableCell className="table-column">
                        {sr.reportedby}
                      </TableCell>
                      <TableCell className="table-column">
                        <span
                          className={`status-badge ${
                            ["closed", "cancelled"].includes(
                              sr.status?.toLowerCase(),
                            )
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
{sr.statusdate }</TableCell> */}
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

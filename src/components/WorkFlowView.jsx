import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function WorkFlowView({ open, onClose, item }) {
  // console.log(item)
  const [WorkFlowData,setWorkFlowData]=useState()
  const [error,setError]=useState()
  const [loading,setIsLoading]=useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          `http://192.168.0.73:9080/maxrest/oslc/os/MXAPIWFASSIGNMENT?lean=1&oslc.select=*&oslc.where=wfassignmentid=${item.wfassignmentid}&_lid=Helpdesk%201&_lpwd=Test1234`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setWorkFlowData(data || []);
        // console.log("data in work flow:",WorkFlowData)
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
        // console.log("data out work flow:",WorkFlowData)

  if (!item) return null; // nothing selected yet


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Workflow Details</DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography variant="body1">
            <strong>ID:</strong> {item.wfassignmentid}
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {item.assignstatus}
          </Typography>
          <Typography variant="body1">
            <strong>Owner:</strong> {item.owner || item.assigncode || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Priority:</strong> {item.instruction || "Normal"}
          </Typography>
          <Typography variant="body1">
            <strong>Start Date:</strong>{" "}
            {item.startdate
              ? new Date(item.startdate).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "—"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

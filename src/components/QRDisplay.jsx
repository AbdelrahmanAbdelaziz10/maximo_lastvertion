import React, { useState } from "react";
import QRCode from "react-qr-code";
import {
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function QRDisplay({ qrUrl }) {
  const [openToast, setOpenToast] = useState(false);

  if (!qrUrl) {
    return (
      <p style={{ textAlign: "center", marginTop: 20 }}>
        Generating QR...
      </p>
    );
  }

  const encodedUrl = encodeURIComponent(qrUrl);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=Service Request&body=${encodedUrl}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrUrl);
    setOpenToast(true);
  };

  return (
    <Box
      sx={{
        fontFamily: "sans-serif",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* QR */}
      <Box sx={{ background: "white", p: 2, mt: 2 }}>
        <QRCode value={qrUrl} size={256} level="M" />
      </Box>

      {/* URL */}
      <Box sx={{ mt: 2, color: "#555", direction: "ltr", fontSize: 14 }}>
        {qrUrl}
      </Box>

      {/* Share Buttons */}
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Tooltip title="Share via WhatsApp">
          <IconButton
            color="success"
            onClick={() => window.open(shareLinks.whatsapp, "_blank")}
          >
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share on Facebook">
          <IconButton
            color="primary"
            onClick={() => window.open(shareLinks.facebook, "_blank")}
          >
            <FacebookIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share via Email">
          <IconButton
            color="error"
            onClick={() => (window.location.href = shareLinks.email)}
          >
            <EmailIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Copy link">
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ✅ Toast */}
      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="success"
          variant="filled"
        >
          Link copied successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}

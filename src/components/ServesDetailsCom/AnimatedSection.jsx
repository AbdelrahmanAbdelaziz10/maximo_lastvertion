import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Card, Typography, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const AnimatedSection = ({ title, isOpen, onToggle, children }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
        mb: 3,
      }}
    >
      {/* ===== Header ===== */}
      <Box
        onClick={onToggle}
        sx={{
          backgroundColor: "var(--srExtend-navBar)",
          padding: "0.75rem 1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "none",
          color: "white",
          fontWeight: 600,
          fontSize: "1rem",
          "&:hover": {
            opacity:.8,
          },
        }}
      >
        <Typography
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 , fontWeight:600}}
        >
          {title}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <ArrowDropUpIcon sx={{ fontSize: 30 }} />
            ) : (
              <ArrowDropDownIcon sx={{ fontSize: 30 }} />
            )}
          </motion.div>
        </Typography>
      </Box>

      {/* ===== Animated Body ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={title}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Box sx={{ p: 3 }}>{children}</Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default AnimatedSection;

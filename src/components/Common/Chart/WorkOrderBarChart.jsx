import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Configuration constants
const CHART_DATA = [
  { status: "Open", count: 24 },
  { status: "In Progress", count: 15 },
  { status: "Pending", count: 8 },
  { status: "Completed", count: 32 },
  { status: "Cancelled", count: 5 },
  { status: "Pending", count: 8 },
  { status: "Completed", count: 32 },
];

const COLORS = {
  primary: "var(--primary-color)",
  axis: "#ccc",
  grid: "#f0f0f0",
  text: "#666",
  background: "#fff",
  shadow: "rgba(0, 0, 0, 0.1)",
};

const CHART_STYLES = {
  container: {
    width: "100%",
    height: "63vh",
    // backgroundColor: COLORS.background,
    borderRadius: "8px",
    // padding: '16px',
    // boxShadow: `0 2px 8px ${COLORS.shadow}`
  },
  bar: {
    radius: [4, 4, 0, 0], // top corners rounded now
    animationDuration: 1500,
  },
  // tooltip: {
  //   backgroundColor: COLORS.background,
  //   border: `1px solid #ddd`,
  //   borderRadius: '4px',
  //   boxShadow: `0 2px 4px ${COLORS.shadow}`
  // }
};

const WorkOrderBarChart = ({ height = "60vh" }) => {
  return (
    <div style={{ ...CHART_STYLES.container, height }}>
      <ResponsiveContainer>
        <BarChart
          data={CHART_DATA}
          margin={{ top: 10, right: 0, left: -25, bottom: 10 }}
          barSize={35}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />

          {/* Statuses on X axis */}
          <XAxis
            dataKey="status"
            type="category"
            tick={{ fontSize: "0.8rem", fontWeight: 600, fill: COLORS.text }}
            axisLine={{ stroke: COLORS.axis }}
          />

          {/* Numbers on Y axis */}
          <YAxis
            type="number"
            tick={{ fontSize: "0.75rem", fill: COLORS.text }}
            axisLine={{ stroke: COLORS.axis }}
          />

          <Tooltip
            contentStyle={CHART_STYLES.tooltip}
            formatter={(value) => [value, "Count"]}
            labelFormatter={(label) => `Status: ${label}`}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar
            dataKey="count"
            name="Work Orders"
            fill={COLORS.primary}
            radius={CHART_STYLES.bar.radius}
            animationDuration={CHART_STYLES.bar.animationDuration}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkOrderBarChart;

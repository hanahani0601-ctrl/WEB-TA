/* =========================================================
   Chart.js Global Configuration (Dark Theme)
   ========================================================= */

// Global font & color
Chart.defaults.font.family = "Segoe UI, system-ui, sans-serif";
Chart.defaults.color = "#e5e7eb";

// Disable animations for smoother auto-update
Chart.defaults.animation = false;

// Line chart defaults
Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.elements.line.tension = 0.4;
Chart.defaults.elements.point.radius = 3;
Chart.defaults.elements.point.hoverRadius = 5;

// Grid & axis styling
Chart.defaults.scales.linear.grid.color = "rgba(148, 163, 184, 0.15)";
Chart.defaults.scales.category.grid.color = "rgba(148, 163, 184, 0.15)";

Chart.defaults.scales.linear.ticks.color = "#94a3b8";
Chart.defaults.scales.category.ticks.color = "#94a3b8";

// Tooltip styling
Chart.defaults.plugins.tooltip.backgroundColor = "#020617";
Chart.defaults.plugins.tooltip.borderColor = "#38bdf8";
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.titleColor = "#e5e7eb";
Chart.defaults.plugins.tooltip.bodyColor = "#e5e7eb";
Chart.defaults.plugins.tooltip.cornerRadius = 10;
Chart.defaults.plugins.tooltip.padding = 10;

// Legend styling
Chart.defaults.plugins.legend.labels.color = "#e5e7eb";
Chart.defaults.plugins.legend.labels.boxWidth = 12;

// Helper function to create dataset
function createDataset(label, data) {
  return {
    label: label,
    data: data,
    fill: false,
    borderColor: "#38bdf8",
    backgroundColor: "rgba(56, 189, 248, 0.2)",
    pointBackgroundColor: "#38bdf8",
    pointBorderColor: "#38bdf8"
  };
}

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export function registerChartTheme() {
  ChartJS.defaults.color = "#e5e7eb";
  ChartJS.defaults.font.family = "Inter, system-ui, -apple-system, sans-serif";

  ChartJS.defaults.plugins.tooltip.backgroundColor = "rgba(15,23,42,0.96)";
  ChartJS.defaults.plugins.tooltip.borderColor = "#1f2937";
  ChartJS.defaults.plugins.tooltip.borderWidth = 1;

  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
  ChartJS.defaults.plugins.legend.labels.pointStyle = "circle";

  ChartJS.defaults.datasets.pie.borderWidth = 3;
  ChartJS.defaults.datasets.pie.borderColor = "#020617";

  ChartJS.defaults.datasets.bar.borderRadius = 12;
}

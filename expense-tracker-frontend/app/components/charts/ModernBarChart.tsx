"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale);

export default function ModernBarChart() {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            data: values,
            borderRadius: 12,
            borderSkipped: false,
            backgroundColor: (ctx) => {
              const chart = ctx.chart.ctx;
              const g = chart.createLinearGradient(0, 0, 0, 200);
              g.addColorStop(0, "rgba(59,130,246,1)");
              g.addColorStop(1, "rgba(59,130,246,0.2)");
              return g;
            },
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15,23,42,0.9)",
            padding: 12,
            cornerRadius: 12,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#94a3b8", font: { size: 12 } },
          },
          y: {
            grid: { display: false },
            ticks: { display: false },
            border: { display: false },
          },
        },
      }}
    />
  );
}

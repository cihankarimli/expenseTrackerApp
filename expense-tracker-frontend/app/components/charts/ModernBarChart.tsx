// ...existing code...
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

interface ModernBarChartProps {
  labels: string[];
  values: number[];
}

export default function ModernBarChart({ labels, values }: ModernBarChartProps) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            data: values,
            borderRadius: 12,
            borderSkipped: false,
            backgroundColor: (context: any) => {
              // context.chart.ctx is the CanvasRenderingContext2D
              const ctx = context.chart.ctx as CanvasRenderingContext2D;
              const g = ctx.createLinearGradient(0, 0, 0, 200);
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
// ...existing code...
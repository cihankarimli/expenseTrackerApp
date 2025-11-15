"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useRef, useState } from "react";

ChartJS.register(ArcElement, Tooltip);

export default function ModernPieChart({
  labels,
  values,
  icons,
  defaultText = "Stats",
}) {
  const chartRef = useRef<any>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [hoverIcon, setHoverIcon] = useState<string | null>(null);

  const plugins = [
    {
      id: "centerText",
      afterDraw: (chart) => {
        const { ctx, width, height } = chart;

        ctx.save();
        ctx.textAlign = "center";

        // Icon
        ctx.font = "28px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText(hoverIcon || "", width / 2, height / 2 - 6);

        // Label
        ctx.font = "600 14px Inter";
        ctx.fillStyle = "#cbd5e1";
        ctx.fillText(hoverLabel || defaultText, width / 2, height / 2 + 22);

        ctx.restore();
      },
    },
  ];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderWidth: 0,
        spacing: 4,
        hoverOffset: 14,
        backgroundColor: ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
      },
    ],
  };

  const options = {
    cutout: "68%",
    plugins: { legend: { display: false } },
    onHover: (e, activeEls) => {
      if (activeEls.length > 0) {
        const index = activeEls[0].index;
        setHoverLabel(labels[index]);
        setHoverIcon(icons[index]);
      } else {
        setHoverLabel(null);
        setHoverIcon(null);
      }
    },
  };

  return (
    <Doughnut ref={chartRef} data={data} options={options} plugins={plugins} />
  );
}

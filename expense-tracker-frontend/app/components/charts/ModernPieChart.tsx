// ...existing code...
"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useRef, useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip);

interface ModernPieChartProps {
  labels: string[];
  values: number[];
  icons?: string[]; 
  defaultText?: string;
}

export default function ModernPieChart({
  labels,
  values,
  icons = [],
  defaultText = "Stats",
}: ModernPieChartProps) {
  const chartRef = useRef<any>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [hoverIcon, setHoverIcon] = useState<string | null>(null);

  // When hover state changes, force chart to re-draw so afterDraw plugin uses new state
  useEffect(() => {
    if (chartRef.current && typeof chartRef.current.update === "function") {
      chartRef.current.update();
    }
  }, [hoverLabel, hoverIcon]);

  const plugins = [
    {
      id: "centerText",
      afterDraw: (chart: any) => {
        const ctx = chart.ctx as CanvasRenderingContext2D;
        const width = chart.width;
        const height = chart.height;

        ctx.save();
        ctx.textAlign = "center";

        // Icon
        ctx.font = "28px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText(hoverIcon || "", width / 2, height / 2 - 6);

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

  const options: any = {
    cutout: "68%",
    plugins: { legend: { display: false } },
    onHover: (e: any, activeEls: any[]) => {
      if (activeEls && activeEls.length > 0) {
        const index = activeEls[0].index;
        setHoverLabel(labels[index] ?? null);
        setHoverIcon(icons?.[index] ?? null);
      } else {
        setHoverLabel(null);
        setHoverIcon(null);
      }
    },
  };

  return (
    <div className="relative">
      <Doughnut ref={chartRef} data={data} options={options} plugins={plugins} />
      {/* Center overlay (HTML) — göstərmək üçün həm hover, həm default */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl leading-none text-white">{hoverIcon ?? ""}</div>
        <div className="mt-2 text-sm font-semibold text-slate-300">
          {hoverLabel ?? defaultText}
        </div>
      </div>
    </div>
  );
}
// ...existing code...
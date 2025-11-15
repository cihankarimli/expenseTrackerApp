"use client";

import { useState } from "react";
import ModernPieChart from "./charts/ModernPieChart";
import ModernBarChart from "./charts/ModernBarChart";
import { profitIcons } from "../utils/profitIcons";


interface ProfitChartsProps {
  profits: { category: string; amount: number }[];
}
export default function ProfitCharts({ profits }): ProfitChartsProps {
  const [type, setType] = useState("pie");

  const labels = [...new Set(profits.map((p) => p.category))];
  const values = labels.map((cat) =>
    profits.filter((p) => p.category === cat).reduce((s, p) => s + p.amount, 0)
  );
  const icons = labels.map((cat) => profitIcons[cat] || "💰");

  return (
    <div>
      <div className="flex justify-end mb-3">
        <select
          className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-xs text-gray-300"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="pie">Modern Pie</option>
          <option value="bar">Modern Bar</option>
        </select>
      </div>

      {type === "pie" ? (
        <ModernPieChart labels={labels} values={values} icons={icons} defaultText="Income" />
      ) : (
        <ModernBarChart labels={labels} values={values} />
      )}
    </div>
  );
}

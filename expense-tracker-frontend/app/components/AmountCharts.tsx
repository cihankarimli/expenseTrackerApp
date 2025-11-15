"use client";

import { useState } from "react";
import ModernPieChart from "./charts/ModernPieChart";
import ModernBarChart from "./charts/ModernBarChart";
import { categoryIcons } from "../utils/CategoryIcons";
interface AmountChartsProps {
  amounts: { category: string; amount: number }[];
}

export default function AmountCharts({ amounts }): AmountChartsProps {
  const [type, setType] = useState("pie");

  const labels = [...new Set(amounts.map((a) => a.category))];
  const values = labels.map((cat) =>
    amounts.filter((a) => a.category === cat).reduce((s, a) => s + a.amount, 0)
  );
  const icons = labels.map((cat) => categoryIcons[cat] || "❓");

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
        <ModernPieChart labels={labels} values={values} icons={icons} defaultText="Expenses" />
      ) : (
        <ModernBarChart labels={labels} values={values} />
      )}
    </div>
  );
}

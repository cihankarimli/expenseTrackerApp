"use client";

import { useState } from "react";
import ModernPieChart from "./charts/ModernPieChart";
import ModernBarChart from "./charts/ModernBarChart";

interface DashboardChartsProps {
  totalIncome: number;
  totalExpenses: number;
}

export default function DashboardCharts({ totalIncome, totalExpenses }: DashboardChartsProps) {
  const [type, setType] = useState("pie");

  const labels = ["Expenses", "Income"];
  const values = [totalExpenses, totalIncome];


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
        <ModernPieChart labels={labels} values={values} />
      ) : (
        <ModernBarChart labels={labels} values={values} />
      )}
    </div>
  );
}
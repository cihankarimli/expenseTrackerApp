"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/auth";
import PageFade from "../components/PageFade";
import Card from "../components/Card";
import DashboardCharts from "../components/DashboardCharts";
import DateRangePicker from "../components/DateRangePicker";
import { registerChartTheme } from "../utils/chartTheme";

registerChartTheme();

export default function DashboardPage() {
  const [amounts, setAmounts] = useState<any[]>([]);
  const [profits, setProfits] = useState<any[]>([]);
  const [userId, setUserId] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async () => {
    const userData = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/me`
    );
    setUserId(userData.user.id);

    const a = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/amounts/users/${userData.user.id}/amounts`
    );
    const p = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/profits`);

    setAmounts(a);
    setProfits(p);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterByDate = (arr: any[]) =>
    arr.filter((i) => {
      const d = new Date(i.date);
      return d >= startDate && d <= endDate;
    });

  const fA = filterByDate(amounts);
  const fP = filterByDate(profits);

  const totalExpenses = fA
    .filter((i) => i.type === "expense")
    .reduce((s, i) => s + i.amount, 0);

  const totalIncome = fP.reduce((s, i) => s + i.amount, 0);

  const benefit = (totalIncome - totalExpenses).toFixed(2);

  return (
    <PageFade>
      <div className="max-w-6xl mx-auto p-6">
        <Card className="mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>

          <p className="text-sm text-gray-400 mt-1">
            {startDate.toDateString()} — {endDate.toDateString()}
          </p>

          <p
            className={`mt-2 font-bold text-lg ${
              benefit >= "0" ? "text-green-400" : "text-red-400"
            }`}
          >
            Net Benefit: {benefit}₼
          </p>
        </Card>

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={(s, e) => {
            setStartDate(s);
            setEndDate(e);
          }}
        />

        <Card className="mt-6">
          <DashboardCharts
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />

          <div className="mt-6 flex flex-col md:flex-row justify-between text-gray-300">
            <span>
              Total Expenses:{" "}
              <strong className="text-red-400">{totalExpenses}₼</strong>
            </span>

            <span>
              Total Income:{" "}
              <strong className="text-green-400">{totalIncome}₼</strong>
            </span>
          </div>
        </Card>
      </div>
    </PageFade>
  );
}

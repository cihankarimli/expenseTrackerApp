"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "./utils/auth";
import PageFade from "./components/PageFade";
import Card from "./components/Card";
import DashboardCharts from "./components/DashboardCharts";
import DateRangePicker from "./components/DateRangePicker";
import { registerChartTheme } from "./utils/chartTheme";

registerChartTheme();

export default function DashboardPage() {
  const [amounts, setAmounts] = useState([]);
  const [profits, setProfits] = useState([]);
  const [userId, setUserId] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async () => {
    const userData = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/me`
    );

    setUserId(userData.user.id);

    const amountsData = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/amounts/users/${userData.user.id}/amounts`
    );
    const profitsData = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/profits`
    );

    setAmounts(amountsData);
    setProfits(profitsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterByDate = (data: any[]) =>
    data.filter((item) => {
      const d = new Date(item.date);
      return d >= startDate && d <= endDate;
    });

  const filteredAmounts = filterByDate(amounts);
  const filteredProfits = filterByDate(profits);

  const totalExpenses = filteredAmounts
    .filter((a) => a.type === "expense")
    .reduce((s, a) => s + a.amount, 0);

  const totalIncome = filteredProfits.reduce((s, p) => s + p.amount, 0);

  return (
    <PageFade>
      <div className="max-w-6xl mx-auto p-6">
        <Card className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-gray-400 text-sm">
            {startDate.toDateString()} — {endDate.toDateString()}
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

        <Card>
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

"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/auth";
import PageFade from "../../components/PageFade";
import Card from "../../components/Card";
import DateRangePicker from "../../components/DateRangePicker";
import ProfitForm from "../../components/ProfitForm";
import ProfitList from "../../components/ProfitList";
import ProfitCharts from "../../components/ProfitCharts";
import { registerChartTheme } from "../../utils/chartTheme";

registerChartTheme();

export default function ProfitsPage() {
  const [profits, setProfits] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const fetchProfits = async () => {
    try {
      await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
      const data = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/profits`
      );
      setProfits(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfits();
  }, []);

  const filterByDate = (arr: any[]) =>
    arr.filter((item) => {
      const d = new Date(item.date);
      return d >= startDate && d <= endDate;
    });

  const filtered = filterByDate(profits);
  const totalIncome = filtered.reduce((s, p) => s + p.amount, 0);

  return (
    <PageFade>
      <div className="max-w-6xl mx-auto p-6">
        <Card className="mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Profits</h1>
              <p className="text-gray-400 text-sm mt-1">
                Manage and visualize your income sources.
              </p>
            </div>

            <div className="text-right">
              <p className="text-[11px] uppercase text-gray-500 tracking-wide">
                Total Income
              </p>
              <p className="text-3xl font-semibold text-emerald-400">
                {totalIncome}₼
              </p>
            </div>
          </div>

          <div className="mt-4">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChange={(s, e) => {
                setStartDate(s);
                setEndDate(e);
              }}
            />
          </div>
        </Card>

        {loading ? (
          <Card>
            <div className="animate-pulse text-gray-400">Loading profits…</div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <ProfitForm onAdded={fetchProfits} />
              <ProfitList profits={filtered} onDeleted={fetchProfits} />
            </Card>

            <Card>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-100">
                    Category Stats
                  </h2>
                  <p className="text-xs text-gray-400">
                    Income distribution by category.
                  </p>
                </div>

                <p className="text-sm text-gray-300">
                  Total:{" "}
                  <span className="font-semibold text-emerald-400">
                    {totalIncome}₼
                  </span>
                </p>
              </div>

              <ProfitCharts profits={filtered} />
            </Card>
          </div>
        )}
      </div>
    </PageFade>
  );
}

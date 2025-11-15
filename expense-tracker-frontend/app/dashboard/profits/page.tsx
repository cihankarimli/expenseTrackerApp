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
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
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

  const filterByDate = (data: any[]) =>
    data.filter((item) => {
      const d = new Date(item.date);
      return d >= startDate && d <= endDate;
    });

  const filteredProfits = filterByDate(profits);
  const totalIncome = filteredProfits.reduce((sum, p) => sum + p.amount, 0);

  return (
    <PageFade>
      <div className="max-w-6xl mx-auto p-6">
        <Card className="mb-6">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div>
              <h1
                className="font-bold text-white"
                style={{ fontSize: "clamp(1.35rem, 2.7vw, 1.75rem)" }}
              >
                Profits
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Manage and visualize your income sources.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase text-gray-400 tracking-wide">
                Total Income (Filtered)
              </p>
              <p className="text-2xl font-semibold text-emerald-400">
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
            <div className="animate-pulse text-gray-400 text-sm">
              Loading profits...
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <ProfitForm onAdded={fetchProfits} />
              <ProfitList profits={filteredProfits} onDeleted={fetchProfits} />
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-100">
                    Category Stats
                  </h2>
                  <p className="text-xs text-gray-400">
                    Income distribution by category.
                  </p>
                </div>
                <div className="text-right text-sm text-gray-300">
                  <p>
                    Total:{" "}
                    <span className="font-semibold text-emerald-400">
                      {totalIncome}₼
                    </span>
                  </p>
                </div>
              </div>

              <ProfitCharts profits={filteredProfits} />
            </Card>
          </div>
        )}
      </div>
    </PageFade>
  );
}

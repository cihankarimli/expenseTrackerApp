"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchWithAuth } from "../../utils/auth";
import PageFade from "../../components/PageFade";
import Card from "../../components/Card";
import DateRangePicker from "../../components/DateRangePicker";
import AmountForm from "../../components/AmountForm";
import AmountList from "../../components/AmountList";
import AmountCharts from "../../components/AmountCharts";
import { registerChartTheme } from "../../utils/chartTheme";

registerChartTheme();

export default function AmountsPage() {
  const [amounts, setAmounts] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  const fetchAmounts = async () => {
    try {
      const userData = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`
      );
      setUserId(userData.user.id);

      const data = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/amounts/users/${userData.user.id}/amounts`
      );
      setAmounts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmounts();
  }, []);

  const filterByDate = (data: any[]) =>
    data.filter((item) => {
      const d = new Date(item.date);
      return d >= startDate && d <= endDate;
    });

  const filteredAmounts = filterByDate(amounts);
  const totalExpenses = filteredAmounts
    .filter((a) => a.type === "expense")
    .reduce((sum, a) => sum + a.amount, 0);

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
                Expenses
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Track and analyze your spendings by category and time range.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase text-gray-400 tracking-wide">
                Total Expenses (Filtered)
              </p>
              <p className="text-2xl font-semibold text-red-400">
                {totalExpenses}₼
              </p>
            </div>
          </div>

          <div className="mt-4 position-relative ">
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
              Loading expenses...
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Form + List */}
            <Card>
              <AmountForm userId={userId} onAdded={fetchAmounts} />
              <AmountList amounts={filteredAmounts} onDeleted={fetchAmounts} />
            </Card>

            {/* Right: Stats + Chart */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-100">
                    Category Stats
                  </h2>
                  <p className="text-xs text-gray-400">
                    Visual breakdown of your spending.
                  </p>
                </div>
                <div className="text-right text-sm text-gray-300">
                  <p>
                    Total:{" "}
                    <span className="font-semibold text-red-400">
                      {totalExpenses}₼
                    </span>
                  </p>
                </div>
              </div>

              <AmountCharts amounts={filteredAmounts} />
            </Card>
          </div>
        )}
      </div>
    </PageFade>
  );
}

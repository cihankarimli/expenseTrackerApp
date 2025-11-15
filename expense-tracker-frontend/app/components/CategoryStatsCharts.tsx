// "use client";
// import { useEffect, useState } from "react";
// import { fetchWithAuth } from "../utils/auth";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// type Props = {
//   userId: string;
// };

// export default function CategoryStatsChart({ userId }: Props) {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [totals, setTotals] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchWithAuth(
//           `${process.env.NEXT_PUBLIC_API_URL}/amounts/users/${userId}/stats/category?startDate=&endDate=`
//         );
//         setCategories(data.map((d: any) => d.category));
//         setTotals(data.map((d: any) => d.total));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, [userId]);

//   const chartData = {
//     labels: categories,
//     datasets: [
//       {
//         label: "Total per Category",
//         data: totals,
//         backgroundColor: "rgba(54, 162, 235, 0.5)",
//       },
//     ],
//   };

//   return <Bar data={chartData} />;
// }

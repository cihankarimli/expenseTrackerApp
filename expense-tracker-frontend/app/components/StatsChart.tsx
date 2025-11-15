// "use client";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// type Props = {
//   amounts: { category: string; amount: number; type: string }[];
//   profits: { category: string; amount: number }[];
// };

// export default function StatsChart({ amounts, profits }: Props) {
//   const categories = [...new Set(amounts.map((a) => a.category))];
//   const data = {
//     labels: categories,
//     datasets: [
//       {
//         label: "Expenses",
//         data: categories.map((c) =>
//           amounts
//             .filter((a) => a.category === c && a.type === "expense")
//             .reduce((sum, a) => sum + a.amount, 0)
//         ),
//         backgroundColor: "rgba(255,99,132,0.5)",
//       },
//       {
//         label: "Income",
//         data: categories.map((c) =>
//           amounts
//             .filter((a) => a.category === c && a.type === "income")
//             .reduce((sum, a) => sum + a.amount, 0)
//         ),
//         backgroundColor: "rgba(75,192,192,0.5)",
//       },
//     ],
//   };

//   return <Bar data={data} />;
// }

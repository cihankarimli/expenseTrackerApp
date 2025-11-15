import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and profits",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

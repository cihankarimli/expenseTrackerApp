require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🔧 Environment variables check:");
console.log(
  "MONGODB_URI:",
  process.env.MONGODB_URI ? "✅ Mövcud" : "❌ Yoxdur"
);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Mövcud" : "❌ Yoxdur");
console.log("PORT:", process.env.PORT || "Default: 5000");

// ✅ CORS - Vercel URL əlavə edin
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://expense-tracker-app-mwwh.vercel.app", // ← Vercel URL buraya
      "https://*.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("📦 Request body:", req.body);
  }
  next();
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dynamex_db")
  .then(() => {
    console.log("✅ MongoDB-yə bağlantı uğurlu!");
    console.log("📊 Database:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("❌ MongoDB bağlantı xətası:", error.message);
  });

const authRoutes = require("./routes/user");
const amountRoutes = require("./routes/amountRoutes");
const profitRoutes = require("./routes/profitRoutes");

app.use("/auth", authRoutes);
app.use("/amounts", amountRoutes);
app.use("/profits", profitRoutes);
app.use("/users", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API",
    version: "1.0.0",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.use("*", (req, res) => {
  console.log("❌ 404 - Route tapılmadı:", req.originalUrl);
  res.status(404).json({
    success: false,
    message: "Endpoint tapılmadı",
    path: req.originalUrl,
  });
});

app.use((error, req, res, next) => {
  console.error("❌ Server xətası:", error);
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development" ? error.message : "Server xətası",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda işləyir`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});

module.exports = app;

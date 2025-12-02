const mongoose = require("mongoose");

const amountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "food",
        "transport",
        "utilities",
        "entertainment",
        "shopping",
        "health",
        "other",
      ],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    method: {
      type: String,
      trim: true,
      enum: ["cash", "credit card", "debit card", "online payment", "other"],
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    type: {
      type: String,
      enum: ["expense", "income"],
      default: "expense",
    },
  },
  {
    timestamps: true,
    indexes: [
      { date: 1, user: 1 },
      { category: 1, user: 1 },
    ],
  }
);

module.exports = mongoose.model("Amount", amountSchema);

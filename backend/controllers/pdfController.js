const incomes = await Income.find({
  user: userId,
  date: { $gte: startDate, $lte: endDate },
});

const expenses = await Expense.find({
  user: userId,
  date: { $gte: startDate, $lte: endDate },
});

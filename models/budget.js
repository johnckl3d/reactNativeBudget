class Budget {
  constructor(
    budgetId,
    name,
    description,
    totalBudgetAmount,
    totalCostAmount,
    costSnapShots,
    costCategories,
    incomeCategories
  ) {
    this.budgetId = budgetId;
    this.name = name;
    this.description = description;
    this.totalBudgetAmount = totalBudgetAmount;
    this.totalCostAmount = totalCostAmount;
    this.costSnapShots = costSnapShots;
    this.costCategories = costCategories;
    this.incomeCategories = incomeCategories;
  }
}

export default Budget;

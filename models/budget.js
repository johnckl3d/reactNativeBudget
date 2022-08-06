class Budget {
    constructor(budgetId, name, description, totalBudgetAmount, totalCostAmount, costSnapShots, costCategories) {
      this.budgetId = budgetId;
      this.name = name;
      this.description = description;
      this.totalBudgetAmount = totalBudgetAmount;
      this.totalCostAmount = totalCostAmount;
      this.costSnapShots = costSnapShots;
      this.costCategories = costCategories;
    }
  }
  
  export default Budget;
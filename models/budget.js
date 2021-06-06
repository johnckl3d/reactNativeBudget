class Budget {
    constructor(budgetId, name, description, totalBudgetAmount, totalCostAmount, costSnapShots) {
      this.budgetId = budgetId;
      this.name = name;
      this.description = description;
      this.totalBudgetAmount = totalBudgetAmount;
      this.totalCostAmount = totalCostAmount;
      this.costSnapShots = costSnapShots;
    }
  }
  
  export default Budget;
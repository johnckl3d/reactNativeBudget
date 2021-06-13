class CostCategory {
    constructor(budgetId, costCategoryId, name, totalAmount, costItems) {
      this.budgetId = budgetId;
      this.costCategoryId = costCategoryId;
      this.name = name;
      this.totalAmount = totalAmount;
      this.costItems = costItems;
    }
  }
  
  export default CostCategory;
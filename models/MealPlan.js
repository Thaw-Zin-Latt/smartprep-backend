const db = require('../config/db');

class MealPlan {
  static async schedule(userId, recipeId, date, mealType) {
    const [result] = await db.query(
      'INSERT INTO MealPlans (user_id, recipe_id, plan_date, meal_type) VALUES (?, ?, ?, ?)',
      [userId, recipeId, date, mealType]
    );
    return result.insertId;
  }

  static async getByDateRange(userId, startDate, endDate) {
    const [rows] = await db.query(
      'SELECT mp.*, r.title FROM MealPlans mp JOIN Recipes r ON mp.recipe_id = r.id WHERE mp.user_id = ? AND mp.plan_date BETWEEN ? AND ?',
      [userId, startDate, endDate]
    );
    return rows;
  }
}

module.exports = MealPlan;
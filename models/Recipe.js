const db = require('../config/db');

class Recipe {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Recipes');
    return rows;
  }

  static async getById(id) {
    const [recipe] = await db.query('SELECT * FROM Recipes WHERE id = ?', [id]);
    const [ingredients] = await db.query('SELECT * FROM Ingredients WHERE recipe_id = ?', [id]);
    return { ...recipe[0], ingredients };
  }

  static async create(data) {
    const [result] = await db.query(
      'INSERT INTO Recipes (title, baseServings, instructions) VALUES (?, ?, ?)',
      [data.title, data.baseServings, data.instructions]
    );
    return result.insertId;
  }
}

module.exports = Recipe;
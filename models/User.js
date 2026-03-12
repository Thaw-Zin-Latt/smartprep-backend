const db = require('../config/db');

class User {
  static async create(email, password) {
    const [result] = await db.query(
      'INSERT INTO Users (email, password) VALUES (?, ?)',
      [email, password]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
  }

  static async updatePreferences(userId, prefs) {
    return db.query(
      'UPDATE Users SET preferences = ? WHERE id = ?',
      [JSON.stringify(prefs), userId]
    );
  }
}

module.exports = User;
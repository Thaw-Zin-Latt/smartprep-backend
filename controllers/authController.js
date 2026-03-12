const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = await User.create(email, password);
    res.status(201).json({ message: 'User created', userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const { preferences } = req.body;
    await User.updatePreferences(userId, preferences);
    res.json({ message: 'Preferences saved to database' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
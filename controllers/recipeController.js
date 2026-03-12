const Recipe = require('../models/Recipe');
const MealPlan = require('../models/MealPlan');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAll();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecipeDetails = async (req, res) => {
  try {
    const recipe = await Recipe.getById(req.params.id);
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Implements SD04: Schedule Meal Plan
exports.scheduleMeal = async (req, res) => {
  try {
    const { recipeId, date, mealType } = req.body;
    const userId = req.user.id; // From auth middleware
    const planId = await MealPlan.schedule(userId, recipeId, date, mealType);
    res.status(201).json({ message: 'Meal scheduled', planId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
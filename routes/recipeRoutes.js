const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeDetails);
router.post('/schedule', auth, recipeController.scheduleMeal);

module.exports = router;
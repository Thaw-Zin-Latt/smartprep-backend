const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

// DELETE 
app.delete('/api/recipes/schedule/:id', (req, res) => {
  res.status(200).json({ message: 'Meal deleted successfully' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`SmartPrep API running on port ${PORT}`));
const express = require('express');
const app = express.Router();
const path = require('path');



const recipes = require('../../../data/recipes.json');


app.get('/', (_, response) => {
  const RECIPES = recipes.map(({ id, title, image, prepTime, difficulty }) => ({
    id, title, image, prepTime, difficulty,
  }));
  response.json(RECIPES);
});

app.post('/recipe/add', (request, response) => {
  const newRecipe = request.body;
  newRecipe.id = recipes.length + 1;
  recipes.push(newRecipe);
  response.json(newRecipe);
});


app.get('/recipe/:id', (request, response) => {
  const id = parseInt(request.params.id);

  const recipeResult = recipes.find((recipe) => recipe.id === id);

  if (recipeResult) {
    response.json(recipeResult);
  } else {
    response.status(404).json({ error: 'Recipe not found' });
  }
});

module.exports = app;
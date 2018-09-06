const getIds = () => new Promise(resolve => {
  setTimeout(() => {
    resolve([523, 883, 432, 974]);
  }, 1500);
});

const getRecipe = recipeID =>
  new Promise(resolve =>
    setTimeout(
      id => resolve({ title: 'Fresh tomato pasta', publisher: 'Joan', id }),
      1500,
      recipeID
    )
  );

const getRelated = publisher => {
  return new Promise(resolve => {
    setTimeout(
      pub => resolve({ title: 'Italian Pizza', publisher: pub })
      , 1500, publisher
    );
  });
};

getIds()
  .then(ids => ids[2])
  .then(getRecipe)
  .then(recipe => {
    console.log(recipe);
    return recipe.publisher;
  })
  .then(getRelated)
  .then(console.log);
const getRecipe = () => {
  setTimeout(() => {
    const recipeId = [523, 883, 432, 974];
    console.log(recipeId);
    setTimeout((id) => {
      const recipe = {
        title: 'Fresh tomato pasta',
        publisher: 'Jonas',
        id
      };
      console.log(recipe);
    }, 1000, recipeId[2]);
  }, 1500);
};

getRecipe();
const getRecipe = () => {
  setTimeout(() => {
    const recipeId = [523, 883, 432, 974];
    console.log(recipeId);

    setTimeout(id => {
      const recipe = {
        title: 'Fresh tomato pasta',
        publisher: 'Jonas',
        id
      };
      console.log(recipe);

      setTimeout(publisher => {
        const recipe2 = {
          title: 'Italian Pizza',
          publisher
        };
        console.log(recipe2);
      }, 1500, recipe.publisher);
    }, 1500, recipeId[2]);
  }, 1500);
};

getRecipe();
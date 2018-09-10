// const getIds = () => new Promise(resolve => {
//   setTimeout(() => {
//     resolve([523, 883, 432, 974]);
//   }, 1500);
// });

// const getRecipe = recipeID =>
//   new Promise(resolve =>
//     setTimeout(
//       id => resolve({ title: 'Fresh tomato pasta', publisher: 'Joan', id }),
//       1500,
//       recipeID
//     )
//   );

// const getRelated = publisher => {
//   return new Promise(resolve => {
//     setTimeout(
//       pub => resolve({ title: 'Italian Pizza', publisher: pub })
//       , 1500, publisher
//     );
//   });
// };

// // getIds()
// //   .then(ids => ids[2])
// //   .then(getRecipe)
// //   .then(recipe => {
// //     console.log(recipe);
// //     return recipe.publisher;
// //   })
// //   .then(getRelated)
// //   .then(console.log);

// const getRecipesAW = async() => {
//   const ids = await getIds();
//   console.log(ids);
//   const recipe = await getRecipe(ids[2]);
//   console.log(recipe);
//   const recipeRelated = await getRelated(recipe.publisher);
//   console.log(recipeRelated);
// };

// getRecipesAW();

/* global fetch*/

const getWeather = async() => {
  const weather = await fetch('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2487956/');
  return weather.body;
};

getWeather()
  .then(result => {
    console.log(result);
    return result.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(console.error);
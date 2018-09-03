const budgetController = (_ => {

  const x = 23;

  const add = a => a + x;

  return {
    publicTest: add
  };
})();

const UIController = (_ => {

  // Some code

})();

const appController = ((budgetCrl, UICtrl) => {

  // Some code
  const c = budgetCrl.publicTest(5);

  return {
    anotherPublic: _ => console.log(c)
  };

})(budgetController, UIController);
/* global document */

const budgetController = (_ => {

  // Some code

})();

const UIController = (_ => {

  // Some code
  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
  };

  return {
    getInput: () => ({
      type: document.querySelector(DOMstrings.inputType).value, // Will be either income or expense
      description: document.querySelector(DOMstrings.inputDescription).value,
      value: document.querySelector(DOMstrings.inputValue).value
    }),
    DOMstrings
  };

})();

const appController = ((budgetCrl, UICtrl) => {

  const controlAddItem = _ => {
    // TODO:
    // 1 get the input data.
    const input = UICtrl.getInput();
    console.log(input);

    // 2 Add the item to the budget controller.
    // 3 Add the new item to the UI.
    // 4 Calculate the budget.
    // 5 Display the budget on the UI.
  };

  document.querySelector(UIController.DOMstrings.inputButton).addEventListener('click', controlAddItem);


  document.addEventListener('keypress', event => {
    if (event.keyCode === 13 || event.which === 13) {
      controlAddItem();
    }
  });

})(budgetController, UIController);
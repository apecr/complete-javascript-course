/* global document */

const budgetController = (_ => {

  // Some code
  const Expense = function({ id, description, value }) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function({ id, description, value }) {
    this.id = id;
    this.description = description;
    this.value = value;
  };


  const data = {
    items: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    },
    budget: 0,
    ratioIncomeExpense: -1
  };

  const calculateTotal = type =>
    data.items[type]
      .reduce((acc, element) => element.value + acc, 0);

  return {
    addItem: ({ type, description, value }) => {

      const getLastId = elements =>
        elements.length > 0
          ? elements[elements.length - 1].id + 1
          : 0;

      if (type === 'expense') {
        data.items[type].push(new Expense({
          id: getLastId(data.items[type]),
          description, value
        }));
        return data.items[type][data.items[type].length - 1];
      } else if (type === 'income') {
        data.items[type].push(new Income({
          id: getLastId(data.items[type]),
          description, value
        }));
        return data.items[type][data.items[type].length - 1];
      }
    },

    calculateBudget: () => {
      // calculate total income and expenses
      data.totals.income = calculateTotal('income');
      data.totals.expense = calculateTotal('expense');

      // calculate the budget (income - expenses)
      data.budget = data.totals.income - data.totals.expense;

      // calculate the rate between income and expense
      data.ratioIncomeExpense = data.totals.income > 0
        ? Math.round((data.totals.expense / data.totals.income) * 100)
        : -1;
      return data;
    },

    getBudget: () => data,

    testing: () => {
      console.log(data);
    }
  };

})();

const UIController = (_ => {

  // Some code
  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    ratioLabel: '.budget__expenses--percentage'
  };

  return {
    getInput: () => ({
      type: document.querySelector(DOMstrings.inputType).value, // Will be either income or expense
      description: document.querySelector(DOMstrings.inputDescription).value,
      value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
    }),
    DOMstrings,
    addListItem: ({ element, type }) => {
      // Create html string with placeholder text
      const htmlIncome = () => `<div class="item clearfix" id="${type}-${element.id}">
      <div class="item__description">${element.description}</div>
      <div class="right clearfix">
          <div class="item__value">${element.value}</div>
          <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
      </div>
  </div>`;
      const htmlExpense = () => `<div class="item clearfix" id="${type}-${element.id}">
        <div class="item__description">${element.description}</div>
        <div class="right clearfix">
            <div class="item__value">${element.value}</div>
            <div class="item__percentage">21%</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>`;

      const htmlByType = {
        income: {
          html: htmlIncome,
          element: DOMstrings.incomeContainer
        },
        expense: {
          html: htmlExpense,
          element: DOMstrings.expensesContainer
        }
      };

      // Replace the placeholder with some actual data
      const newHtml = htmlByType[type].html();

      // Insert the HTML into the DOM
      document.querySelector(htmlByType[type].element)
        .insertAdjacentHTML('beforeend', newHtml);

    },
    clearFields: () => {
      const fields = Array.prototype.slice.call(document
        .querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`));
      fields.forEach(field => field.value = '');
      fields[0].focus();
    },
    isValidInput: ({ value, description }) =>
      description !== '' && !isNaN(value) && value > 0,
    displayBudget: ({ budget, totals, ratioIncomeExpense }) => {
      const displayNumber2Decimals = num =>
        parseFloat(Math.round(num * 100) / 100).toFixed(2);
      document.querySelector(DOMstrings.budgetLabel).textContent =
      displayNumber2Decimals(budget);
      document.querySelector(DOMstrings.incomeLabel).textContent =
      displayNumber2Decimals(totals.income);
      document.querySelector(DOMstrings.expenseLabel).textContent =
      displayNumber2Decimals(totals.expense);
      document.querySelector(DOMstrings.ratioLabel).textContent =
      ratioIncomeExpense > 0
        ? `${ratioIncomeExpense}%`
        : '---';
    }
  };

})();

const appController = ((budgetCrl, UICtrl) => {

  const updateBudgetAndDisplayInTheUI = () => {
    // 4 Calculate the budget.
    const budget = budgetCrl.calculateBudget();
    UIController.displayBudget(budget);
  };

  const controlAddItem = _ => {
    // TODO:
    // 1 get the input data.
    const input = UICtrl.getInput();
    console.log(input);

    // 2 Add the item to the budget controller.
    if (UICtrl.isValidInput(input)) {
      const newItem = budgetCrl.addItem(input);

      // 3 Add the new item to the UI and clear the fields
      UICtrl.addListItem({ element: newItem, type: input.type });
      UICtrl.clearFields();

      // 4 Calculate the budget.
      updateBudgetAndDisplayInTheUI();

      // 5 Display the budget on the UI.
    }
  };

  const setUpEventListeners = _ => {
    document.querySelector(UIController.DOMstrings.inputButton)
      .addEventListener('click', controlAddItem);
    document.addEventListener('keypress', event => {
      if (event.keyCode === 13 || event.which === 13) {
        controlAddItem();
      }
    });
  };

  return {
    init: _ => {
      UIController.displayBudget({
        budget: 0, totals: {
          income: 0,
          expense: 0
        }, ratioIncomeExpense: 0
      });
      setUpEventListeners();
    }
  };


})(budgetController, UIController);

appController.init();
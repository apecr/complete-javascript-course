/* global document */

const budgetController = (_ => {

  // Some code
  const Expense = function({ id, description, value }) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calculatePercentage = function(totalIncome) {
    this.percentage = totalIncome > 0
      ? Math.round((this.value / totalIncome) * 100)
      : -1;
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
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
    deleteItem: ({ type, id }) => {
      data.items[type] = data.items[type].filter(element => element.id !== id);
    },
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

    calculatePercentages: () => {
      const totalIncome = calculateTotal('income');
      data.items.expense
        .forEach(expense => expense.calculatePercentage(totalIncome));
    },

    getPercentages: () =>
      data.items.expense.map(expense => expense.getPercentage()),

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
    ratioLabel: '.budget__expenses--percentage',
    container: '.container',
    deleteButton: '.item__delete--btn',
    expensesPercentageLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };

  const getTypeFromNumber = number => number > 0 ? 'income' : 'expense';

  const formatNumber = (number, intType) => {
    const perfixByType = {
      expense: '-',
      income: '+'
    };
    const numberString = Math.abs(number).toFixed(2);
    const numberSections = numberString.split('.');
    const integer = numberSections[0];
    const decimal = numberSections[1];
    const finalIntegerString = [ ...integer ].reverse().map((numberInt, index) => {
      if (index % 3 === 0 && index !== 0) {
        return `${numberInt},`;
      }
      return numberInt;
    }).reverse().join('');
    return `${perfixByType[intType]} ${finalIntegerString}.${decimal}`;
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
          <div class="item__value">${formatNumber(element.value, type)}</div>
          <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
      </div>
  </div>`;
      const htmlExpense = () => `<div class="item clearfix" id="${type}-${element.id}">
        <div class="item__description">${element.description}</div>
        <div class="right clearfix">
            <div class="item__value">${formatNumber(element.value, type)}</div>
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

    deleteItemById: id => document.querySelector(`#${id}`).parentNode
      .removeChild(document.querySelector(`#${id}`)),

    displayBudget: ({ budget, totals, ratioIncomeExpense }) => {
      const displayNumber2Decimals = num =>
        parseFloat(Math.round(num * 100) / 100).toFixed(2);
      document.querySelector(DOMstrings.budgetLabel).textContent =
        formatNumber(budget, getTypeFromNumber(budget));
      document.querySelector(DOMstrings.incomeLabel).textContent =
        formatNumber(totals.income, 'income');
      document.querySelector(DOMstrings.expenseLabel).textContent =
        formatNumber(totals.expense, 'expense');
      document.querySelector(DOMstrings.ratioLabel).textContent =
        ratioIncomeExpense > 0
          ? `${ratioIncomeExpense}%`
          : '---';
    },

    displayPercentages: (percentages) => {
      const fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);
      Array.prototype.forEach.call(fields, (field, index) => {
        field.textContent = percentages[index] > 0
          ? `${percentages[index]}%`
          : '---';
      });
    },

    displayDate: () => {
      const now = new Date();
      const month = now.getUTCMonth();
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      var year = now.getUTCFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent = `${monthNames[month]} ${year}`;
    },

    changedType: event => {
      const fields = document.querySelectorAll(
        [DOMstrings.inputType, DOMstrings.inputDescription, DOMstrings.inputValue].join()
      );
      Array.prototype.forEach.call(fields, field => {
        field.classList.toggle('red-focus');
      });
      document.querySelector(DOMstrings.inputButton).classList.toggle('red');
    }
  };

})();

const appController = ((budgetCrl, UICtrl) => {

  const updatePercentagesAndDisplayInTheUI = () => {
    // 1. Calculate the percentages
    budgetCrl.calculatePercentages();

    // 2. Read percentages from the budget controller
    const percentages = budgetCrl.getPercentages();
    console.log('Percentages');
    console.log(percentages);

    // 3. Update the UI with the new percentages
    UICtrl.displayPercentages(percentages);

  };

  const updateBudgetAndPercentagesAndDisplayInTheUI = () => {
    // 4 Calculate the budget.
    const budget = budgetCrl.calculateBudget();
    UIController.displayBudget(budget);

    updatePercentagesAndDisplayInTheUI();
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
      updateBudgetAndPercentagesAndDisplayInTheUI();

      // 5 Display the budget on the UI.
    }
  };


  const controlDeleteItem = event => {
    const getItemAndType = id => ({
      type: id.split('-')[0],
      id: parseInt(id.split('-')[1])
    });
    const itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemId) {
      const item = getItemAndType(itemId);

      // 1. Delete item from the data
      budgetCrl.deleteItem(item);

      // 2. Delete the item from the UI
      UICtrl.deleteItemById(itemId);

      // 3. Update and show the new budget
      updateBudgetAndPercentagesAndDisplayInTheUI();

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

    document.querySelector(UIController.DOMstrings.container)
      .addEventListener('click', controlDeleteItem);

    document.querySelector(UIController.DOMstrings.inputType)
      .addEventListener('change', UIController.changedType);
  };

  return {
    init: _ => {
      UIController.displayBudget({
        budget: 0, totals: {
          income: 0,
          expense: 0
        }, ratioIncomeExpense: 0
      });
      UIController.displayDate();
      setUpEventListeners();
    }
  };


})(budgetController, UIController);

appController.init();
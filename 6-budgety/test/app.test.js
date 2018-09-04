const expect = require('chai').expect;

/* global define, it, describe, before, beforeEach, afterEach, after */
const Income = function({ id, description, value }) {
  this.id = id;
  this.description = description;
  this.value = value;
};
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
let data = {
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

const calculatePercentages = () => {
  const totalIncome = calculateTotal('income');
  data.items.expense
    .forEach(expense => expense.calculatePercentage(totalIncome));
};

const getPercentages = () =>
  data.items.expense.map(expense => expense.getPercentage());

describe('Test suite', () => {
  const getItemAndType = id => ({
    type: id.split('-')[0],
    id: parseInt(id.split('-')[1])
  });
  it('Should return id and type income-0', () => {
    expect(getItemAndType('income-0')).to.be.deep.equal({
      type: 'income',
      id: 0
    });
  });
  it('Should return id and type expense-2', () => {
    expect(getItemAndType('expense-2')).to.be.deep.equal({
      type: 'expense',
      id: 2
    });
  });
});

describe('Testing expenses', () => {
  data = {
    budget: 2700,
    items: {
      expense: [
        new Expense({id: 0, description: 'Holidays', value: 400}),
        new Expense({id: 1, description: 'Rent', value: 1200})
      ],
      income: [
        new Income({id: 0, description: 'Salary', value: 200}),
        new Income({id: 1, description: 'Refund', value: 200}),
        new Income({id: 2, description: 'New stakeholder', value: 2000})
      ],
      ratioIncomeExpense: 37
    },
    totals: {expense: 1600, income: 2400}
  };
  it('Should calculate the percentages', () => {
    calculatePercentages();
    expect(data.items.expense[0].percentage).to.not.be.equal(-1);
  });
  it('Should get the percentages', () => {
    calculatePercentages();
    expect(getPercentages()[0]).to.be.equal(17);
  });
});

describe('Formating numbers', () => {
  const formatNumber = (number, type) => {
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
    return `${perfixByType[type]} ${finalIntegerString}.${decimal}`;
  };
  it('Should return a correct format number', () => {
    expect(formatNumber(2100.3456, 'income')).to.be.equal('+ 2,100.35');
  });
  it('Should return a correct format number expense', () => {
    expect(formatNumber(4567892100.3456, 'expense')).to.be.equal('- 4,567,892,100.35');
  });
});
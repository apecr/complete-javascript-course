const expect = require('chai').expect;

/* global define, it, describe, before, beforeEach, afterEach, after */

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
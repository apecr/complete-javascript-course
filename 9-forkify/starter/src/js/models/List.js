import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem({count, unit, ingredient}) {
    return this.items[this.items.push({count, unit, ingredient, id: uniqid()}) - 1];
  }

  deleteItem(id) {
    this.items = this.items.filter(element => element.id !== id);
  }

  updateCount({id, newCount}) {
    this.items.find(el => el.id === id).count = newCount;
  }
}
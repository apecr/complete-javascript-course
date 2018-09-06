// Defautl parameters in ES5

function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName === undefined ? 'Smith' : lastName;
  this.nationality = nationality === undefined ? 'American' : nationality;
}

var john = new SmithPerson5('John', 1990);
var emily = new SmithPerson5('Emily', 1992, 'Diaz', 'Spanish');

// Default parameters in ES6

function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
  this.nationality = nationality;
}

const john6 = new SmithPerson6('John', 1990);
const emily6 = new SmithPerson6('Emily', 1992, 'Diaz', 'Spanish');

// Lecture: Maps

const question = new Map();
question.set('question', 'What is the official name of the latest major Javascript Version');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

console.log(question.get(true));
console.log(question.size);

// Delete Options

// question.delete(4);

// if (question.has(4)) {
//   question.delete(4);
// }

// question.clear();

// console.log(question);

// Looping maps

const consoleMapElement = (value, key) =>
  console.log(`This is ${key}, and it is set to ${value}`);

question.forEach(consoleMapElement);

for (let [key, value] of question.entries()) {
  consoleMapElement(value, key);
}

Array.from(question
  .entries())
  .filter((value, key) => typeof(key) === 'number')
  .forEach(consoleMapElement);

// Function constructor

let john = {
  name: 'John',
  yearOfBirth: 1990,
  job: 'teacher'
};

console.log(john);

const Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person.prototype.calculateAge = function() {
  console.log(2018 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';

john = new Person('John', 1990, 'teacher');

console.log(john);

john.calculateAge();

let jane = new Person('Jane', 1969, 'designer');
let mark = new Person('Mark', 1948, 'retired');
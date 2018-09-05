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

var john6 = new SmithPerson6('John', 1990);
var emily6 = new SmithPerson6('Emily', 1992, 'Diaz', 'Spanish');
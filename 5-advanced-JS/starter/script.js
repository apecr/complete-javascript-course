// Object Create

let personProto = {
  calculateAge: function() {
    console.log(2018 - this.yearOfBirth);
  }
};

let john = Object.create(personProto);

john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

let jane = Object.create(personProto, {
  name: {value: 'Jane'},
  yearOfBirth: {value: 1969},
  job: {value: 'designer'}
});

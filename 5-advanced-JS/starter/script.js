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
  name: { value: 'Jane' },
  yearOfBirth: { value: 1969 },
  job: { value: 'designer' }
});

// Passing functions as arguments


const years = [1990, 1965, 1937, 2005, 1998];
const arrayCalc = (arr, fn) => arr.map(fn);

const calculateAge = yearOfBirth => 2016 - yearOfBirth;
const isFullAge = age => age >= 18;
const maxHeartRate = age => (age >= 18 && age <= 81) ? Math.round(206.9 - (0.67 * age)) : -1;


const ages = arrayCalc(years, calculateAge);

// console.log(years.map(calculateAge));
const fullages = arrayCalc(ages, isFullAge);

// console.log(years
//   .map(calculateAge)
//   .map(isFullAge));

// console.log(years
//   .map(calculateAge)
//   .map(maxHeartRate));

// Functions returning functions

const interviewQuestion = job => {
  const jobs = {
    designer: name => console.log(`${name}, can you explain what UX design is?`),
    teacher: name => console.log(`What subject do you teach ${name}?`)
  };
  return jobs.hasOwnProperty(job)
    ? jobs[job]
    : name => console.log(`Hello ${name}, what do you do?`);
};

const teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');
interviewQuestion('designer')('Jane');
interviewQuestion('taxi driver')('Jane');
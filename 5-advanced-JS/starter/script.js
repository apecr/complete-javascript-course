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

// teacherQuestion('John');
// interviewQuestion('designer')('Jane');
// interviewQuestion('taxi driver')('Jane');

// IIFE

// const game = _ => {
//   let score = Math.random() * 10;
//   console.log(score >= 5);
// };

// game();

(_ => console.log(Math.random() * 10 >= 5))();
(goodLuck => console.log(Math.random() * 10 >= 5 - goodLuck))(5);

// Closures

const retirement = retirementAge => {
  const a = ' years left until retirement.';
  return yearOfBirth => {
    const age = 2016 - yearOfBirth;
    console.log((retirementAge - age) + a);
    return retirementAge - age;
  };
};

const retirementsByCountry = {
  US: 66,
  Germany: 65,
  Iceland: 67
};

retirement(retirementsByCountry.US)(1990);
retirement(retirementsByCountry.Germany)(1990);
retirement(retirementsByCountry.Iceland)(1990);

const interviewQuestionWithClosure = job => name => {
  const jobs = {
    designer: `${name}, can you explain what UX design is?`,
    teacher: `What subject do you teach ${name}?`
  };
  console.log(jobs.hasOwnProperty(job)
    ? jobs[job]
    : `Hello ${name}, what do you do?`);
};

interviewQuestionWithClosure('designer')('Jane');
interviewQuestionWithClosure('taxi driver')('Jane');
interviewQuestionWithClosure('teacher')('Alberto');

// Bind, Call, Apply

let jonh = {
  name: 'John',
  age: 26,
  job: 'teacher',
  presentation: function(style, timeOfDay) {
    console.log(style === 'formal'
      ? `Good ${timeOfDay}, Ladies and gentlemen! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old.`
      : `Hey What's up! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old. Have a nice ${timeOfDay}.`);
  }
};

let emily = {
  name: 'Emily',
  age: 35,
  job: 'designer'
};

jonh.presentation('formal', 'in the morning');

jonh.presentation.call(emily, 'firendly', 'afternoon');

jonh.presentation.apply(emily, ['firendly', 'afternoon']);

const jonhFriendly = jonh.presentation.bind(jonh, 'friendly');

jonhFriendly('morning');
jonhFriendly('night');

const emilyFormal = jonh.presentation.bind(emily, 'formal');

emilyFormal('afternoon');
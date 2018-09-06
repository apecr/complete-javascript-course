const second = _ => {
  setTimeout(() => {
    console.log('Async');
  }, 2000);
};
const first = _ => {
  console.log('Hey there');
  second();
  console.log('The end');
};
first();

const A = true;
const B = false;
console.log(!(A || !B) && (A && !B && A) || (A || B));
calculate(1965);

function calculateAge(year) {
  console.log(2016-year);


var retirement = function(year) {
  console.log(65 - (2016-year));
}

//retirement(1956);

//this is function expression, hoisting only works for
//function decoration
var retirement = function(year) {
  console.log(65-(2016-year));
}

//The function and variables are already there
//even before the execution of the code
//but var with no assignment

console.log(age);
var age = 23;

fucntion foo() {
  var age = 65;
  console.log(age);
}

foo();
console.log(age);

//The two vars age have completely different context

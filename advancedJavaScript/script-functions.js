/*
    FIRST—CLASS fucntions:
A function is an instance of the Object type
A function behaves like any other Objects
We can store functions in a variable;
We can pass a function as an argument to another function.
We can return function from a function.
*/

//Callback function tells the function what to do with the prarameters:
console.log('================Start of Another section!===============');

var years = [1990, 1965, 1937, 2005, 1998];

function calculateArr(arr, func) { //func is the callBack fucntion.
  var resArrays = [];
  for(var i = 0; i < arr.length; i++) {
    resArrays.push(func(arr[i]));
  }
  return resArrays;
}

var calculateAges = function(el) {
    return 2016 - el;
}

var calculateHeartRate = function(el) {
  if(el >= 18 && el <= 81) {
    return Math.round(206.9 - (0.67 * el));
  } else {
    return -1;
  }
}

var ages = calculateArr(years, calculateAges);
var heartRates = calculateArr(ages, calculateHeartRate);
console.log(heartRates);


//function as return values
function interViewQuestions(job) {
    return function(name) {
        if(job === 'teacher') {
          console.log('What subject do you teach,' + name + '?');
        } else if (job === 'designer') {
          console.log(name + ', can you please explain what UX design is?');
        } else {
            console.log(name + ', What do you do?');
        }
    }
}

//function can be regarded as an object
interViewQuestions('teacher')('jane');

//create a scope hidden from the outside scope: immediately invoked functions.
//variable security and doesnt interfere with other variables in the global context.
(function (goodluck) {
  var score = Math.random() * 10;
  console.log( score >= 5 - goodluck);
})(5);


/*
Closurs: An inner function has always access to the
variables ana prarameters of its outer function, even after
the outer function has returned.

To be more specific, even if the execution context is gone,
the variables are still there and can be accessed.

The scope chain is closed in.
*/

function retireMent(retireMentAge) {
  var a = ' years left until retireMent';
  return function(yearOfBirth) {
    console.log(retireMentAge - (2016 - yearOfBirth) + a);
  }
}

var retirementUS = retireMent(66);
retirementUS(1990);
//The variable retireMentAge can be used in the nested function
//even after it returns.
//The function below is the same as function above
retireMent(66)(1990);

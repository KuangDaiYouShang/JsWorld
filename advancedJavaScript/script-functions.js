/*
    FIRST—CLASS fucntions:
A function is an instance of the Object type
A function behaves like any other Objects
We can store functions in a variable;
We can pass a function as an argument to another function.
We can return function from a function.
*/

//Callback function tells the function what to do with the prarameters:

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

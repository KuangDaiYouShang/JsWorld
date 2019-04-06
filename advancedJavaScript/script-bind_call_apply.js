console.log('================Start of Another section!===============');

var Person = function(name, sex, age) {
  this.name = name;
  this.sex = sex;
  this.age = age;
  //Define a function in constructor function should be like this.
  this.presentation = function(style, timeOfDay) {
    if(style === 'formal') {
      console.log('Good' + timeOfDay + 'Ladies and gentlemen, i\'m' +
    this.name);
    } else if (style === 'casual') {
      console.log('what\'s up guys, good' + timeOfDay);
    }
  }
}

var john = new Person('John', 'male', 26);

john.presentation('formal', 'evening');

var emily = {
  name: 'Emily',
  sex: 'female',
  age: 25
};

//CALL is used when you want to use function from other objects.
john.presentation.call(emily, 'formal', 'evening');

//BIND is used when you want to create a copy of a function with some
//pre-set arguments
//Here the first argument 'john' refers to 'this' in the function.
var johnFormal = john.presentation.bind(john, 'formal');
johnFormal('evening');
Person.prototype.calculateAge = function(arr, fn) {
  resArrs = [];
  for(var i = 0; i < arr.length; i++) {
    resArrs.push(fn(arr[i]));
  }
  return resArrs;
}

function isFullage(limit, el) {
  return (2016-el) > limit;
}

var years = [1990, 1965, 1937, 2005, 1998];
/*
in a bound function, this and any extra
parameters will always be the first ones passed in
*/
var fullJapan = john.calculateAge(years, isFullage.bind(this, 20));
console.log(fullJapan);

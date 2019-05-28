//=======Arrow functions and this==========================
const box6 = {
  color : 'color',
  position : 1,
  clickMe: function() {
    document.querySelector('.green').addEventListener('click', () => {
           var str = 'This is box number' + this.position + 'and it is ' + this.color;
           alert(str);
       });
  }
}
box6.clickMe();

//ES5
function Person(name) {
  this.name = name;
}
Person.prototype.myFriends5 =
function(friends) {
  var arr = friends.map(function(el) {
    return this.name + ' is friends with ' + el;
  }.bind(this)); //use the old school 'bind' to make this predefined

  console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

//ES6
function Person(name) {
  this.name = name;
}
Person.prototype.myFriends6 =
function(friends) {
  var arr = friends.map(el => {
    return this.name + ' is friends with ' + el;
    //Since this is one line code, {} can be ignored.
  });
  console.log(arr);
}
var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends6(friends);


//========Destructuring : Destructure a data structure===========
const[name, age] = ['john', 26];
console.log(name);
console.log(age);

const obj = {
  firstName: 'John',
  lastName: 'Smith'
};

const {firstName, lastName} = obj;
//or if we dont want to use the same name:
const {firstName:a, lastName:b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}
const[age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);


//==========Arrays in ES6==================
const boxes = document.querySelectorAll('.box');
//In ES5, we use slice to change list nodes to an array.
//However, in ES6, There is Array.from(list)
const boxesArr6 = Array.from(boxes);

Array.from(boxes).forEach(cur => cur.style.backgroundColor =
'dodgerblue');
/*
If we want to put 'continue' / 'break' into loop, instead of
using the classic for loop, there is a for of loop in ES6.
Its just like for (type var : array) in java
*/
for(const el of boxesArr6) {
  if(el.className.includes('blue')) {
    continue;
  }
  el.textContent = 'I changed to blue';
}

//find
ages = [12,17,8,21,14,11];
console.log(ages.findIndex(cur => cur >= 18)); //find index
console.log(ages.find(cur => cur >= 18));//find element

/*
The spread operator
可变参数组
*/
var addFourAges = function(a, b, c, d) {
  return a + b + c + d;
}
//ES6
var ages = [18, 30, 12, 21];
const sum = addFourAges(...ages);

//join multiple arrays
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];

//example
const h = document.querySelector('h1');
const boxes_2 = document.querySelectorAll('.box');
const all = [h, ...boxes_2];

Array.from(all).forEach(cur => cur.style.color = 'purple');

/*
Rest parameters allows us to pass arbitrary number of arguments into a function.
*/
//ES5: When we want to pass multiple arguments, not sure how many
//use arguments key word in the function.
function isFullAge5() {
  console.log(arguments);
  var argArrs = Array.prototype.slice.call(arguments);

  argArrs.forEach(function(cur) {
    console.log((2016 -cur) >= 18);
  });
}
isFullAge5(1990, 1990, 1965);

//ES6:
function isFullAge6(limit, ...years) {
  years.forEach(cur => console.log((2016 - cur) >= 18));
}
isFullAge6(25,1990,1990,1965);

//===================Default Parameters===============
/*
JavaScript allows calling function without specifying all arguments
*/
function SmithPerson(a1, a2, a3='male', a4='1990') {
  this.a1 = a1;
  this.a2 = a2;
  this.a3 = a3;
  this.a4 = a4;
}

var smith = new SmithPerson('jerry', 'smith');

//==============Map================================
const question = new Map();
//set
question.set(1, 'question1');
question.set(true, 'question2');
//has
if(question.has(1)) {
  console.log('question has key 1');
}
//clear
//question.clear();

question.forEach((value, key) => console.log(`This is ${key} and its set to ${value}`));

for(let [key, value] of question) {
  if(typeof(key) === 'number') {
    console.log(`Answer${key}:${value}`); //This is `` ,not ''
  }
}

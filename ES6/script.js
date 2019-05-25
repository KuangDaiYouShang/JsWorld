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
const boxesArr6 = Arrays.from(boxes).forEach(cur => cur.style.backgroundColor =
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

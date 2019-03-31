//function constructor

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

//the keyword new redirect this from global object to the new Objct Person.
var john = new Person('john', 1990, 'teacher');

//add function to prototype instead of adding it to the function constructor directly.
Person.prototype.calculateAge = function() {
  console.log(2016 - this.yearOfBirth);
};

//add property to prototype
Person.prototype.lastName = 'Smith';


//All the prototype properties we added(calculateAge, lastName) are not in the Object Person,
//but we have access to it.
var jane = new Person('john', 1990, 'teacher');
jane.calculateAge();
console.log(jane.lastName);

//Prototype chain : John -> Person -> Object
john.hasOwnProperty('job'); // true
john.hasOwnProperty('lastName');//false
john instanceof Person;//true

//-------------------------Another way to create object----------------------
var personProto = {
  calculateAge: function() {
    console.log(2016-this.yearOfBirth);
  }
};

var jimmy = Object.create(personProto);
jimmy.name = 'jimmy';
jimmy.yearOfBirth = 1992;
jimmy.job = 'teacher';

var david = Object.create(personProto, {
  name: { value: 'david'},
  yearOfBirth: { value: '1992'},
  job: { value: 'designer'}
});


//-----------------------Objects and Primitives-------------------------------
/*
Primitive variables hold the own copy of the data while objects hold the reference.
When we pass Primitives into function, a simple copy is created. It will never affect the variable on the outside.
Object, we actually pass the reference into it. change the object inside the function -> change the objct outside the function.
*/
var obj1 = {
  name: 'Jonas',
  city: 'Lisbon'
};

var a = 30;

function change(prim, obj) {
  prim = 27;
  obj.city = 'San Francisco';
};

change(a, obj1);

console.log(a);
console.log(obj1.city);

//Passing functions as arguments

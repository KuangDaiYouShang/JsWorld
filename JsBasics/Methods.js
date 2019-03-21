//Attatch functions to Objects, it becomes methods

var john = {
  firstName: 'John',
  lastName: 'Smith',
  birthYear: 1990,
  family: ['Jane', 'Mark', 'Bob', 'Emily'],
  job:'teacher',
  isMarried:false,
  calcAge: function(birthYear) {
    this.age = 2018 - this.birthYear; // this means john
  }
};

console.log(john.calcAge());
john.calcAge();
console.log(john.age);

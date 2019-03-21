//The 'This' variable

//Regular function call: the this keyword points
//at the global object, (the window object, in the browser)

//method call: the this variable points to the object that is
//calling the

calculateAge(1985);

function calculateAge(year) {
  console.log(2016-year);
  console.log(this); //refers to the global object window
}

var john = {
  name: 'John',
  yearOfBirth: 1990,
  calculateAge: function() {
    console.log(this); // refers to the john object
    console.log(2016 - this.yearOfBirth);

    function innerFunction() {
      console.log(this); //refers to the window, coz this
      //is  a regular function
    }
    innerFunction();
  }
};
john.calculateAge();

var mike = {
  name:'Mike',
  yearOfBirth : 1984
};

mike.calculateAge = john.calculateAge;
mike.calculateAge(); // this refers to mike now

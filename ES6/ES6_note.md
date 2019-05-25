## ES6 new features

 * ES5

   Use IIFE to secure the data privacy because var is function scope

* ES6

  Use block and let/const to secure the data privacy because the y are block-scoped.

* In ES6 we do not need to connect strings with s1 + "" + s2. Instead write ${variable or functions which returns a variable} to use them as a string.

  ``` javascript
  console.log("This is ${firstName}${lastName}. He was born in ${yearOfBirth}. Today, he is ${(calcAge(yearOfBirth))} years old.")
  ```

* String methods : 

  ``` javascript
  const n = '${firstName} ${lastName}';
  console.log(n.startWith('j'));
  console.log(n.startWith('Sm'));
  console.log(n.includes('oh'));
  console.log(firstName.repeats(5));
  ```

* Arrow functions : Lexical 'this' Keyword

  ``` javascript
  var box5 = {
      color: 'green',
      position : 1,
      clickMe: function() {
          document.querySelector('.green').addEventListener('click', function() {
              var str = 'This is box number' + this.position + 'and it is ' + this.color;
          })
      }
  }
  /*
  The this.position and this.color will be undefined because this refers to object in callback function, while clickMe refers to box5.
  */
  ```

  In order to solve this problem, we add bridge value :

  ``` javascript
  var box5 = {
      ...
      var self = this;
      ....addEventListener('click', function() {
          ..self.position + .. + self.color;
      })
  }
  //with self variable, we refers this to box5.
  ```

  Or in ES6, we can use arrow function to avoid this problem:

  ``` javascript
  document.querySelector('.green').addEventListener('click', () => {
             var str = 'This is box number' + this.position + 'and it is ' + this.color;
             alert(str);
         });
  ```

* The coolest way to use arrow function:

  ``` javascript
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
  
  ```

* Destruct

  destructing an array/object to distinct variables use const[var1, var2] = some data structure

  ``` javascript
  const[name, age] = ['john', 26]; //array
  const {firstName, lastName} = obj; //object
  const {firstName:a, lastName:b} = obj; //object renaming the vars
  
  ```

### Arrays in ES6

* array = Arrays.from(list);
* for (const el of array) {};
* array.find(callback);
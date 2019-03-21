var a = 'One';
first();

function first() {
  var b = 'Hi';
  second();

  function second() {
    var c = 'Three';
    console.log(a + b + c);
  }
}

function third() {
  var d = 'John';
  //console.log(c); Not availAble
  //The sequence of how the the functions are called doesnt matter
  console.log(a+d);
}

var Mark = {
  firstName: 'Terry',
  lastName: 'Mark',
  weight: 80,
  height: 1.80,
  calBmi: function(){
    this.BMI = this.weight/(this.height*this.height);
    return this.BMI;
  }
}

var John = {
  firstName: 'John',
  lastName: 'Smith',
  weight: 90,
  height: 1.95,
  calBmi: function(){
    this.BMI = this.weight/(this.height*this.height);
    return this.BMI;
  }
}

console.log(Mark.calBmi());
console.log(John.calBmi());

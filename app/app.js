var budgetController = (function() {
  var incomeList = [];
  var expenseList = [];

  var calculateBudget = function() {
     var totalIncome;
     var totalExpense;
     for(var i = 0; i < incomeList.length; i++) {
       totalIncome += incomeList[i];
     }
     for(var i = 0; i < expenseList.length; i++) {
       totalExpense += expenseList[i];
     }
     return totalIncome - totalExpense;
  }

  return {
    doAddItem : function(money) {
      if(money < 0) {
        incomeList.push();
      } else if (money > 0){
        expenseList.push();
      }
    }
  }

})();

var uIController = (function() {
    //sample code
})();

var controller = (function(budgetCtrl, UICtrl) {

var addItem = function() {
  console.log('event occurd');
  //1. Get the field input data
  var inputBudget = document.querySelector('.add__description').value;
  //2. Add the item to the budget budgetController

  //3. Add the item to the UI

  //4. calculate the budget

  //5. Display the budget on the UI
}


  //Anthor key press event which has the same function as click
document.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
      addItem();
    }
});

document.querySelector('.add__btn').addEventListener('click', addItem);

})(budgetController, uIController);

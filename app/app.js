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
    doAddItem : function(inArg) {
      if(inArg.type === 'inc') {
        incomeList.push(inArg.value);
        console.log(incomeList);
      } else {
        expenseList.push(inArg.value);
        console.log(expenseList);
      }
    },
    doCalculate : function() {
      return calculateBudget();
    }
  }

})();

var uIController = (function() {
    //private static final map
    var domString = {
      inputType : '.add__type',
      inputDescription : '.add__description',
      inputValue : '.add__value',
      addBtn : '.add__btn'
    }

    return {
      getInput : function() {
        return {
          type : document.querySelector(domString.inputType).value, //will be either inc or exp
          description : document.querySelector(domString.inputDescription).value,
          value : document.querySelector(domString.inputValue).value
        }
      },
      getDom : function() {
        return domString;
      }
    }
})();

var controller = (function(budgetCtrl, UICtrl) {

var addItem = function() {
  console.log('event occurd');
  //1. Get the field input data
  var input = UICtrl.getInput();
  console.log(input);
  //2. Add the item to the budget budgetController
  budgetCtrl.doAddItem(input);
  //3. Add the item to the UI

  //4. calculate the budget

  //5. Display the budget on the UI
}

return {
  init : function() {
    //Anthor key press event which has the same function as click
    document.addEventListener('keypress', function(event) {
        if(event.keyCode === 13) {
          addItem();
        }
    });
    document.querySelector(UICtrl.getDom().addBtn).addEventListener('click', addItem);
  }
}

})(budgetController, uIController);

controller.init();

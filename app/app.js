var budgetController = (function() {
  //use object as the data structure
  var IncomeObj = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var ExpenseObj = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp : [],
      inc : []
    },
    totals : {
      exp : 0,
      inc : 0
    },
    budget: 0,
    percentage: -1
  };

  //calculate the sum of a list.
  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  return {
    doAddItem : function(inArg) {
      var newItem, ID;

      //create new ID
      ID = data.allItems[inArg.type].length === 0 ? 0 : data.allItems[inArg.type][data.allItems[inArg.type].length-1].id + 1;

      console.log(newItem);
      console.log(ID);
      //Create new item based on inc/exp
      if(inArg.type === 'inc') {
        newItem = new IncomeObj(ID, inArg.description, inArg.value);
      } else if(inArg.type === 'exp') {
        newItem = new ExpenseObj(ID, inArg.description, inArg.value);
      }
      //Push it into our data structure
      data.allItems[inArg.type].push(newItem); //Use Object[key] to avoid if/else statement.

      return newItem;
    },

    //delete item from the data structure
    doDeleteItem : function(type, ID) {
      var ids, index;
      ids = data.allItems[type].map(function(cur) {
        return cur.id;
      });
      //get the index of current ID
      index = ids.indexOf(ID);

      if(index != -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    //calculate the budget and percentage, store them in the data
    doCalculate : function() {
      calculateTotal('inc');
      calculateTotal('exp');
      data.budget = data.totals['inc'] - data.totals['exp'];
      data.percentage = data.totals['inc'] > 0 ? Math.round(data.totals['exp'] / data.totals['inc'] * 100) + '%' : -1;
    },

    doGetBudget : function() {
      return {
        budget : data.budget,
        totalInc : data.totals['inc'],
        totalExp : data.totals['exp'],
        percentage : data.percentage
      }
    },

    doTesting : function() {
      return console.log(data);
    }
  }

})();

var uIController = (function() {
    //private static final map
    var domString = {
      inputType : '.add__type',
      inputDescription : '.add__description',
      inputValue : '.add__value',
      addBtn : '.add__btn',
      inc : '.income__list',
      exp : '.expenses__list',
      budgetLabel : '.budget__value',
      incomeLabel : '.budget__income--value',
      expLabel: '.budget__expenses--value',
      percentageLabel : '.budget__expenses--percentage',
      container : '.container' //<div class="container clearfix">
    }

    return {
      getInput : function() {
        return {
          type : document.querySelector(domString.inputType).value, //will be either inc or exp
          description : document.querySelector(domString.inputDescription).value,
          value : parseFloat(document.querySelector(domString.inputValue).value)
        }
      },
      getDom : function() {
        return domString;
      },
      addItemToUI : function(type, obj) {
        var htmlString, newHtml, element;
        if(type === 'inc') {
          htmlString = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if (type === 'exp') {
          htmlString = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        element = domString[type];
        newHtml = htmlString.replace('%id%', obj.id);
        newHtml = newHtml.replace('%desc%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },

      doDeleteItemFromUI : function(id) {
        var el = document.getElementById(id);
        el.parentNode.removeChild(el);
      },

      clearFields : function() {
        var fields;
        fields = document.querySelectorAll(domString.inputDescription + ', ' + domString.inputValue);
        //convert a list into an array
        fieldsArr = Array.prototype.slice.call(fields);
        fieldsArr.forEach(function(element, index, array) {
          element.value = "";
        });
        fields[0].focus();
      },

      displayBudget : function(obj) {
        document.querySelector(domString.budgetLabel).textContent = obj.budget;
        document.querySelector(domString.incomeLabel).textContent = obj.totalInc;
        document.querySelector(domString.expLabel).textContent = obj.totalExp;

        if(obj.totalInc > 0) {
          document.querySelector(domString.percentageLabel).textContent = obj.percentage;
        } else {
          document.querySelector(domString.percentageLabel).textContent = '---';
        }
      }
    }
})();

var controller = (function(budgetCtrl, UICtrl) {

var addItem = function() {
  console.log('event occurd');
  //1. Get the field input data
  var input = UICtrl.getInput();
  console.log(input);
  if(input.description !== "" && !isNaN(input.value) && input.value != 0) {
    //2. Add the item to the budget budgetController
    var addedItem = budgetCtrl.doAddItem(input);
    //3. Add the item to the UI
    UICtrl.addItemToUI(input.type, addedItem);
    //3.5. clear input fields
    UICtrl.clearFields();
  }
};

var updateBudget = function() {
  //1. calculate the budget
  budgetCtrl.doCalculate();
  budgetCtrl.doTesting();//test
  //2. return the budget
  var budget = budgetCtrl.doGetBudget();
  //3. Display the budget on the UI
  UICtrl.displayBudget(budget);
};

var ctrlDeletion = function(event) {
  var itemID, splitID, type, id;

  itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
  if(itemID) {
    splitID = itemID.split('-');
    type = splitID[0];
    id = splitID[1];

    // 1. delete the item from the data structure
    budgetCtrl.doDeleteItem(type, parseInt(id));
    // 2.  delete the item from the UI
    UICtrl.doDeleteItemFromUI(itemID);
    // 3.  update and show the new budget
    updateBudget();
  }
}

return {
  init : function() {
    //Anthor key press event which has the same function as click
    document.addEventListener('keypress', function(event) {
        if(event.keyCode === 13) {
          addItem();
          updateBudget();
        }
    });

    document.querySelector(UICtrl.getDom().container).addEventListener('click', ctrlDeletion);

    document.querySelector(UICtrl.getDom().addBtn).addEventListener('click', function() {
      addItem();
      updateBudget();
    });

    UICtrl.displayBudget({
      budget : 0,
      totalInc : 0,
      totalExp : 0,
      percentage : -1
    })
  }
}

})(budgetController, uIController);

controller.init();

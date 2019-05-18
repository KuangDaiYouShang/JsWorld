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
    this.percentage = -1;
  };

  ExpenseObj.prototype.calculatePercent = function(totalIncome) {
    if(totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  ExpenseObj.prototype.getPercentage = function() {
    return this.percentage;
  }

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

    doCalculatePercentage : function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calculatePercent(data.totals.inc);
      });
    },

    doGetPercentage : function() {
      var allPercentages = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });
      return allPercentages;
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
      container : '.container', //<div class="container clearfix">
      percentageLabels : '.item__percentage',
      dateLabel : '.budget__title--month'
    };

    //formatting numbers
    var formatNums = function(num, type) {
        var int, newNum;
        num = Math.abs(num);
        num = num.toFixed(2);
        decimal = num.split('.')[1];
        int = num.split('.')[0];
        if(int.length > 3) {
          int = int.subString(0, int.length-3) + ',' + int.subString(int.length-3, int.length);
        }
        return (type == 'inc' ? '+' : '-') + ' ' + int + '.' + decimal;
    };

    //customized for each function
    var nodeListForEach = function(list, callBack) {
      for(var i = 0; i < list.length; i++) {
        callBack(list[i], i);
      }
    };

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
          htmlString = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage"></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        element = domString[type];
        newHtml = htmlString.replace('%id%', obj.id);
        newHtml = newHtml.replace('%desc%', obj.description);
        newHtml = newHtml.replace('%value%', formatNums(obj.value, type));

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

        var type = obj.budget > 0 ? 'inc' : 'exp';

        document.querySelector(domString.budgetLabel).textContent = formatNums(obj.budget, type);
        document.querySelector(domString.incomeLabel).textContent = formatNums(obj.totalInc, type);
        document.querySelector(domString.expLabel).textContent = obj.totalExp;

        if(obj.totalInc > 0) {
          document.querySelector(domString.percentageLabel).textContent = obj.percentage;
        } else {
          document.querySelector(domString.percentageLabel).textContent = '---';
        }
      },

      displayPercentage : function(percentages) {

          var fields = document.querySelectorAll(domString.percentageLabels);

          nodeListForEach(fields, function(cur, index) {
            if(percentages[index] > 0) {
              cur.textContent = percentages[index] + '%';
            } else {
              cur.textContent = '---';
            }
          })
      },

      changeColor : function() {
        var fields = document.querySelectorAll(domString.inputType + ',' + domString.inputDescription + ',' +
      domString.inputValue);
        nodeListForEach(fields, function(cur){
          cur.classList.toggle('red-focus');
        });
        document.querySelector(domString.addBtn).classList.toggle('red');
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
    //4. update budget
    updateBudget();
    //5. update percentage
    updatePercentage();
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

 var updatePercentage = function() {
  //1. calculate percentage
  budgetCtrl.doCalculatePercentage();
  //2. Read percentage from the budget controller
  var percentages = budgetCtrl.doGetPercentage();
  //3. Update the UI with the new percentages
  UICtrl.displayPercentage(percentages);
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
    // 4. update percentages
    updatePercentage();
  }
};

var displayDate = function() {

  var now, month, year;

  months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];
  now = new Date();
  year = now.getFullYear();
  month = now.getMonth();
  document.querySelector(UICtrl.getDom().dateLabel).textContent = months[month] + ' ' + year;
}

return {
  init : function() {
    //Anthor key press event which has the same function as click
    document.addEventListener('keypress', function(event) {
        if(event.keyCode === 13) {
          addItem();

        }
    });

    document.querySelector(UICtrl.getDom().container).addEventListener('click', ctrlDeletion);

    document.querySelector(UICtrl.getDom().addBtn).addEventListener('click', function() {
      addItem();
    });

    document.querySelector(UICtrl.getDom().inputType).addEventListener('change', function() {
      UICtrl.changeColor();
    });

    displayDate();

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

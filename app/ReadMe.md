

# Modules:

1. Important aspect of any robust applications`s architecture

2. Keep the units of code for a project both cleanly separated 

   and organized

3. Encapsulate some data into privacy and expose other data publicly.



| UI MODULE                  | DATA MODULE                            | CONTROLLER MODULE |
| -------------------------- | -------------------------------------- | ----------------- |
| Get input values           | Add the new item to our data structure | Add event handler |
| Add the new item to the UI | Calculate budget                       |                   |
| Update the UI              |                                        |                   |
|                            |                                        |                   |

## TO-DO LIST:

1. Add event handler
2. Get input values
3. Add the new item to our data structure
4. Add the new item to the UI
5. Calculate budget
6. Update the UI

---------------------

# Module pattern

IIFE + Closure(*Inner function has access to the outer function even after it returns*)

```javascript
var budgetController = (function() {
    var x = 23;
    var add = function(a) {
        return x + a;
    }
    // Both the variable and function above cannot
    // be accessed from outside (private)
    
    return {
        publicTest: function(b) {
           return add(b);
        }
    }
    //The function above can be accessed through budgetController.publicTest(5);
    //(public)
})();

var uIController = (function() {
    //sample code
})();

var controller = (function(budgetCtrl, UICtrl) {
    
    var z = budgetCtrl.publicTest(5);
    
    return {
        anotherPublic : function() {
            console.log(z);
        }
    }
})(budgetController, uIcontroller);

/*
These three controllers are like class instantiation in java.
In the return{} block are the public methods.
*/
```

---------------------

##Key event Listener:

   ```javascript
document.addEventListener('keypress', function(event) {
    if(event.keyCode === 13 || event.which === 13) { //which is just for the old browsers
        console.log('Enter is pressed');
    }
  })
   ```

### prototype chain

```sequence
KeyboardEvent->UIEvent : normal line
UIEvent->Event : normal line
Event->Object : normal line
Note over KeyboardEvent : key : 'enter'
Note over KeyboardEvent : keyCode : 13
```



---------------------

# Get The Input

* html

  ```html
  <div class="add__container">
      <select class="add__type">
         <option value="inc" selected>+</option>
         <option value="exp">-</option>
      </select>
       <input type="text" class="add__description" placeholder="Add description">
       <input type="number" class="add__value" placeholder="Value">
       <button class="add__btn"><i class="ion-ios-checkmark-outline"></i></button>
   </div>
  ```

* JavaScript

  ```javascript
  var uIController = (function() { //class
      return {
        getInput : function() { //public function
            //The function should return an object and this object is just
            //like a form.
          return { //return block
            type : document.querySelector('.add__type').value,
            description : document.querySelector('.add__description').value,
            value : document.querySelector('.add__value').value
          }
        }
      }
  })();
  ```

  # Function Constructors to create lots of objects

  The ideal data structure to store the income and expenses is object. (Not map)

  Because the data will have an id, a description and a value.

  _It is always a good idea to have a data structure to hold everything instead of letting them float around_

  ```javascript
    var ExpenseObj = fucntion(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  
    var data = {
      allItems: {
        exp : [],
        inc : []
      },
      totals : {
        exp : 0,
        inc : 0
      }
    }
  ```

  # work flow

  * The input data from the browser is collected like a 'form'.
  * The budget controller use the data in the 'form' to create item
  * The item is stored in the data structure in budget controller

  ```sequence
  Browser->Controller : addItem()
  Controller->UIController : getInput()
  UIController->Controller : inputArg
  Note right Of Controller : inputArg: type,\n description, value
  Controller->BudgetController : doAddItem(inputArg)
  BudgetController->Controller : addedItem
  Note right of Controller : addedItem:id, \ndescription, value
  
  
  
  ```

  # DOM MANIPULATION

  * A technique for adding big chunks of HTML into the DOM

    Use  %% to surround the part you want to replace later

    ```javascript
    var htmlString = '<div class="item clearfix" id="%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    ```

  * How to replace parts of strings

  * How to do DOM manipulation using the insertAdjacentHTML

      ```javascript
        var newHtml = html.replace('%id%', obj.id);
      
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      
        //actually it has four optional parameters
      
        /*
      
        <!-- beforebegin -->
      
        <p>
      
      <!-- afterbegin -->
      
      foo
      
      <!-- beforeend -->
      
        </p>
      
        <!-- afterend -->
      
        */
      
      ```
      # Clear input fields

      How to clear html fields

      ```javascript
      //How to use querySelectorAll
      var fields = document.querySelectorAll(DOMStrings.inputDescription, + ', ' + DOMstrings.inputValue);
      
      //How to convert a list to an array
      fieldsArr = Arrays.prototype.slice.call(fields);
      
      // better way to loop over an array then for loops : //foreach. Its like the 'stream' in java
      fieldsArr.forEach(function(current, index, array) {
          current.value = ""; //current is the element
      });
      
      //focus on the first field of the array
      fieldsArr[0].focus();
      
      ```

      

      * How to convert field inputs to numbers

        Since the input is a string, we need to change it to number.

        But where to change it ? 

         	1. in budget calculation  [ ]
        	2. while getting input value [x] 

        ```javascript
        parseFloat(document.querySelector(domString.inputValue).value);
        //parseFloat("")  -> NaN
        
        if(input.description !== "" && isNaN(input.value) && input.value != 0) {
           //some code
        }
        ```

        

      * How to prevent false inputs

        1. empty string should not be added to the budget controller

        2. Not a number

        3. 0

           

      #  Calculate Budget

      * How and why to create simple, reusable functions with only one purpose

      * How to sum all elements of an array using the forEach method

        ```javascript
          //calculate the sum of a list.
          var calculateTotal = function(type) {
            var sum = 0;
            data.allItems[type].forEach(function(cur) {
              sum += cur.value;
            });
            data.totals[type] = sum;
          };
        ```

      * The calculated budget is stored in the data structure in Budget controller.

      * Use budgetController.getBudget() to get the budget which is an object.

        ``` java
            doGetBudget : function() {
              return {
                budget : data.budget,
                totalInc : data.totals['inc'],
                totalExp : data.totals['exp'],
                percentage : data.percentage
              }
            }
        ```

      * Use UIController.displayBudget(budget) to display the budget on the web page.

        * Put the elements in the budget to corresponding html fields.

          ``` javascript
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
          ```

          

      *  call UIController.displayBudget(budget) in init() function for initialization.

# Project Structure so far..

![Project structure_A](D:\GitHubRepository\JsWorld\app\Project structure_A.jpg)

## To do list

* Add event handler
* Delete the item from our data structure
* Delete the item to the UI
* Re-calculate budget
* Update the UI

## Event Delegation 

###                     Event Bubbling

* When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

* For instance, if we have a single handler `form.onclick`, then it can “catch” all clicks inside the form. No matter where the click happened, it bubbles up to `<form>` and runs the handler. 

  https://javascript.info/bubbling-and-capturing

  ### Usage

  1. When we have an element with lots of child elements that we are interested in.;
  2. When we want an event handler attached to an element that is not yet in the DOM when our page is loaded.

  

  * How to use Event delegation in practice

  * How to use IDs in HTML to connect the UI with the data model

  * How to use the parentNode property for DOM traversing.

    

    First of all , we need to add the event listener to the container element which contains both the income element and expense element.

    ``` html
    <div class="container clearfix">
                    <div class="income">
                        <h2 class="icome__title">Income</h2>
                        <div class="income__list">
                             income ...    
                        </div>
                    </div>
                    <div class="expenses">
                        <h2 class="expenses__title">Expenses</h2>
                        <div class="expenses__list">
                            expense ...
                        </div>
                    </div>
        
    ```

    

    add event listener in the init() function.

    ```javascript
    document.querySelector(UICtrl.getDom().container).addEventListener('onClick', ctrlDeletion);
    ```

    The actual ctrlDeletion function is like :

    ``` javascript
    var ctrlDeletion(event) {
      var itemID, splitID, type, id;
        //DOM traversing.
      itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
      if(itemID) {
        splidID = itemID.split('-');
        type = splitID[0];
        id = splitID[1];
    
        // 1. delete the item from the data structure  (budget controller)
        
        // 2.  delete the item from the UI   (UI controller)
    
        // 3.  update and show the new budget   (common function)
      }
    }
    ```



 * Another method to loop over an array: map

   The difference between map and for each is that map returns a brand new array.

   ``` javascript
   var ids = data.allItems[type].map(function(cur) {
           return cur.id;
         });
   ```

   

 * How to remove elements from an array using the splice method.

   ```javascript
         if(index != -1) {
           data.allItems[type].splice(index, 1); // "1" is number to delete start from index.
         }
   ```

* In javascript  , we can only delete an child, not an element.

  ```javascript
  var el = document.getElementById(id);
  el.parentNode.removeChild(el);
  ```

* When you select an DOM with name like : <div class="container clearfix">, you can use '.container'

  
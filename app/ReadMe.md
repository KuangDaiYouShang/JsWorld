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




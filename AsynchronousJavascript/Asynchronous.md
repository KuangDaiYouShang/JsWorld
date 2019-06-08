## Asynchronous

* Synchronous

  ``` javascript
  const second = () => {
      console.log('How are you doing?');
  }
  
  const first = () => {
      console.log('Hey there');
      second();
      console.log('The end');
  }
  
  first();
  ```

* Asynchronous

  * Allows asynchronous functions to run in the 'background'
  * We pass in callbacks that run once the function has finished its work
  * Move on immediately, non-blocking!

  ``` javascript
  const image = document.getElementByUd('img').src;
  function processLargeImage(image, callBack) {
      //some process
  };
  processLargeImage(image, () => {
     console.log('image processed'); 
  });
  ```

* Event Loop![EventLoop](D:\GitHubRepository\JsWorld\AsynchronousJavascript\EventLoop.jpg)

  Global -> each function will create a context. Asynchronous context created by setTimeout() is put into the WEB APIs.

  After the timer is gone, the callback function is put into the message queue.

* Callback hell

  ``` javascript
  function getRecipe() {
      setTimeout(() => {
          const receipeID = [523, 883, 432, 974];
          console.log(receipeID);
          
          setTimeout(id => {
              const receipe = {
                  title: 'Fresh tomato pasta', publisher: 'Jonas'};
              console.log(`${id} : ${receipe.title}`);
              }
          }, 1500, receipeID[2]);
      })
  }
  //setTimeout(callback, seconds, arg of callback)
  // We dont know the actuall process of setTimeOut function, we just defined the call back function
  ```


## Promise

​	To avoid the call back function, we use promise : 

 * Object that keeps tract about whether a certain event has happened or not.

 * Determines what happens after the event has happened.

 * Implements the concept of a future value that we are expecting.

   * Create promises

   ``` javascript
   const getIDs = new Promise((resolve, reject) => {
       //Asynchronous process
       setTimeout(() => {
           resolve([523, 883, 432, 974]);
       }, 1500);
   });
   
   const getRecipe = recID=> {
       return new Promise((resolve, reject) => {
           setTimeout(ID => {
               const receipe = {
                   title: 'Fresh tomato pasta', publisher:'Jonas'
               };
               resolve(`${ID} : ${receipe.title}`);
           }, 1500, recID); //recID is the argument ID. recID-> recID-> ID
       });
   };
   
   
   
   ```

   * Two ways of consuming the promise:

   ``` javascript
   //The argument of the callback function in the then is always the 
   //resolved value of the promise
   getIDs.then(IDs => { //IDs is the resolved value of getIDs
       console.log(IDs);
       return getRecipe(IDs[2]); //This will return a promise
   }).then(recipe => {
       console.log(recipe); //getRecipe resolves a string
   }).catch(error => {
      console.log('Error!');  
   });
   
   ```

   ``` javascript
   //Async key words
   async function getRecipesAW() {
       const IDs = await getIDs(); //await can only exist in async func
       console.log(IDs); //This is just a simulation so it works.
       const recipe = getRecipe(IDs[2]);
       //recipe is a pending promise before its done
       //its a string after its done(resolved)
       cosole.log(recipe);
       return recipe;
   }
   getRecipesAW().then(result => console.log(`${result} is the best ever!`));
   ```

## AJAX

* We want the app to get some data from the server without reloading the page.
* Asynchronous Javascript and XML
* API : a piece of code(software) allows another software to talk to each other

### JSON: JSON is a text-based data format  which is very similar to java script object, but JSON

### Is really just a single string and it can be easily converted to an object.

``` javascript
function getWeather(weatherID) {
    fetch(`https://crossorigin.me/https://metaweather.com/api/location/${weatherID}/`)
.then(result => {
    console.log(result);
    return result.json(); //This will work asynchronously
}).then(data => {
    console.log(data);
}).catch(error => console.log(error));

getWeather(2487956);
//what fetch(url) returns is a promise. 


//What if we use await
async function getWeather(weatherID) {
    try {
   const reuslt = await fetch(`https://crossorigin.me/https://metaweather.com/api/location/${weatherID}/`);
    const data = await result.json();
    return data;
    } catch (error){
     alert(error);   
	}
}

//if we want to get the data, we must use then !!!!
//because variable is defined before await is done, the data is a //promise.
let weather;
getWeather(2487956).then(res => {
    weather = res;
    console.log(weather);
})
```

#  The asynchronous function won`t proceed when an await is going on .

An `async` function can contain an [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) expression that pauses the execution of the async function and waits for the passed `Promise`'s resolution, and then resumes the `async`function's execution and returns the resolved value. 
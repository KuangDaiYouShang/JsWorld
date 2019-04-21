# Something you should care



* import js file in the html, do not use <script> coz it will lead to the js import before body is ready, and cause 

  "Cannot read property 'addEventListener' of null " 

  do: 

  ```html
  <link type="text/javascript" src="D:\GitHubRepository\JsWorld\DomManipulation\PigGame\app.js">
  ```

* The property in object should be separated by ' , ' 

* You should not use argument like 'in'

* single quotes with double quotes nested in it works!

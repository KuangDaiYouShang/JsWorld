Change one dice to two dices:

​	1.Both of the dices share the same class dice. But now they have unique id and we put new CSS style for id in style.css.

​	 #dice-1 {top:120px;}

​         #dice-2 {top:250px;}   (. is class style and # is id style)



2.input can have the attribute called "placeholder" which just shows some messages as the background in the input.

3.select with class can get a list:
var dicelist = document.querySelectorAll('.dice');
for(i=0; i < dicelist.length; i++) {
  dicelist[i].style.display = 'none';
}

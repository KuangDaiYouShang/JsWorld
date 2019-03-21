
// Differnt data types
var john = ['john', 'smith', 1998, 'teacher'];

john.push('blue'); //put an element in the end
john.unshift('Mr.'); //put an element at first
john.pop();//remove the last
john.shift();//remove the first

john.indexOf(1998);// if it doesn`t exit in the array , returns -1

var isDesigner = john.indexOf('designer') === -1 ? :
'john is not a designer' : 'john is a designer';

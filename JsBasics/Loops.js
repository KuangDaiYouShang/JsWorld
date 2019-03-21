 var john = ['john', 'Smith', 1990, 'designer'];

 for(var i = 0; i < john.length; i++) {
   if(typeof john[i] !== 'string') continue;
   console.log(john[i]);
 }

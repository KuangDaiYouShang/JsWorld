1. Every JavaScript object has a prototype property, which makes inheritance possible in JavaScript;
2. The prototype property of an object is where we put methods and properties that we want other objects to inherit.
3. The Constructor`s prototype property is NOT the prototype of the Constructor itself, its the prototype of ALL instances that are created through it.
4. When a certain method(or property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the objects`s prototype. This continues until the method is found : prototype chain.
5.prototype chain:
john
Person {name: "john", yearOfBirth: 1990, job: "teacher"}job: "teacher"name: "john"yearOfBirth: 1990
  __proto__: calculateAge: ƒ ()lastName: "Smith"constructor: ƒ (name, yearOfBirth, job)
    __proto__: constructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()

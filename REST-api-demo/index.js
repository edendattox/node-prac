// function calcProduct(num1, num2) {
//   return num1 * num2;
// }

// function calcSum(num1, num2) {
//   return num1 + num2;
// }

// function calculate(num1, num2, callbackFunction) {
//   return callbackFunction(num1, num2);
// }
// // alerts 75, the product of 5 and 15
// console.log(calculate(5, 15, calcProduct));
// // alerts 20, the sum of 5 and 15
// console.log(calculate(5, 15, calcSum));

// function sum(a) {
//   return (y) => {
//     return (z) => {
//       return (c) => {
//         return a + y + z + c;
//       };
//     };
//   };
// }

// let sum = function (a) {
//   return function (b) {
//     if (b) {
//       return sum(a + b);
//     }
//     return a;
//   };
// };

// let a = sum(1)(2)(3)(4)();

// console.log(a);

// function outest() {
//   let c = 20;

//   function outer(b) {
//     function inner() {
//       console.log(a, b, c);
//     }
//     let a = 10;
//     return inner;
//   }
//   return outer;
// }
// var close = outest()("helloworld")();
// console.log(close);

/**
 *  data hiding and encapsulation
 */

function Counter() {
  var count = 0;
  this.incrementCounter = function () {
    count++;
    console.log(count);
  };
  this.decrementCounter = function () {
    count--;
    console.log(count);
  };
}
var counter1 = new Counter();
console.log(counter1.incrementCounter());
console.log(counter1.decrementCounter());

var sum = function (...args) {
  return args.reduce((a,b) => a+b);
};

//console.log(sum(10,10,10));


Function.prototype.myBind = function(context) {
  return (...args) => this.apply(context,args);

};


class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}
const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");
// markov.says.myBind(breakfast, "meow", "Kush")()

var test = () => console.log("yo");
// test.myBind()
markov.says.myBind(breakfast)("meow", "a tree");



// Breakfast says meow to a tree!

function curriedSum(numArgs) {
  let numbers = [];
  let _curriedSum = (num) => {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return numbers.reduce((a,b) => a + b);
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;

}
//
// const sums = curriedSum(4);
// console.log(sums);
// //console.log(sums(1));
// console.log(sums(5)(30)(20)(1));

// Function.prototype.curry = function(numArgs) {
//   let numbers = [];
//   let _curry = (num) => {
//     numbers.push(num);
//     console.log(numbers)
//     if (numbers.length === numArgs) {
//       return this.call({}, numbers);
//     } else {
//       return _curry;
//     }
//   };
//   return _curry;
// };
//
// let add = function(nums) {
//   console.log(nums);
//   return nums.reduce((a,b) => a + b);
// };

Function.prototype.curry = function(numArgs) {
  let numbers = [];
  let _curry = (num) => {
    numbers.push(num);
    // console.log(numbers)
    if (numbers.length === numArgs) {
      return this(...numbers);
    } else {
      return _curry;
    }
  };
  return _curry;
};

let add = function(nums) {
  console.log(nums);
  return nums.reduce((a,b) => a + b);
};



let addition = sum.curry(3)
// console.log(add(s[5,3,2,4]))
console.log(addition(3))
console.log(addition(3))
console.log(addition(3))

console.log();

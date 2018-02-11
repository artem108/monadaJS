// var push = function (element, stack) {
//   var value = undefined;
//   var newStack = [element].concat(stack);
//
//   return { value: value, stack: newStack };
// };
//
// var pop = function (stack) {
//   var value = stack[0];
//   var newStack = stack.slice(1);
//
//   return { value: value, stack: newStack };
// };
//
// var stack0 = [];
//
// var result0 = push(4, stack0);
// var result1 = push(5, result0.stack);
// var result2 = pop(result1.stack); // {value: 5, stack: [4]}
// var result3 = pop(result2.stack);

const push = (element) => {
  return (stack) => {
    const value = undefined;
    const newStack = [element].concat(stack);

    return {
      value: value,
      stack: newStack
     };
  };
};

const pop = () => {
  return (stack) => {
    const value = stack[0];
    const newStack = stack.slice(1);

    return {
      value: value,
      stack: newStack
     };
  };
};

let stack0 = [];

  const result0 = push(4, stack0);
  const result1 = push(5, result0.stack);
  const result2 = pop(result1.stack);
  const result3 = pop(result2.stack);

const bind = (stackOperation, continuation) => {
  return (stack) => {
    const result = stackOperation(stack);
     return continuation(result.value)(result.stack);
  };
};

const result = (value) => {
  return (stack) => {
    return {
      value: value,
      stack: stack
    };
  };
};

var computation = bind(push(4), function () {
  return bind(push(5), () => {
    return bind(pop(), (result1) => {
      return bind(pop(), (result2) => {

        return result(result1 + " : " + result2);

      });
    });
  });
});

const finalResult = computation(stack0);

const runStack = (stackOperation, initialStack) => {
  return stackOperation(initialStack);
};

// Returns only the computed result.
const evalStack = (stackOperation, initialStack) => {
  return stackOperation(initialStack).value;
};

// Returns only the final state.
const execStack = (stackOperation, initialStack) => {
  return stackOperation(initialStack).stack;
};


console.log('runStack', runStack(computation, stack0));

console.log('evalStack', evalStack(computation, stack0));

console.log('execStack', execStack(computation, stack0));

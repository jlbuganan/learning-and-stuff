
// Function and method invocation
function foo1() {
  return this;
}
var goo1 = foo1;
var yoo1 = {
  a: foo1
};
var yoo2 = {
  a: foo1
};

test('function context is window', () => {
  expect(foo1()).toBe(window);
});

test('reference to function, context is still window', () => {
  expect(goo1()).toBe(window);
});

test('method invocation, function context is object', () => {
  expect(yoo1.a()).toBe(yoo1);
});

test('method invocation, function context is object', () => {
  expect(yoo2.a()).toBe(yoo2);
});

// Constructor invocation
function Wizard() {
  this.cast = function () { return this; };
}

var gandalf = new Wizard();
var saruman = new Wizard();
var dumbledore = Wizard(); // this is undefined. See - https://raganwald.com/2014/07/09/javascript-constructor-problem.html

describe('wizard: ', () => {
  test('function context of constructor invocation is gandalf', () => {
    expect(gandalf.cast()).toBe(gandalf);
  });

  test('function context of constructor invocation is saruman', () => {
    expect(saruman.cast()).toBe(saruman);
  });

  test('function context of constructor invoked without new is window', () => {
    expect(dumbledore).toBeUndefined();
  });
});

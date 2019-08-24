
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
  expect(foo1() === window);
});

test('reference to function, context is still window', () => {
  expect(goo1() === window);
});

test('method invocation, function context is object', () => {
  expect(yoo1.a() === yoo1);
});

test('method invocation, function context is object', () => {
  expect(yoo2.a() === yoo2);
});

// Constructor invocation
function Wizard() {
  this.cast = function () { return this; };
}

var gandalf = new Wizard();
var saruman = new Wizard();

test('function context of constructor invocation is gandalf', () => {
  expect(gandalf.cast() === gandalf);
});

test('function context of constructor invocation is saruman', () => {
  expect(saruman.cast() === saruman);
});

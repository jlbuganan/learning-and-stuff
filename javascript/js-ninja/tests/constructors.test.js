// https://raganwald.com/2014/07/09/javascript-constructor-problem.html

function Fubar (foo, bar) {
  this._foo = foo;
  this._bar = bar;
  this._this = function() { return this; };
}
var snafu = new Fubar("Greetings", "Planet");
Fubar.prototype.concatenated = function() {
  return `${this._foo} ${this._bar}`;
};

test('snafu should be an instance of Fubar', () => {
  expect(snafu instanceof Fubar).toBe(true);
  expect(snafu.concatenated()).toBe("Greetings Planet");
});

// Bad: fubar will be undefined, and 'this' gets set to the global environment so the properties _foo and _bar exist
var fubar = Fubar("Salutations", "Realm");
test('fubar is undefined??', () => {
  expect(fubar).toBeUndefined();
  expect(_foo).toEqual("Salutations");
  expect(_bar).toEqual("Realm");
  expect(_this()).toEqual(window);
});

// An attempt to fix the above problem with auto-instantiation
var fubar2 = Fubar2("Hello.", "is it me you're looking for?");
function Fubar2 (foo, bar) {
  "use strict";

  var obj, ret;

  if (this instanceof Fubar2) {
    this._foo2 = foo;
    this._bar2 = bar;
  } else {
    return new Fubar2(foo, bar);
  }
}
Fubar2.prototype.concatenated = function() {
  return `${this._foo2} ${this._bar2}`;
};

test('fubar2 should be instantiated correctly even without new', () => {
  expect(fubar2 instanceof Fubar2).toBeTruthy();
});


// Experimentation
function logsArguments (fn) {
  return function() {
    console.log.apply(this, arguments);
    return fn.apply(this, arguments);
  };
}

function sum2 (a, b) {
  return a + b;
}

var logsSum = logsArguments(sum2);
logsSum(2, 3);

var LoggingFubar2 = logsArguments(Fubar2);
var snafu2 = new LoggingFubar2("what", "the");
snafu2.concatenated();


// Fix the problem with overloading
function Fubar3 (foo, bar) {
  "use strict";

  if (this instanceof Fubar3) {
    this._foo3 = foo;
    this._bar3 = bar;
  } else {
    return arguments[0] instanceof Fubar3;
  }
}

var snafu3 = new Fubar3("Holy", "mother of god");

test('invoking Fubar3 without new should return true', () => {
  expect(Fubar3({})).toBeFalsy();
  expect(Fubar3(snafu3)).toBeTruthy();
});

// Throw an exception
function Fubar4 (foo, bar) {
  "use strict";

  if (!(this instanceof Fubar)) {
    throw new Error("Needs to be called with the 'new' keyword!");
  }

  this._foo4 = foo;
  this._bar4 = bar;
}

test('invoking Fubar4 without new should throw an exception', () => {
  expect(() => Fubar4("Who","did it")).toThrow(Error);
});
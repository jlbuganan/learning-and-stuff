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

// Bad: fubar will be undefined, and this gets set to the global environment so the properties _foo and _bar exist
var fubar = Fubar("Salutations", "Realm");
test('fubar should be undefined', () => {
  expect(fubar).toBeUndefined();
  expect(_foo).toEqual("Salutations");
  expect(_bar).toEqual("Realm");
  expect(_this()).toEqual(window);
});

// An attempt to fix the above problem
function Fubar2 (foo, bar) {
  "use strict";
  this._foo = foo;
  this._bar = bar;
}
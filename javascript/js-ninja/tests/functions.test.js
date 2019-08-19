function foo1() { return true; }
var foo2 = function() { return true; };
window.foo3 = function foo4() { return true; };
function outer() {
  function inner() { }
}

test('should prove things about the way functions are declared', () => {
  expect(typeof window.foo1 === 'function');
  expect(foo1.name).toBe('foo1');
  expect(typeof window.foo2 === 'function');
  expect(foo2.name).toBe('foo2');
  expect(foo3.name).toBe('foo4');
  expect(typeof window.outer === 'function');
  expect(typeof window.inner === undefined);
});
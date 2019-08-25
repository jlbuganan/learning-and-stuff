function foo1() {
  return this;
}
var foo2 = function() {
  return this;
};
global.foo3 = function foo4() {
  return true;
};
function outer() {
  var inner = function() {
    return this;
  };
  test("inner is a function when tested within outer's context", () => {
    expect(typeof inner).toBe("function");
    expect(inner()).toBe(global); // But.. why?
  });
}

test("should prove things about the way functions are declared", () => {
  expect(foo1()).toBe(global);
  expect(foo2()).toBe(global);
  expect(typeof global.foo1).toBe("undefined"); // Why doesn't it get attached to global?
  expect(foo1.name).toBe("foo1");
  expect(typeof global.foo3).toBe("function");
  expect(foo2.name).toBe("foo2");
  expect(foo3.name).toBe("foo4");
  expect(typeof outer).toBe("function");
  expect(typeof inner).toBe("undefined");
});

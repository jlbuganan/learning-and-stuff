// Variable scope
if (window) {
  var x = 42;
}

test('var within function scope should be accessible outside {} scope', () => {
  expect(x).toEqual(42);
});

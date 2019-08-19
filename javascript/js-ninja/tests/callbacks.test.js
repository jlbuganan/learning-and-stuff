const t = require('./../src/misc/test-functions');

test('useless function invokes callback', () => {
  expect(t.useless(function() { return 'domo arigato'; })).toMatch('domo arigato');
});

test('custom comparator sorts to descending ints', () => {
  let ints = [ 213, 16, 2058, 54 ];
  ints.sort(function(val1, val2) { return val2 - val1; });
  expect(ints).toEqual([ 2058, 213, 54, 16 ]);
});
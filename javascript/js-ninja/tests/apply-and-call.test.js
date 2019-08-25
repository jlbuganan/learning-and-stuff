function juggle() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  console.log(this.name);
  this.result = result;
}

var ninja1 = function() {};
var ninja2 = function() {};

juggle.apply(ninja1, [1, 2, 3, 4]);
juggle.call(ninja2, 3, 4, 5, 6);

test("juggle on ninja1 should produce a result of 10", () => {
  expect(ninja1.result).toEqual(10);
});

test("juggle on ninja2 should produce a result of 18", () => {
  expect(ninja2.result).toEqual(18);
});

function forEach(list, callback) {
  if (typeof callback === "function") {
    for (var i = 0; i < list.length; i++) {
      callback.call(list[i], i);
    }
  } else {
    throw new Error("must provide a callback function");
  }
}

var weapons = ["shuriken", "katana", "nunchaku"];

forEach(weapons, function(index) {
  test("test the function context", () => {
    expect(typeof this).toBe("object");
  });
});

test("should throw exception", () => {
  expect(() => forEach(weapons, {})).toThrow(Error);
});

function v() {
  return this;
}
test("outside", () => {
  expect(v()).toBe(global);
});

(function() {
  var t = function() {
    return this;
  };
  function u() {
    return this;
  }
  this.a = 42;

  test("inside", () => {
    expect(t()).toBe(global);
    expect(u()).toBe(global);
    expect(global.a).toEqual(42);
  });

  var majin = {
    boo: outer
  };

  test("should return 8", () => {
    expect(majin.boo(3, 5)).toEqual(8);
  });

  function outer(x, y) {
    // inner is attached to the function context
    this.inner = function(a) {
      return x + a;
    };
    // This is attached to the global context
    function whatisthis() {
      return this;
    }
    // This is attached to the function context
    this.whatisthis2 = function() {
      return this;
    };

    expect(whatisthis()).toBe(global);
    expect(this.whatisthis2()).toBe(majin);

    return this.inner(y);
  }
})();

(function() {
  "use strict";

  global.x = function() {
    return this;
  };
  var y = function() {
    return this;
  };

  test("use strict", () => {
    expect(global.x()).toBe(global);
    expect(y() === undefined);
  });
})();

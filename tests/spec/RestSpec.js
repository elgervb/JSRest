

describe("Rest test suite", function() {
  var rest = new Rest();
  
  it("Rest should contain a version", function() {
    expect(rest.version).not.toBe(null);
    expect(rest.version).not.toBe(undefined);
  });

  it("Should contain a version like: v1.0", function(){
	expect(rest.version).toMatch(/v[0-9]+\.[0-9]+/);
  });

});


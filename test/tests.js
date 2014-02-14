describe("ExtendableClass is just a suite", function () {
	it("in the global scope", function () {
		expect(window.ExtendableClass).toBeDefined();
		expect(typeof ExtendableClass).toMatch("function");
	});
	it("is Function", function () {
		expect(ExtendableClass instanceof Function).toBe(true);
	});
});

describe("ExtendableClass is a Function", function () {
	it("has a public static .extend method", function () {
		expect(typeof ExtendableClass.extend).toMatch("function");
	});
	describe ("The .extend method", function () {
		it("generates a new Function", function () {
			var GeneratedFunction = ExtendableClass.extend();

			expect(typeof GeneratedFunction).toMatch("function");
		});
	});
});

describe("ExtendableClass is a Class", function () {
	describe("generates a new Class", function () {
		var NewClass = ExtendableClass.extend();

		it("inherits from it", function () {
			expect(NewClass.extend).toBe(ExtendableClass.extend);
		});

		xit(".parents is an Array property with the parent classes", function () {
			expect(typeof NewClass.parents).toMatch("array");
			expect(NewClass.parents.length).toBe(1);
			expect(NewClass.parents[0]).toBe(ExtendableClass);
		});
	});
});

describe ("The generated Class of ExtendableClass", function () {
	var NewClass = ExtendableClass.extend();

	describe("instances an object", function () {
		var instancedObject = new NewClass();	it("is an instance of it", function () {
		expect(typeof instancedObject).toMatch("object");
			expect(instancedObject instanceof NewClass).toBe(true);
		});
		
		it("is also an instance from 'parent' classes (like ExtendableClass)", function () {
			expect(instancedObject instanceof ExtendableClass).toBe(true);
		});
	});
	
	describe("the descendant classes instances an Object", function () {
		var NewClass = ExtendableClass.extend();
		var NewClass1 = NewClass.extend();
		var NewClass2 = NewClass1.extend();
		var instancedObject = new NewClass2();

		it("is an instance of all of them", function () {
			expect(instancedObject instanceof NewClass2).toBe(true);
			expect(instancedObject instanceof NewClass1).toBe(true);
			expect(instancedObject instanceof NewClass).toBe(true);
			expect(instancedObject instanceof ExtendableClass).toBe(true);
		});
	});
});

(function() {
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 250;

	var htmlReporter = new jasmine.HtmlReporter();
	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	var currentWindowOnload = window.onload;
	window.onload = function() {
		if (currentWindowOnload) {
			currentWindowOnload();
		}

		// document.querySelector('.version').innerHTML = jasmineEnv.versionString();
		execJasmine();
	};

	function execJasmine() {
		jasmineEnv.execute();
	}
})();
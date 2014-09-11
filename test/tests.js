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

	it("has a public .parents that does not have references", function () {
		expect(ExtendableClass.parents instanceof Array).toBe(true);
		expect(ExtendableClass.parents.length).toBe(0);
	});
});

describe("ExtendableClass is a Class", function () {
	describe("generates a new Class", function () {
		var NewClass = ExtendableClass.extend();

		it("inherits from it", function () {
			expect(NewClass.extend).toBe(ExtendableClass.extend);
		});

		it(".parents is an Array property with the direct parent classes", function () {
			expect(NewClass.parents instanceof Array).toBe(true);
			expect(NewClass.parents).toEqual([ExtendableClass]);
		});
	});
});

describe ("The generated Class of ExtendableClass", function () {
	var NewClass = ExtendableClass.extend();

	describe("instances an object", function () {
		var instancedObject = new NewClass();

		it("is an instance of it", function () {
			expect(typeof instancedObject).toMatch("object");
			expect(instancedObject instanceof NewClass).toBe(true);
		});
		
		it("is also an instance from 'parent' classes (like ExtendableClass)", function () {
			expect(instancedObject instanceof ExtendableClass).toBe(true);
		});
	});

	describe("the descendant classes", function () {
		var NewClass1 = NewClass.extend();
		var NewClass2 = NewClass1.extend();
		it(".parents property defines from who they are inheriting directly", function () {
			expect(NewClass1.parents instanceof Array).toBe(true);
			expect(NewClass2.parents instanceof Array).toBe(true);

			expect(NewClass1.parents).toEqual([NewClass]);
			expect(NewClass2.parents).toEqual([NewClass1]);
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

describe("The method .addPublicMethod from ExtendableClass classes", function () {
	var NewClass = ExtendableClass.extend();

	var methodName = "myNewMethod";
	var randomNumber = Math.random();
	var method = function () {
		return randomNumber;
	};

	NewClass.addPublicMethod(methodName, method);

	it("adds a new public method to an object instance of the class", function () {
		expect(typeof NewClass.PublicClass.prototype[methodName]).toMatch("function");

		var newObject = new NewClass();

		expect( newObject[methodName]() ).toBe(randomNumber);
	});

	describe("In a descendant class, the added public method from a parent Class", function () {
		var NewClass2 = NewClass.extend();

		it("inherits the method", function () {
			expect(typeof NewClass2.PublicClass.prototype[methodName]).toMatch("function");

			var newObject2 = new NewClass2();

			expect( newObject2[methodName]() ).toBe(randomNumber);
		})
	});
});

describe("The method .addPublicProperty from a ExtendableClass class", function () {
	var randomNumber = Math.random();

	var NewClass = ExtendableClass.extend()
		.addPublicProperty("myProperty", randomNumber);

	it("adds a new public property to object instance of the class", function () {
		expect(NewClass.PublicClass.prototype.hasOwnProperty("myProperty")).toBe(true);
		expect(typeof NewClass.PublicClass.prototype.myProperty).toMatch("number");

		var newObject = new NewClass();

		expect(newObject.myProperty).toBe(randomNumber);
	});

	describe("In a descendant class, the added property in parent class", function () {
		var NewClass2 = NewClass.extend();
		it("inherits the property", function () {
			expect(NewClass.PublicClass.prototype.hasOwnProperty("myProperty")).toBe(true);
			expect(typeof NewClass.PublicClass.prototype.myProperty).toMatch("number");

			var newObject2 = new NewClass2();

			expect(newObject2.myProperty).toBe(randomNumber);
		})
	});
});

describe("The method .public from ExtendableClass classes", function () {
	var methodReturnValue1 = Math.random();
	var methodReturnValue2 = Math.random();
	var propertyValue1 = Math.random();
	var propertyValue2 = Math.random();

	var NewClass = ExtendableClass.extend()
		.public({
			method1: function () {
				return methodReturnValue1;
			},
			method2: function () {
				return methodReturnValue2;
			},
			myProperty1: propertyValue1,
			myProperty2: propertyValue2
		});

	it("adds several new public methods and properties to an object instance of the class", function () {
		expect(typeof NewClass.PublicClass.prototype.method1).toMatch("function");
		expect(typeof NewClass.PublicClass.prototype.method2).toMatch("function");
		expect(typeof NewClass.PublicClass.prototype.myProperty1).toMatch("number");
		expect(typeof NewClass.PublicClass.prototype.myProperty2).toMatch("number");

		var newObject = new NewClass();

		expect(newObject.method1()).toBe(methodReturnValue1);
		expect(newObject.method2()).toBe(methodReturnValue2);
		expect(newObject.myProperty1).toBe(propertyValue1);
		expect(newObject.myProperty2).toBe(propertyValue2);
	});

	describe("In a descendant class, properties and methods added to its parent class", function () {
		var NewClass2 = NewClass.extend();

		it("inherits them", function () {
			expect(typeof NewClass2.PublicClass.prototype.method1).toMatch("function");
			expect(typeof NewClass2.PublicClass.prototype.method2).toMatch("function");
			expect(typeof NewClass2.PublicClass.prototype.myProperty1).toMatch("number");
			expect(typeof NewClass2.PublicClass.prototype.myProperty2).toMatch("number");

			var newObject2 = new NewClass2();

			expect(newObject2.method1()).toBe(methodReturnValue1);
			expect(newObject2.method2()).toBe(methodReturnValue2);
			expect(newObject2.myProperty1).toBe(propertyValue1);
			expect(newObject2.myProperty2).toBe(propertyValue2);
		});
	});
});

describe("The method addProtectedMethod from a ExtendableClass", function () {
	var protectedMethodName = "protectedMethodName";
	var notAPublicValue = Math.random();

	var NewClass = ExtendableClass.extend()
		.addProtectedMethod(protectedMethodName, function () {
			return notAPublicValue;
		});

	it("adds a protected method that cannot be accessible from the public scope, only from the protected scope", function () {
		expect(NewClass.prototype[protectedMethodName]).toBeUndefined();
		expect(NewClass.PublicClass.prototype[protectedMethodName]).toBeUndefined();
		expect(typeof NewClass.ProtectedClass.prototype[protectedMethodName]).toBe("function");

		NewClass
			.addPublicMethod("testProtectedMethod", function () {
				expect( typeof this[protectedMethodName] ).toBe("function");
				expect( this[protectedMethodName]() ).toBe(notAPublicValue);
			});

		var newObject = new NewClass();

		expect(newObject[protectedMethodName]).toBeUndefined();

		newObject.testProtectedMethod();
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
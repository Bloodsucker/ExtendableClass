/*!
 * Author: José Cabo Carsí
 * 
 * ExtendableCLass JavaScript Library v0.1
 * https://github.com/Bloodsucker/ExtendableClass
 * 
 * Copyright 2013, 2014 josecabocarsi@gmail.com
 * Released under LGPLv3
 * http://www.gnu.org/copyleft/lesser.html
 */
(function (window) {
	"use strict";

	var ExtendableClass = function () {
	};
	window.ExtendableClass = ExtendableClass;

	ExtendableClass.addPublicMethod = function (publicProperty, publicMethod) {
		var Class = this;
		var overridedMethod = Class.PublicClass.prototype[publicProperty];

		var methodHandler;
		if(overridedMethod) {
			var superMethod = function () {
					// Assumes protected context
					var tmp = this.super;

					var returnedValue = overridedMethod.apply(this, arguments);
					this.super = tmp;

					return returnedValue;
			};
			methodHandler = function () {
				// Assumes protected context
				this.super = superMethod;
				return publicMethod.apply(this, arguments);
			};
		} else {
			methodHandler = function () {
				// Assumes protected context
				this.super = null;
				return publicMethod.apply(this, arguments);
			};
		}

		Class.PublicClass.prototype[publicProperty] = methodHandler;
		Class.ProtectedClass.prototype[publicProperty] = methodHandler;

		return Class;
	};

	ExtendableClass.addProtectedMethod = function (protectedProperty, protectedMethod) {
		var Class = this;
		var overridedMethod = Class.ProtectedClass.prototype[protectedProperty];

		var methodHandler;
		if(overridedMethod) {
			var superMethod = function () {
					// Assumes protected context
					var tmp = this.super;

					var returnedValue = overridedMethod.apply(this, arguments);
					this.super = tmp;

					return returnedValue;
			}
			methodHandler = function () {
				// Assumes protected context
				this.super = superMethod;
				return protectedMethod.apply(this, arguments);
			};
		} else {
			methodHandler = function () {
				// Assumes protected context
				this.super = null;

				return protectedMethod.apply(this, arguments);
			};
		}

		Class.ProtectedClass.prototype[protectedProperty] = methodHandler;

		return Class;
	};

	ExtendableClass.addPublicProperty = function (publicProperty, propertyValue) {
		var Class = this;

		Class.PublicClass.prototype[publicProperty] = propertyValue;
		Class.ProtectedClass.prototype[publicProperty] = propertyValue;

		return Class;
	};

	ExtendableClass.addProtectedProperty = function (protectedProperty, propertyValue) {
		var Class = this;

		Class.ProtectedClass.prototype[protectedProperty] = propertyValue;

		return Class;
	};

	ExtendableClass.public = function (publicObject) {
		var Class = this;
		for ( var publicProperty in publicObject ) {
			if ( typeof publicObject[publicProperty] == "function" ) {
				Class.addPublicMethod(publicProperty, publicObject[publicProperty]);
			} else {
				Class.addPublicProperty(publicProperty, publicObject[publicProperty]);
			}
		}

		return Class;
	};

	ExtendableClass.protected = function (protectedObject) {
		var Class = this;
		for ( var protectedProperty in protectedObject ) {
			if ( typeof protectedObject[protectedProperty] == "function" ) {
				Class.addProtectedMethod(protectedProperty, protectedObject[protectedProperty]);
			} else {
				Class.addProtectedProperty(protectedProperty, protectedObject[protectedProperty]);
			}
		}

		return Class;
	};

	ExtendableClass.initialize = function (constructorMethod) {
		var Class = this;

		if (Class.constructorMethod) {
			var overridedConstructorMethod = Class.constructorMethod;
			var superMethod = function () {
				// Assumes protected context
				var tmp = this.super;

				if (arguments.length === 0) overridedConstructorMethod.call(this);
				else overridedConstructorMethod.apply(this, arguments);

				this.super = tmp;
			};
			Class.constructorMethod = function () {
				// Assumes protected context
				this.super = superMethod;

				if (arguments.length === 0) constructorMethod.call(this);
				else constructorMethod.apply(this, arguments);
			};
		} else {
			Class.constructorMethod = function () {
				// Assumes protected context
				this.super = null;

				if (arguments.length === 0) constructorMethod.call(this);
				else constructorMethod.apply(this, arguments);
			};
		}

		return Class;
	};

	ExtendableClass.PublicClass = function () {};
	ExtendableClass.ProtectedClass = function () {};

	ExtendableClass.constructorMethod = null;

	ExtendableClass.parents = [];

	ExtendableClass.extend = function () {

		var MainContext = function () {
			var Class = this.Class;
			var publicThis = this;
			var protectedThis = Object.create( Class.ProtectedClass.prototype );

			var configPublicProperty = function (publicProperty, propertyValue, publicThis, protectedThis) {
				if ( typeof propertyValue == "function" ) {
					publicThis[publicProperty] = function () {
						if (arguments.length === 0) return protectedThis[publicProperty]();
						else return propertyValue.apply(protectedThis, arguments);
					}
				} else {
					var propertyDescriptor = {
						get: function () {
							return protectedThis[publicProperty];
						},
						set: function (newValue) {
							protectedThis[publicProperty] = newValue;
						}
					};

					Object.defineProperty(publicThis, publicProperty, propertyDescriptor);
				}
			};

			var publicClassPrototype = Class.PublicClass.prototype;
			for ( var publicProperty in publicClassPrototype ) {
				configPublicProperty(publicProperty, publicClassPrototype[publicProperty], publicThis, protectedThis);
			}

			if ( Class.constructorMethod ) {
				if (arguments.length === 0) Class.constructorMethod.call(protectedThis);
				else Class.constructorMethod.apply(protectedThis, arguments);
			}
		};

		// Copy all "static" methods and properties
		for (var p in this) {
			MainContext[p] = this[p];
		}

		MainContext.PublicClass = function () {};
		MainContext.ProtectedClass = function () {};
		MainContext.parents = [this];

		MainContext.prototype = Object.create(this.prototype);
		MainContext.prototype.Class = MainContext;

		MainContext.PublicClass.prototype = Object.create(this.PublicClass.prototype);
		MainContext.ProtectedClass.prototype = Object.create(this.ProtectedClass.prototype);

		MainContext.prototype.super = null;

		return MainContext;
	};
})(window);
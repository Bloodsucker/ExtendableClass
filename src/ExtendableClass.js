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
		var overridedMethod = this.prototype[publicProperty];

		var methodHandler;
		if(overridedMethod) {
			var superMethod = function () {
					var tmp = this.super;

					var returnedValue = overridedMethod.apply(this, arguments);
					this.super = tmp;

					return returnedValue;
			};
			methodHandler = function () {
				this.super = superMethod;
				return publicMethod.apply(this, arguments);
			};
		} else {
			methodHandler = function () {
				this.super = null;
				return publicMethod.apply(this, arguments);
			};
		}

		this.prototype[publicProperty] = methodHandler;
		this.ProtectedClass.prototype[publicProperty] = methodHandler;

		return this;
	};

	ExtendableClass.addProtectedMethod = function (protectedProperty, protectedMethod) {
		var overridedMethod = this.ProtectedClass.prototype[protectedProperty];

		var methodHandler;
		if(overridedMethod) {
			var superMethod = function () {
					var tmp = this.super;

					var returnedValue = overridedMethod.apply(this, arguments);
					this.super = tmp;

					return returnedValue;
			}
			methodHandler = function () {
				this.super = superMethod;
				return protectedMethod.apply(this, arguments);
			};
		} else {
			methodHandler = function () {
				this.super = null;

				return protectedMethod.apply(this, arguments);
			};
		}

		this.ProtectedClass.prototype[protectedProperty] = methodHandler;

		return this;
	};

	ExtendableClass.addPublicProperty = function (publicProperty, propertyValue) {
		this.prototype[publicProperty] = propertyValue;
		this.ProtectedClass.prototype[publicProperty] = propertyValue;

		return this;
	};

	ExtendableClass.addProtectedProperty = function (protectedProperty, propertyValue) {
		this.ProtectedClass.prototype[protectedProperty] = propertyValue;

		return this;
	};

	ExtendableClass.public = function (publicObject) {
		for ( var publicProperty in publicObject ) {
			if ( typeof(publicObject[publicProperty]) == "function" ) {
				this.addPublicMethod(publicProperty, publicObject[publicProperty]);
			} else {
				this.addPublicProperty(publicProperty, publicObject[publicProperty]);
			}
		}

		return this;
	};

	ExtendableClass.protected = function (protectedObject) {
		for ( var protectedProperty in protectedObject ) {
			if ( typeof(protectedObject[protectedProperty]) == "function" ) {
				this.addProtectedMethod(protectedProperty, protectedObject[protectedProperty]);
			} else {
				this.addProtectedProperty(protectedProperty, protectedObject[protectedProperty]);
			}
		}

		return this;
	};

	ExtendableClass.initialize = function (constructorMethod) {
		if (this.constructorMethod) {
			var overridedConstructorMethod = this.constructorMethod;
			var superMethod = function () {
				var tmp = this.super;

				var returnedValue = overridedConstructorMethod.apply(this, arguments);
				this.super = tmp;

				return returnedValue;
			};
			this.constructorMethod = function () {
				this.super = superMethod;
				constructorMethod.apply(this, arguments);
			};
		} else {
			this.constructorMethod = function () {
				this.super = null;
				constructorMethod.apply(this, arguments);
			};
		}

		return this;
	};

	ExtendableClass.ProtectedClass = function () {};

	ExtendableClass.constructorMethod = null;

	ExtendableClass.parents = [];

	ExtendableClass.extend = function () {
		this.PublicClass = function () {
			var publicThis = this;
			var protectedThis = new this.constructor.ProtectedClass();

			var configPublicProperty = function (publicProperty, propertyValue) {
				if (publicProperty == "constructor") return;

				if ( typeof(propertyValue) == "function" ) {
					publicThis[publicProperty] = propertyValue.bind(protectedThis);
				} else {
					var propertyDescriptor = {};

					propertyDescriptor.get = function () {
						return protectedThis[publicProperty];
					};
					propertyDescriptor.set = function (newValue) {
						protectedThis[publicProperty] = newValue;
					};

					Object.defineProperty(publicThis, publicProperty, propertyDescriptor);
				}
			};

			for ( var publicProperty in publicThis ) {
				configPublicProperty(publicProperty, publicThis[publicProperty]);
			}

			if ( this.constructor.constructorMethod )
				this.constructor.constructorMethod.apply(protectedThis, arguments);
		};

		for (var p in this) {
			this.PublicClass[p] = this[p];
		}

		this.PublicClass.PublicClass = null;
		this.PublicClass.ProtectedClass = function () {};
		this.PublicClass.parents = [this];

		this.PublicClass.prototype = Object.create(this.prototype);
		this.PublicClass.prototype.constructor = this.PublicClass;
		this.PublicClass.ProtectedClass.prototype = Object.create(this.ProtectedClass.prototype);
		this.PublicClass.ProtectedClass.prototype.constructor = this.PublicClass;

		this.ProtectedClass.prototype.super = null;

		return this.PublicClass;
	};
})(window);
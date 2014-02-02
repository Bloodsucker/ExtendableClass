(function (window) {
"use strict";

	var ExtendableClass = function () {
	};
	window.ExtendableClass = ExtendableClass;

	ExtendableClass.addPublicMethod = function (publicProperty, publicMethod) {
		var overridedMethod = this.prototype[publicProperty];

		var methodHandler = function () {
			this.super = function () {
				var tmp = this.super;

				var returnedValue = overridedMethod.apply(this, arguments);
				return returnedValue;
			};

			var returnedValue = publicMethod.apply(this, arguments);
			return returnedValue;
		}

		this.prototype[publicProperty] = methodHandler;
		this.ProtectedClass.prototype[publicProperty] = methodHandler;

		return this;
	}

	ExtendableClass.addProtectedMethod = function (protectedProperty, protectedMethod) {
		var overridedMethod = this.ProtectedClass.prototype[protectedProperty];

		var methodHandler = function () {
			this.super = function () {
				var tmp = this.super;

				var returnedValue = overridedMethod.apply(this, arguments);
				return returnedValue;
			};

			var returnedValue = protectedMethod.apply(this, arguments);
			return returnedValue;
		}

		this.ProtectedClass.prototype[protectedProperty] = methodHandler;

		return this;
	}

	ExtendableClass.addPublicProperty = function (publicProperty, propertyValue) {
		this.prototype[publicProperty] = propertyValue;
		this.ProtectedClass.prototype[publicProperty] = propertyValue;
		this.DataClass.prototype[publicProperty] = propertyValue;

		return this;
	}

	ExtendableClass.addProtectedProperty = function (protectedProperty, propertyValue) {
		this.ProtectedClass.prototype[protectedProperty] = propertyValue;
		this.DataClass.prototype[protectedProperty] = propertyValue;

		return this;
	}

	ExtendableClass.public = function (publicObject) {
		for ( var publicProperty in publicObject ) {
			if ( typeof(publicObject[publicProperty]) == "function" ) {
				this.addPublicMethod(publicProperty, publicObject[publicProperty]);
			} else {
				this.addPublicProperty(publicProperty, publicObject[publicProperty]);
			}
		}

		return this;
	}

	ExtendableClass.protected = function (protectedObject) {
		for ( var protectedProperty in protectedObject ) {
			if ( typeof(protectedObject[protectedProperty]) == "function" ) {
				this.addProtectedMethod(protectedProperty, protectedObject[protectedProperty]);
			} else {
				this.addProtectedProperty(protectedProperty, protectedObject[protectedProperty]);
			}
		}

		return this;
	}

	ExtendableClass.ProtectedClass = function () {};
	ExtendableClass.DataClass = function () {};

	ExtendableClass.extend = function () {
		this.PublicClass = function () {
			var publicThis = this;
			var protectedThis = new this.constructor.ProtectedClass();
			var dataThis = new this.constructor.DataClass();

			var configPublicProperty = function (publicProperty, propertyValue) {
				if (publicProperty == "constructor") return;

				if ( typeof(propertyValue) == "function" ) {
					publicThis[publicProperty] = propertyValue.bind(protectedThis);
				} else {
					Object.defineProperty(publicThis, publicProperty, {
						get: function () {
							return dataThis[publicProperty];
						},
						set: function (newValue) {
							dataThis[publicProperty] = newValue;
						}
					});
				}
			}

			var configProtectedProperty = function (protectedProperty, propertyValue) {
				if (protectedProperty == "constructor") return;
				if (protectedProperty == "super") return;

				if (typeof(propertyValue) != "function") {
					Object.defineProperty(protectedThis, protectedProperty, {
						get: function () {
							return dataThis[protectedProperty];
						},
						set: function (newValue) {
							dataThis[protectedProperty] = newValue;
						}
					});
				}
			}

			for ( var publicProperty in publicThis ) {
				configPublicProperty(publicProperty, publicThis[publicProperty]);
			}

			for (var protectedProperty in protectedThis) {
				configProtectedProperty(protectedProperty, protectedThis[protectedProperty]);
			}
		};

		this.PublicClass.ProtectedClass = function () {};
		this.PublicClass.DataClass = function () {};

		this.PublicClass.prototype = Object.create(this.prototype);
		this.PublicClass.prototype.constructor = this.PublicClass;
		this.PublicClass.ProtectedClass.prototype = Object.create(this.ProtectedClass.prototype);
		this.PublicClass.ProtectedClass.prototype.constructor = this.PublicClass;
		this.PublicClass.DataClass.prototype = Object.create(this.DataClass.prototype);
		this.PublicClass.DataClass.prototype.constructor = this.PublicClass;

		this.ProtectedClass.prototype.super = null;

		this.PublicClass.extend = this.extend;
		this.PublicClass.addPublicMethod = this.addPublicMethod
		this.PublicClass.addProtectedMethod = this.addProtectedMethod;
		this.PublicClass.addPublicProperty = this.addPublicProperty;
		this.PublicClass.addProtectedProperty = this.addProtectedProperty;
		this.PublicClass.public = this.public;
		this.PublicClass.protected = this.protected;

		return this.PublicClass;
	}
})(window);
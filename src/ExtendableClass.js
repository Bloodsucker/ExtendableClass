(function (window) {
"use strict";

	var ExtendableClass = function () {
	};
	window.ExtendableClass = ExtendableClass;

	ExtendableClass.addPublicMethod = function (publicProperty, publicMethod) {
		var overridedMethod = this.prototype[publicProperty];

		var methodHandler = function (...methodArgs) {
			this.super = function (...superArgs) {
				var tmp = this.super;

				var returnedValue = overridedMethod.apply(this, superArgs);
				return returnedValue;
			};

			var returnedValue = publicMethod.apply(this, methodArgs);
			return returnedValue;
		}
		this.prototype[publicProperty] = methodHandler;
		this.PrivateClass.prototype[publicProperty] = methodHandler;

		return this;
	}
	ExtendableClass.addPublicProperty = function (publicProperty, propertyValue) {
		this.prototype[publicProperty] = propertyValue;
		this.PrivateClass.prototype[publicProperty] = propertyValue;
		this.DataClass.prototype[publicProperty] = propertyValue;

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

	ExtendableClass.extend = function () {
		var publicPrototype = Object.create(this.prototype);
		var privatePrototype = Object.create(this.prototype);
		var dataPrototype = Object.create(this.prototype);

		var PublicClass = function () {
			var publicThis = this;
			var privateThis = new this.constructor.PrivateClass();
			var dataThis = new this.constructor.DataClass();

			for ( var publicProperty in publicThis ) {
				(function (publicProperty, propertyValue) {
					if (publicProperty == "constructor") return;

					if ( typeof(propertyValue) == "function" ) {
						publicThis[publicProperty] = propertyValue.bind(privateThis);
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
				})(publicProperty, publicThis[publicProperty]);
			}

			for (var privateProperty in privateThis) {
				(function (privateProperty, propertyValue) {
					if (privateProperty == "constructor") return;

					if (typeof(propertyValue) == "function") {
						//
					} else {
						Object.defineProperty(privateThis, privateProperty, {
							get: function () {
								return dataThis[privateProperty];
							},
							set: function (newValue) {
								dataThis[privateProperty] = newValue;
							}
						});
					}
				})(privateProperty, privateThis[privateProperty]);
			}
		};
		var PrivateClass = function () {};
		var DataClass = function () {};

		PublicClass.PrivateClass = PrivateClass;
		PublicClass.DataClass = DataClass;

		PublicClass.prototype = publicPrototype;
		PublicClass.prototype.constructor = PublicClass;
		PrivateClass.prototype = privatePrototype;
		PrivateClass.prototype.constructor = PublicClass;
		DataClass.prototype = dataPrototype;
		DataClass.prototype.constructor = PublicClass;

		PublicClass.extend = this.extend;
		PublicClass.addPublicMethod = this.addPublicMethod
		PublicClass.addPublicProperty = this.addPublicProperty;
		PublicClass.public = this.public;

		return PublicClass;
	}
})(window);
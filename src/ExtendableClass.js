define(function () {
	var ExtendableClass = function () {
		this._super = null;
	};

	//Public static method
	ExtendableClass.extend = function (extendObject) {
		this._extending = true;
		var newPrototype = new this();
		this._extending = false;

		for (prop in extendObject) {
			//If prop is overwriting a function
			if ( typeof(newPrototype[prop]) == "function" ) {
				newPrototype[prop] = (function (fnName, oldfn) {
					
					/* We don't already execute our method
					 * it will be executed after its super (overrided method) it's prepared for the execution.
					 */
					return function () {
						this._super = function () {
							var tmp = this._super;
							this._super = null;

							var ret = oldfn.apply(this, arguments);

							this._super = tmp;
							return ret;
						}

						//Then Our method is executed.
						var ret = extendObject[fnName].apply(this, arguments);

						//We don't need super (overrided method) access for now.
						this._super = null;

						//We return method data if there was.
						return ret;
					}
				})(prop, newPrototype[prop]);
			} else {
				newPrototype[prop] = extendObject[prop];
			}
		}

		var newClass = function () {
			if (this.constructor._extending && this.initialize) {
				this.initialize.apply(this, arguments);
			}
		};

		newClass.prototype = newPrototype;
		newClass.prototype.constructor = newClass; //?

		newClass.extend = this.extend;

		return newClass;
	}

	return ExtendableClass;
});
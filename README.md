ExtendableClass javascript library
==================================
ExtendableClass is a library that adds to the javascript language Object Oriented features such as public and protected methods and properties and also make it work with real inheritance.

Nowadays, ExtendableClass has tested support for:
 - Constructor.
 - Public methods and properties.
 - Protected methods and properties.
 - Simple class inheritance, which is compatible with the previous features!

Is it usable?
-------------
Yes, it works.

ExtendableClass is a library that forces to javascript to have features which by default are not possible. It hacks javascript a little bit, thus it requires some extra process to achieve it, however it was built with the optimization in mind.

This question can be compared with the question of using jQuery in your own projects. If you like to use jQuery, why would not like you to use ExtendableClass in your projects in order to get this OO features as well?

Dependencies
------------
It does not have any dependence. It is pure javascript so it is compatible with any other library. Nevertheless, it uses a global variable called ExtendableClass which is the base-class Class for every class in order to get the library features.

Installation
------------
Just include the ExtendableClass javascript library file in your HTML document as you usually do with other libraries.

```html
<script type="text/javascript" src="ExtendableClass.js" ></script>
```

How to use it
-------------
1. Creating a new simple class:

	```javascript
	var Animal = ExtendableClass.extend(); //It inherits from ExtendableClass base-class.
	```
	
	A simple Animal class.

2. Adding new public methods or properties:

	```javascript
	Animal
		.public({
			animalSound: "",
			animalSays: function () {
				return this.animalSound;
			}
		});
	```
	
	An Animal can reproduce its sound through its new method animalSays.

3. Adding new protected methods or properties and inheriting from a class:

	```javascript
	var Dog = Animal.extend()
		.protected({
			updateSound: function (newSound) {
				this.animalSound = newSound; //Accessing to a public property from the private context.
			}
		});
	```
	
	And in the third tick, a Dog class was created. However not everyone can change its sound.
	
4. Defining a class constructor:

	```javascript
	Dog
		.initialize(function (dogSound) {
			// Only from a private context one can have access to a protected method/property.
			this.updateSound( dogSound ); //Protected method
		});
	```
	
	So, in order to personalize the Dog sound, it allows to initialize the sound at the beginning.

5. Instantiating a new class into an object:

	```javascript
	var barney = new Dog( 'wau wau!' );
	console.log( barney.animalSays() ); //It prints 'wau wau!'
	```
	
	A dog called barney was born... and he likes to say "wau wau!" to everyone.

## ExtendableClass API Quick Referece
 - The _AClass_ variable defines a descendant class of the ExtendableClass class.
 - The _AnObject_ variable desfines an instantiated object from an ExtendableClass descendant class.

#### _AClass.extend()_
Every class should extend from ExtendableClass which is the base class for every class with support for this library. Applied to an existing class, it creates a new class which inherits from the applied class.

 * Arguments: none.
 * Returns: The new descendat class of AClass.

```javascript
var NewClass = ExtendableClass.extend();
```

#### _AClass.addPublicMethod(methodName, method)_
Creates a new public method in the class AClass.
 * Arguments:
    1. _methodName_ {string} The name of the new method.
    2. _method_ {function} The function method or callback to be executed when method is going to be executed.
 * Returns: The AClass class.

 ```javascript
 var NewClass = ExtendableClass.extend();
 ```

#### _AClass.addPublicProperty(propertyName, propertyValue)_
Creates a new public public property in the class AClass.
 * Arguments:
    1. _propertyName_ {string} The name of the new property
    2. _method_ {*} The value for the new property
 * Returns: The AClass class.

 ```javascript
 var NewClass = ExtendableClass.extend()
 	.addPublicProperty( "propertyName", "I am a property value" );
 ```

#### _AClass.addProtectedMethod(methodName, method)_
Creates a new protected method in the class AClass.
 * Arguments:
    1. _methodName_ {string} The name of the new method.
    2. _method_ {function} The function method or callback to be executed when method is going to be executed.
 * Returns: The AClass class.

 ```javascript
 var NewClass = ExtendableClass.extend()
 	.addProtectedMethod( "methodName", function () {
 		return "a return value";
 	});
 ```

#### _AClass.addProtectedProperty(propertyName, propertyValue)_
Creates a new protected public property in the class AClass.
 * Arguments:
    1. _propertyName_ {string} The name of the new property
    2. _method_ {*} The value for the new property
 * Returns: The AClass class.

 ```javascript
 var NewClass = ExtendableClass.extend()
 	.addProtectedProperty( "propertyName", "I am a property value");
 ```

#### _AClass.public( publicMethodsAndProperties )_
It creates a set of public methods and public properties in the AClass class.
 * Arguments:
 	1. _publicMethodsAndProperties_ {object{[_ methodOrPropertyName_ : _methodOrPropValue_ ]}} An object where keys defines the name of the property and the key value represents the method callback or property
 * Returns: The AClass class.

 ```javascript
 var NewClass = ExtendableClass.extend()
 	.public({
 		aProperty: "A property value",
 		anotherProp: 5,
 		aMethod: funtion () {
 			return this.aProperty;
 		}
 	});
 ```

#### _AClass.protected( protectedMethodsAndProperties )_
It creates a set of protected methods and protected properties in the AClass class.
 * Arguments:
 	1. _protectedMethodsAndProperties_ {object{[ _methodOrPropertyName_ : _methodOrPropValue_ ]}} An object where keys defines the name of the property to be created and the key value represents the method callback or property value for them.
 * Returns: The AClass class.

 ```javascript
 var NewClass = ExtendableClass.extend()
 	.protected({
 		aProperty: "A property value",
 		anotherProp: 5,
 		aMethod: funtion () {
 			return this.aProperty;
 		}
 	});
 ```

Hey!
----
Do you want to use it in your project or have any comment? I will be so glad to hear it so, please, [let me know](#contacts-credits-and-license).

Contact, credit and license
---------------------------
Released under [LGPLv3]

Basically you can use it *wherever you want* but keeping any code modification with the same license or compatible. Please, do not forget about credits :smiley:

Copyright 2014 - [José Cabo Carsí] - josecabocarsi@gmail.com

[LGPLv3]:http://www.gnu.org/copyleft/lesser.html
[José Cabo Carsí]:https://github.com/Bloodsucker
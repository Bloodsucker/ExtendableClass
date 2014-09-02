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
	console.log( barney.animalSays() ); //It print return 'wau wau!'
	```
	
	A dog caled barney was born... and he likes to say "wau wau!" to everyone.

Hey!
----
Do you want to use it in your project or have any comment? I will be so glad to hear it so, please, [let me know](#contacts-credits-and-license).

Contact, credit and license
-------
Released under [LGPLv3]

Basically you can use it *wherever you want* but keeping any code modification with the same license or compatible. Please, do not forget about credits :smiley:

Copyright 2014 - [José Cabo Carsí] - josecabocarsi@gmail.com

[LGPLv3]:http://www.gnu.org/copyleft/lesser.html
[José Cabo Carsí]:https://github.com/Bloodsucker
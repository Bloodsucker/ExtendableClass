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
    var SimpleNewClass = ExtendableClass.extend();
    var myNewObject = new SimpleNewClass();
    ```

2. Adding new public methods or properties:

    ```javascript
    var SimpleNewClass = ExtendableClass.extend()
        .public({
            aProperty: 5,
            
            myMethod: function () {
                return this.aProperty; //Accessing to public property with value: 5
            }
        });
    
    var myNewObject = new SimpleNewClass();
    console.log( myNewObject.myMethod() ); //5
    ```

3. Adding new protected methods or properties:

    ```javascript
    var SimpleNewClass = ExtendableClass.extend()
        .public({
            aProperty: 5,
            
            myMethod: function () {
                this.myProtectedMethod(); //Access to a protected method.
                return this.aProtectedProp; //This time, it access to the protected property.
            }
        })
        .protected({ //Creates protected methods and properties at once.
            aProtectedProp: 10,
            
            myProtectedMethod: function () {
                this.aProtectedProp += this.aProperty; //It can access to a protected property and to a public one!
            }
        });
    
    var myNewObject = new SimpleNewClass();
    console.log( myNewObject.myMethod() ); //15 (aProperty (5) + aProtectedProp (10))
    ```

Hey!
----
Do you want to use it in your project or you have any comment? I will be so glad to hear it so please, [let me know]

Credits and license
-------
> [José Cabo Carsí]
> [ExtendableClass JavaScript Library]
>
> Released under [LGPLv3]
>
> Basically you can use it wherever you want but keeping any code modification with the same license or compatible.
>
> Copyright 2014 - [josecabocarsi@gmail.com]

[ExtendableClass JavaScript Library]:https://github.com/Bloodsucker/ExtendableClass
[LGPLv3]:http://www.gnu.org/copyleft/lesser.html
[José Cabo Carsí]:https://github.com/Bloodsucker
[josecabocarsi@gmail.com]:josecabocarsi@gmail.com
[let me know]:josecabocarsi@gmail.com
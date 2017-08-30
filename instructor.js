function Foo(name) {
    this.name = name;
    this.sayName = function () {
        console.log(this.name + "!");
    }
}
Foo.prototype.myname = function () {
    return this.name;
}
// Object.setPrototypeOf()
// Foo.prototype.isPrototypeOF( a )
var myFoo = Object.create(Foo.prototype);


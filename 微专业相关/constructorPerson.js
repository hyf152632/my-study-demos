/*构造函数Person用于构造人，语法如下：
function Person(name, age) {
    // 函数体
}
使用范例如下：
var jerry = new Person("Jerry", 2);
jerry.introduce(); 返回值： "I am Jerry, I am 2 years old! "
var tom = new Person("Tom", 12);
tom.introduce(); 返回值： "I am Tom, I am 12 years old! "
*/

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.introduce = function () {
        return "I am " + name + ", I am " + age + " years old! ";
    }
}

var tom = new Person("Tom", 12);
console.log(tom.introduce());

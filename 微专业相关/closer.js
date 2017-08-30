//将observeList 封装在 observer中；
var observer = (
    function () {
        var observerList = [];
        return {
            add: function (obj) {
                observerList.push(obj);
            },
            empty: function () {
                observerList = [];
            },
            getCount: function () {
                return observerList.length;
            },
            get: function () {
                return observerList;
            }
        };
    }
)();

function ClassName() {
    var _property = "";
    this.getProperty = function () {
        return _property;
    };
}

function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function dosomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join("!"));
    }
    return {
        dosomething: dosomething,
        doAnother: doAnother
    };
}
var foo = CoolModule();
foo.dosomething();
foo.doAnother();

//定时器中的回调函数需要使用闭包
for (var i = 1; i <= 5; i++) {
    (
        function (j) {
            setTimeout(function timer() {
                console.log(j);
            }, j * 1000);
        }
    )(i);
}

//或者
for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
}

//箭头函数改变this的指向
var obj = {
    count: 0,
    cool: function coolFn() {
        if (this.count < 1) {
            setTimeout(() => {
                this.count++;
                console.log("awesome?");
            }, 100);
        }
    }
};

function foo1() {
    "use strict";       //严格模式，全局变量无法使用this的默认绑定，会返回undefind
    console.log(this.a);
}
var a = 2;
foo1();

//对象属性引用链中只有最顶层或者说最后一层会影响调用位置
function foo3() {
    console.log(this.a);
}

var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo3();    //42

//隐式丢失
function foo4() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo;  //函数别名，发生隐式丢失！

var a = "oops,global";
bar();  //"oops,global";


// 闭包造成的无益共享
var result = [];
for (var i = 0; i < 5; i++) {
    result.push(function () { return i; });
}
console.log(result[1]());   //5
console.log(result[3]());     //5
//首先循环执行完毕，此时i的值等于5.并且return的i是最后一个i.而且是共享的这个i.

var result = [];
for (var i = 0; i < 5; i++) {
    result.push(i);
}
console.log(result);

//解决方案：保存每个i的值，并且传入function
//1:
var result = [];
for (var i = 0; i < 5; i++) {
    result.push((function (j) { return j; })(i));
}
console.log(result);

//2：
var result = [];
for (var i = 0; i < 5; i++) {
    (function () {
        var i2 = i;
        result.push(i2);
    })();
}
console.log(result);      //因为function是iife，所以结果正常。如果不是iife，他会共享参数。

//3:
var result = [];
for (var i = 0; i < 5; i++) {
    (function () {
        var i2 = i;
        result.push(function () { return i2 });
    })();
}
console.log(result[1]());

var jane = {
    name: 'jane',
    describe: function () {
        return 'person name: ' + this.name;
    }
}
console.log(jane.describe());

name = "haha";
var func = jane.describe;       //隐形丢失
console.log(func());    //"haha"    也就是在非严格模式下，直接从对象提取一个方法，它会作用
//于全局对象。
//在严格模式下，会返回TypeError
//解决方法：使用bind()方法
/*var func = jane.describe.bind(jane);
console.log(func());*/

//foreach遍历数组
var jane = {
    name: 'jane',
    friends: ['Tarzan', 'Cheeta'],
    logHiToFriends: function () {
        'use strict';
        this.friends.forEach(function (friend) {
            console.log(this.name + 'says hi to' + friend);
        });
    }
}
console.log(jane.logHiToFriends());     //typeError:this.name is undefinded.

//解决方法1：    var self = this;
var jane = {
    name: 'jane',
    friends: ['Tarzan', 'Cheeta'],
    logHiToFriends: function () {
        'use strict';
        var self = this;
        this.friends.forEach(function (friend) {
            console.log(self.name + 'says hi to' + friend);
        });
    }
}
console.log(jane.logHiToFriends());

//解决方法2： 利用foreach的第二个参数thisArg
var jane = {
    name: 'jane',
    friends: ['Tarzan', 'Cheeta'],
    logHiToFriends: function () {
        'use strict';
        this.friends.forEach(function (friend) {
            console.log(this.name + 'says hi to' + friend)
        }, this);
    }
}
console.log(jane.logHiToFriends());

var isTrue = /[1-9]/.test('123');
console.log(isTrue);

var toReplace = '<a> <bbb>'.replace(/<(.*?)>/g, '[$1]');
console.log(toReplace);         //[a] [bbb]

//分号的使用,以块结尾的语句后面不需要分号
//for;while;(不包括do-while)
//if;swith,try
//函数声明语句


//如何避免使用with
with (foo.bar.baz) {
    // ...
}
//用一个临时变量代替
var b = foo.bar.baz;
b.first;
b.last;
//如果你不想在当前的作用域引入临时变量，可以使用iife
(function () {
    var b = foo.bar.baz;
    console.log(b.first + b.last);
}());
//也可以把IIFE要访问的参数作为一个选项传入IIFE
(function (b) {
    console.log(b.first + b.last);
}(foo.bar.baz));

//debugger语句；
/*debugger;*/
//如果执行到了一个debugger语句，这个语句会报一个断点；如果执行不到，不会发生任何事情；

/*Error构造器
EvalError
RangeError      //new Array(-1)
ReferenceError
SyntaxError
TypeError
URIError
*/

var i = Math.max.apply(null, [1, 2, 6, 9]);
console.log(i);

//bind()
/*function add(x,y) {
    return x + y;
}
var plus1 = add.bind(null,1);
console.log(plus1(5));
// = 
function plus1(y) {
    return add(1,y);
}*/

Object.freeze();

//实现new
function newOperator(Constr, args) {
    var thisValue = Object.create(Constr.prototype);
    var result = Constr.apply(thisValue, args);
    if (typeof result === 'object' && result !== null) {
        return result;
    }
    return thisValue;
}







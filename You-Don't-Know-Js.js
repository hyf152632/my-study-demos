
/* c;
console.log(c);//ReferenceError
//也就是说：当我们希望有一个c的时候，但是没有通过var c;声明c,那么它就是未声明
d = 1;
console.log(d); //非严格模式，在全局创建一个d,并且赋值
//这个时候，与前一个相比，同样是非法的，但是，同时我们给这个未声明的d赋值，也就是，说
//它是一个LHS，那么这个时候也许是引擎怕引起，1这个状态丢失，所以自动创建了一个d,并且
//赋值1; */

//eval()欺骗词法作用域
function foo(str, a) {
    eval(str);
    console.log(a, b);
}
var b = 2;
foo("var b = 3;", 1);

function foo(str) {
    "use strict";
    eval(str);
    // console.log( a);    //referenceError
}
foo("var a = 2");

var a = 2;
function foo1() {
    var a = 1;
    console.log(a);
}
foo1();
console.log(global);
/* {
    var j;
    for(j=0; j<10; j++){
        let i;
        i =j;
        setTimeout(function() {
            console.log(i);
        }, 1000);
        
    }
}
 */
/* var foo = true,baz =10;
if(foo) {
    let bar =3;
}
if(baz>bar){
    console.log('yach');
}
 */
/* foo();
var a =true;
if(a){
    function foo(){
        console.log('a');
    }
}else{
    function foo(){
        console.log('b');
    }
    var b = 0;
}

console.log(b);
 */

/*  function foo(){
     var a=2;
     function bar() {
         console.log(a);
     }
        return bar;
 }
    var baz = foo();
    baz(); */

/*     for(var i=1; i<=5; i++){
        setTimeout(function() {
            console.log(i);
        }, 100);
    }
 */
/* var a={
    name:'a',
    showName:function(){
        return this.name
    }
};
var k ={
    name:'k'
};
(function cluse (b) {
    var c = b.apply(k,null);
    console.log(c);
})(a.showName);
 */
/* for(var i=1; i<=5; i++) {
    
    (function() {
        var j = i;
        setTimeout(function timer() {
            console.log(j);
        }, j*1000);
    })();
}
 */
/*  //模块
function CoolModule() {
    var something = 'cool';
    var another = [1,2,3];
    function doSomething() {
        console.log( something);
    }
    function doAnother() {
        console.log( another.join("!"));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}
var foo = CoolModule();     //必须的外部的封闭函数，且必须被调用一次
foo.doSomething();       //必须返回至少一个内部函数
 */

/* //模块也是普通的函数，因此可以接受参数
function CoolModule(id) {
    function identify() {
        console.log( id );
    }
    return {
        identify: identify
    };
}
var foo1 = CoolModule( 'foo 1');
var foo2 = CoolModule( 'foo 2');
foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"
 */

/*  var foo = (function CoolModule(id) {
     function change() {
         //修改公共API
         publicAPI.identify = identify2;
     }
    function identify1() {
        console.log( id );
    }
    function identify2() {
        console.log( id.toUpperCase());
    }
    var publicAPI = {
        change: change,
        identify: identify1
    };
    return publicAPI;
 }
 )("foo module");

 foo.identify();    //foo module
 foo.change();
 foo.identify();   //FOO MODULE
 */

/* var a = {
    name:'a',
    b:1
}
console.log(a.b);
 */

/* var modules = {};
 var deps = [1,2,3];
 for(var i=0; i<deps.length; i++) {
     modules[deps[i]] = deps[i];
 } */

/* var MyModules = (function Manager(){
    var modules = {};
    function define(name,deps,impl) {
        for(var i=0; i<deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply( impl,deps);
    }
    function get(name) {
        return modules[name];
    }
    return {
        define: define,
        get: get
    };
})();

//定义模块
MyModules.define("bar",[],function(){
    function hello(who) {
        return 'Let me introduce: '+who;
    }
    return {
        hello: hello
    };
});
MyModules.define("foo",['bar'],function(bar){
    var hungry = "hippo";
    function awesome() {
        console.log( bar.hello(hungry).toUpperCase());
    }
    return {
        awesome: awesome
    };
});
var bar = MyModules.get("bar");
var foo = MyModules.get('foo');

foo.awesome(); */

//bar.js
/* function hello(who) {
    return "let me introduce" +who;
}
 */
/* try {
    throw 2;
} catch (a) {
    console.log(a);
}
console.log(a); */

/* {
    var a=1;
}
console.log(a);
 */
/* function recursion(i) {
    if(i =1){
        return 1;
    }else{
        var result=1;
        result = recursion(i)*recursion(i-1);
        return result;
    }
}
 */

/* function foo(num){
    foo.count++;
}
foo.count =0;
foo(1);
console.dir(foo);

function foo(num){
    console.log("foo:" + num);
    //记录foo被调用的次数
    foo.count++;
}
foo.count =0        //因为函数也是对象，所以可以有属性
var i;
for(i=0; i<10; i++) {
    if(i > 5) {
        foo(i)
    }
}
console.log(foo.count);
 */

/*  function foo(num) {
     console.log("foo:" + num);
     //记录foo被调用的次数
     //注意，在当前的调用方式下（参见下方代码），this确实指向foo
     this.count++;
 }
foo.count =0;
var i;
for(i=0; i<10; i++) {
    if (i > 5) {
        //使用call()可以确保this指向函数对象foo本身
        foo.call( foo, i);
    }
}
console.log( foo.count); */

/* var obj = {
    a:1,
returnA:function(){
    console.log(this.a);
}

}
obj.returnA(); */
/* function foo(){
    console.log(this.a);
}
var a = 2;
foo.bind(global);
 */
/* function cool(a,b,...theother) {
    console.log(theother.length);
}
cool(1,2);
cool(1,2,3,4,5); */

/* var arr = [1,2,3];
arr['4']=1;
arr['3'] =4
console.log(arr); */
/* var a ={
    b:'1'
}
console.log(Object.getOwnPropertyDescriptor(a,"b")); */
//定义一个可以返回100个随机数的数组
/* var randoms = {
[Symbol.iterator]: function () {
    return {
        next: function () {
            return { value: Math.random() };
        }
    };
}
};
var randoms_pool = []; 
for (var n of randoms) {
    randoms_pool.push(n);
    if (randoms_pool.length === 100) break; //防止无限运行！ 
}
console.log(randoms_pool);

Foo = {
    init: function(who) {
        this.me = who;
    },
    identify: function() {
        return "I am" + this.me;
    }
};
Bar = Object.create(Foo);
Bar.speak = function() {
    alert( "Hello, " + this.identify() + ".");
};
var b1 = Object.create( Bar );
b1.init( "b1");
var b2 = Object.create( Bar);
b2.init( "b2");
b1.speak();
b2.speak();
 */

//父类
function Widget(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
}
Widget.prototype.render = function ($where) {
    if (this.$elem) {
        this.$elem.css({
            width: this.width + "px",
            height: this.height + "px"
        }).appendTo($where);
    }
};

//子类
function Button(width, height, label) {
    Widget.call(this, width, height);
    this.label = label || "Default";
    this.$elem = $('<button>').text(this.label);
}
//让Button集成Widget
Button.prototype = Object.create(Widget.prototype);
//重写render(..)
Button.prototype.render = function ($where) {
    //"super"调用
    Widget.prototype.render.call(this, $where);
    this.$elem.click(this.onClick.bind(this));
};
Button.prototype.onClick = function (evt) {
    console.log("Button" + this.label + "clicked");
}
$(document).ready(function () {
    var $body = $(document.body);
    var btn1 = new Button(125, 30, "Hello");
    btn1.render($body);
});

//ES6的class语法糖
class Widget {
    constructor(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    render($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
        }
    }
}
class Button extends Widget {
    constructor(width, height, label) {
        super(width, height);
        this.label = label || "Default";
        this.$elem = $("<button>").text(this.label);
    }
    render($where) {
        super($where);
        this.$elem.click(this.onClick.bind(this));
    }
    onClick(evt) {
        console.log("Button" + this.label + "clicked");
    }
}
$(document).read(function () {
    var $body = $(document.body);
    var btn1 = new Button(125, 30, "Hello");
    btn1.render($body);
});

//委托控件对象
var Widget = {
    init: function (width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    },
    insert: function ($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
        }
    }
};
var Button = Object.create(Widget);
Button.setup = function (width, height, label) {
    this.init(width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
};
button.build = function ($where) {
    this.inset($where);
    this.$elem.click(this.onClick.bind(this));
};
Button.onClick = function (evt) {
    console.log("");
};
$(document).ready(function () {
    var $body = $(document.body);
    var btn1 = Object.create(Button);
    btn1.setup(125, 30, "Hello");
    btn1.build($body);
});

//父类
function Controller() {
    this.errors = [];
}
Controller.prototype.showDialog = function (title, msg) {

};
Controller.prototype.success = function (msg) {
    this.showDialog("Success", msg);
};
Controller.prototype.failure = function (err) {
    this.errors.push(err);
    this.showDialog("Error", err);
};
//子类
function LoginController() {
    Controller.call(this);
}
//把子类关联到父类
LoginController.prototype = Object.create(Controller.prototype);
LoginController.prototype.getUser = function () {
    return document.getElementById("login_username").value;
};
LoginController.prototype.getPassword = function () {
    return document.getElementById("login_password").value;
};
LoginController.prototype.validateEntry = function (user, pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();
    if (!(user && pw)) {
        return this.failure('Please enter a username & password');
    }
    else if (user.length < 5) {
        return this.failure("Password must be 5+ characters");
    }
    return true;
}

var LoginController = {
    errors: [],
    getUser: function () {
        return document.getElementById(
            "login_username"
        ).value;
    },
    getPassword: function () {
        return document.getElementById(
            "login_password"
        ).value;
    },
    validateEntry: function (user, pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();
        if (!(user && pw)) {
            return this.failure("Please enter a usename & password!");
        }
        else if (user.length < 5) {
            return this.failure(
                "Password must be 5+ characters"
            );
        }
        return true;
    },
    failure: function (err) {
        this.errors.push(err);
        this.showDialog("Error", "Login invalid: " + err)
    }
};
//让AuthController委托LoginController
var AuthController = Object.create(LoginController);
AuthController.errors = [];
AuthController.checkAuth = function () {
    var user = this.getUser();
    var pw = this.getPassword();
    if (this.validateEntry(user, pw)) {
        this.server('/check-auth', {
            user: user,
            pw: pw
        })
            .then(this.accepted.bind(this))
            .fail(this.regected.bind(this));
    }
};
AuthController.server = function (url, data) {
    return $.ajax({
        url: url,
        data: data
    });
};
AuthController.accepted = function () {
    this.showDialog("Success", "Authenticated")
};
AuthController.rejected = function (err) {
    this.failure("Auth Failed: " + err);
};


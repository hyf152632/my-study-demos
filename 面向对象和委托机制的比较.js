//面向对象
function Foo(who) {

    this.me = who;
}
Foo.prototype.identify = function () {
    return "I am" + this.me;
};
function Bar(who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function () {
    alert("Hello," + this.identify() + ".");
};
var b1 = new Bar("b1");
var b2 = new Bar("b2");

//对象关联
Foo = {
    init: function (who) {
        this.me = who;
    },
    identify: function () {
        return "I am" + this.me;
    }
};
Bar = Object.create(Foo);
Bar.speak = function () {
    alert("Hello," + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");

//对象关联的AJAX拓展
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
            return this.failure(
                "Please enter a username & password!"
            );
        }
        else if (user.length < 5) {
            return this.failure(
                "password must be 5+ characters!"
            );
        }
        //如果执行到这里说明通过验证
        return true;
    },
    showDialog: function (title, msg) {
        //给用户显示标题和消息
    },
    failure: function (err) {
        this.errors.push(err);
        this.showDialog("Error", "Login invalid" + err
        );
    }
};
//让AuthController委托LoginController
var AuthController = Object.create(LoginController);

AuthController.errors = [];
AuthController.checkAuth = function () {
    var user = this.getUser();
    var pw = this.getPassword();

    if (this.validateEntry(user, pw)) {
        this.server("/check-auth", {
            user: user,
            pw: pw
        })
            .then(this.accepted.bind(this))
            .then(this.rejected.bind(this));
    }
};
AuthController.server = function (url, data) {
    return $.ajax({
        url: url,
        data: data
    }
    );
};
AuthController.accepted = function () {
    this.showDialog("Success", "Authticated!")
};
AuthController.rejected = function (err) {
    this.failure("Auth Failed: " + err);
};

Object.setPrototypeOf()

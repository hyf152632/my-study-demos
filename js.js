/*检查函数参数与实际要的参数是否相同，不同则抛出异常*/
function check(args) {
    var actual = args.length;
    var expected = args.callee.length;
    if (actual !== expected)
        throw Error("expected" + expected + "args;got" + actual);
}
function f(x, y, z) {
    check(arguments);
    //...
}

f.call(o, 1, 2);
f.apply(o, [1, 2]);

/*找出数组中的最大值*/
var biggest = Math.max.apply(Math, array_of_number);

// bind()——————将函数绑定至某个对象
function f(y) {
    return this.x + y;
}
var o = { x: 1 };
var g = f.bind(o);
g(2) // => 3


//bind()的兼容方法：
function bind(f, o) {
    if (f.bind) return f.bind(o);
    else return function () {
        return f.apply(o, arguments);
    }
}

//bind()实现柯里化
/*var sum = function(x,y) { return x + y; };  //创建一个类似sum的新函数
var succ = sum.bind(null,1);    //this的值绑定到null,传入第一个参数是1
succ(2) //=>3   x绑定到1，并传入2作为实参y
function f(y,z) { return this.x + y + z };
var g = f.bind({x:1},2);    //绑定this和y
g(3) // =>6 :this.x 绑定到1，y绑定到2,z绑定到3*/

//实现map()方法
var map = Array.prototype.map ? function (a, f) { return a.map(f); }
    : function (a, f) {
        var results = [];
        for (var i = 0, len = a.length; i < len; i++) {
            if (i in a) results[i] = f.call(null, a[i], i, a);
        }
        return results;
    };

//实现reduce()方法
/*var reduce = Array.prototype.reduce ? function(a,f,initial) {
    if (arguments.length >2)
        return a.reduce(f, initial);
    else return a.reduce(f);
} : function(a, f, initial) {   //这个算法来自ES5规范
    var i = 0,
        len = a.length,
        accumulator;
        //以特定的初始值开始，否则第一个值取自a
        if(arguments.length > 2)accumulator = initial;
        else {
            if( len == 0) throw TypeError();
            while (i < len) {
                if ( i in a) {
                    accumulator = a[i++];
                    break;
                }else i++;
            }
            if (i == len ) throw TypeError();
        }
        while (i < len) {
            if (i in a)
            accumulator = f.call(undefined,accumulator,a[i], i, a);
            i++;
        }
        return accumulator;
}*/

//使用map和reduce计算平均差和标准差
/*var data = [1,1,3,5,5];
var sum = function(x,y) { return x+y; };
var square = function(x) { return x*x; };
var mean = reduce(data, sum) / data.length;
var deviations = map(data,function(x) { return x-mean;});
var stddev = Math.sqrt(reduce(map(deviations,square),sum) / (data.length - 1));*/





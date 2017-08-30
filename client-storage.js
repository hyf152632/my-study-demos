//storage
//localStorage和sessionStorage
//它们的区别在于：数据储存多长时间和谁拥有数据的访问权
var name = localStorage.username;   //查询一个储存的值
name = localStorage['username'];    //等价于数组表示法
if (!name) {
    name = prompt("What is your name?");
    localStorage.username = name;
}

//迭代所有存储的name/value对
for (var name in localStorage) {
    var value = localStorage[name];     //查询每个名字对应的值
}

//当储存一个数字的时候，会把它自动转换成一个字符串
//但是，当获取该值的时候别忘了手动将其转换成数值类型
localStorage.x = 10;
var x = parseInt(localStorage.x);

//同样的，存储一个日期类型数据的时候进行编码，获取的时候进行解码
localStorage.lastRead = (new Date()).toUTCString();
var lastRead = new Date(Date.parse(localStorage.lastRead));

//使用JSON可以使得对基本数据类型编码的工作变得很方便
localStorage.data = JSON.stringify(data);
var data = JSON.parse(localStorage.data);

//这些例子对sessionStorage也同样适用
localStorage.setItem("x", 1);
localStorage.getItem("x");

//枚举所有纯纯的名字/值对
for (var i = 0; i < localStorage.length; i++) {
    var name = localStorage.key(i);
    var value = localStorage.getItem(name);
}

localStorage.removeItem("x");
localStorage.clear()    //全部删除

5

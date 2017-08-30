/*实现type函数用于识别标准类型和内置对象类型，语法如下：
var t = type(obj);
使用举例如下：
var t = type(1) // t==="number"
var t = type(new Number(1)) // t==="number"
var t = type("abc") // t==="string"
var t = type(new String("abc")) // t==="string"
var t = type(true) // t==="boolean"
var t = type(undefined) // t==="undefined"
var t = type(null) // t==="null"
var t = type({}) // t==="object"
var t = type([]) // t==="array"
var t = type(new Date) // t==="date"
var t = type(/\d/) // t==="regexp"
var t = type(function () { }) // t==="function"
*/

function type(obj) {
    var type = Object.prototype.toString.call(obj).slice(8, -1);
    return type.toLowerCase();
}
console.log(type(function () { }));


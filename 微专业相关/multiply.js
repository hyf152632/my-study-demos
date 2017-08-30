/*函数multiply用于计算多个数字的乘积。
语法如下：
var product = multiply(number0, number1[, number2, ….]) ；
    使用范例如下：
    multiply(2, 3); 返回值： 6
multiply(-1, 3, 4); 返回值： -12
multiply(1, 2, 3, 4, 5); 返回值： 120
请写出函数multiply的实现代码。
*/

function multiply() {
    if (arguments.length < 2) {                                    //参数检查           
        return "multiply need more than one number!";
    } else {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] !== "number") {                 //如果参数有不是数字，返回
                return "multiply can only accept number!";
            }
        }
    }
    result = 1;                                             //定义返回结果
    for (var j = 0; j < arguments.length; j++) {                 //循环每一个参数
        result *= arguments[j];                             //累乘
    }
    return result;                                      //返回结果
}

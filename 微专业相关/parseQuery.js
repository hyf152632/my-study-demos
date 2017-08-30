/*函数parseQuery用于解析url查询参数。
语法如下：
var obj = parseQuery(query)
query是被解析的查询参数，函数返回解析后的对象。
使用范例如下：
var jerry = parseQuery("name=jerry&age=1");
jerry; 返回值：{ name: " jerry ", age: "1" }
var tom = parseQuery("name= tom &age=12&gender&");
tom; 返回值：{ name: "tom", age: "12", gender: "" }
请写出函数parseQuery的实现代码。
*/
function parseQuery(query) {
    if (typeof query !== "string") {         //参数类型检查
        return "query is invalid,please input a string.";
    } else {
        var split_query = query.replace(" ", "").split("&");         //将字符串按&号分割
        var result = {};                                            //创建结果对象
        for (var i = 0, j = 0; i < split_query.length; i++) {              //循环数组中每一个值
            if (split_query[i] == "") {                      //排除空值
                continue;
            } else {
                each_split_query = split_query[i].split('=');   //将每一个值按等号分割
                if (each_split_query.length == 1) {
                    result[each_split_query] = "";          //将只有键的属性添加给对象
                } else {
                    result[each_split_query[0]] = each_split_query[1];  //将键值对添加给对象
                }

            }
        }
        return result;                                  //返回结果对象
    }
}


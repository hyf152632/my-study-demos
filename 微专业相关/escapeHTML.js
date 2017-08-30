/*函数escapeHTML用于转义html字符串中的特殊字符(<>"&)。
语法如下：
	var escapedStr = escapeHTML(htmlStr);
使用范例如下：
escapeHTML('<div>Tom&Jerry</div> ');
返回值：
'&lt;div&gt;Tom&amp;Jerry&lt;/div&gt; '
escapeHTML('<input type="text" name="mobile"> ');
返回值：
'&lt;inputtype=&quot;text&quot; name=&quot;mobile&quot;&gt; '
请写出函数escapeHTML的实现代码。
*/

function escapeHTML(htmlStr) {
    if (arguments.length == 0 || typeof arguments[0] !== "string") {             //参数检查
        return "escapeHTML need a string.";
    }
    var checkitem = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };   //保存要替换的对象
    var checkitem_arr2 = ['&', '<', '>', '"'];

    for (var i = 0; i < 4; i++) {                                               //循环要替换的每一个对象
        var regexp = new RegExp(checkitem_arr2[i], 'g');
        var result = htmlStr.replace(regexp, checkitem[checkitem_arr2[i]]);
        htmlStr = result;
    }
    return htmlStr;
}

console.log(escapeHTML('<input type="text" name="mobile"> '));

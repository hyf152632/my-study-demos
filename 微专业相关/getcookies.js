/*函数getCookies()解析document.cookie， 并返回一个对象， 
该对象的属性名为cookie的name，属性值为cookie的value。请写出该函数的实现代码*/
function getCookies() {
    var the_cookie = document.cookie;
    var result = {};
    if (the_cookie === "")
        return result;
    var split_the_cookie = the_cookie.split('; ');
    for (var i = 0; i < split_the_cookie.length; i++) {
        var item = list[i];
        var p = item.indexOf('=');
        var name = item.substring(0, p);
        name = decodeURIComponent(name);
        var value = item.substring(p + 1);
        value = decodeURIComponent(value);
        if (name !== 'expires' && name !== 'domain' && name !== 'path' && name !== 'secure')   //如果键值对的name不是cookie的这几个属性
            result[name] = value;                                                   //那么，将其添到对象
    }
    return result;
}

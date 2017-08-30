//当讲事件时，我们必须同时指明事件的类型和目标

//事件的分类：
//依赖于设备的输入事件：鼠标和键盘
//独立于设备的输入事件：例如：click事件可能是鼠标激活的，也可能通过键盘的按键
//用户界面事件：通常是表单事件。例如：focus,change,submit
//状态变化事件：不是由用户活动而是由网络或者浏览器活动触发，用来表示某种生命周期而相关状态的变化。比如：load事件
//特定API事件
//计时器和错误处理程序

//注册事件处理程序
//1：给事件目标对象或文档元素设置属性
//2：将事件处理程序传递给对象或元素的一个方法————：addEventListener();

//事件处理程序属性的名字由“on”后面跟着事件名组成：onclick,onchange,onload,onmouseover等。
//这些属性名是区分大小写的，所有都是小写，即使事件类型是有多个词组成的。

//设置Window对象的onload属性为一个函数
//该函数是时间处理程序：但文档加载完毕时调用它
/*
window.onload = function() {
    //查找一个<form>元素
    var elt = document.getElementById("shipping_address");
    //注册事件处理程序函数
    //在表单提交之前调用它
    elt.onsubmit = function() { return validate(this); }
}
*/

//事件处理程序属性的缺点是其设计都是围绕着假设每个事件目标对于每种事件类型将最多只有一个处理程序。
//如果想编写能够在任意文档中都能使用的脚本库代码，更好的方式是使用一种不修改或覆盖任何已有注册处理程序的技术（addEventListener()）

//addEventListener()
//任何能成为事件目标的对象都定义了一个名叫addEventListener()的方法
//两种不同的事件注册方式：
/*
var b = document.getElementById("mybutton");
b.onclick = function() { alert("Thanks for clicking me!"); };
b.addEventListener('click',function() { alert("Thank again!"); },false);
*/
//用“click”作为第一个参数调用addEventListener()不会影响onclick属性的值。
//更重要的是，能调用多次addEventListener()为同一个对象注册同一事件类型的多个处理程序函数。并且会按照注册的顺序调用。

//与addEventListener()相对应的是removeEventListener()方法，它同样有三个参数

//IE9之前的IE不支持addEventListener()和removeEventListener().
//IE5及以后版本定义了类似的方法attachEvent()和detachEvent()

/*
var b = document.getElementById("mybutton");
var handler = function() { alert("Thanks!"); };
if(b.addEventListener)
    b.addEventListener('click',handler,false);
else if (b.attachEvent)
    b.attachEvent('onclick',handler);
*/

//事件处理程序的参数
//通常调用事件处理程序时，会把事件对象作为它们的一个参数

//在IE8及以前版本中，通过设置属性注册事件处理程序，当调用它们时并未传递事件对象。取而代之，需要通过全局对象window.event来
//获得事件对象。出于互通性，你能像如下那样编写事件处理程序，这样如果没有参数就使用window.event
function handler(event) {
    event = event || window.event;
    //处理程序代码...
}

//在事件处理程序内，this关键字指的是事件目标
//当使用addEventListener()注册时，调用的处理程序使用事件目标作为它们的this值
//但是，使用attachEvent()注册的处理程序作为函数调用，它们的this值是全局对象(window).
//解决方法
/*
在指定的事件目标上注册用于处理指定类型事件的指定处理程序函数
确保处理程序一直作为事件目标的方法调用
*/
function addEventListener(target, type, handler) {
    if (target.addEventListener)
        target.addEventListener(type, handler, false);
    else
        target.attachEvent("on" + type,
            function (event) {
                //把处理程序作为事件目标的方法调用，
                //传递事件对象
                return handler.call(target, event);
            })
}
//注意使用这个方法注册的事件处理程序函数不能删除，因为传递给attachEvent()的包装函数没有保留下来传递给detachEvent()

//事件处理程序的返回值
//事件处理程序函数的返回值只有通过属性注册的处理成才有意义
//使用addEventListener()或attachEvent()注册事件处理程序转而必须调用preventDefault()方法或设置事件对象的return Value属性

//三种事件取消技术
function cancelHandler(event) {
    var event = event || window.event;
    if (event.preventDefault) event.preventDefault();    //标准技术
    if (event.returnValue) event.returnValue = false;    //IE
    return false;   //用于处理使用对象属性注册的处理程序
}

//可用调用事件对象的一个stopPropagation()方法以阻止事件的继续传播。
//相对应的IE9之前的IE，设置cancelBubble属性为true能阻止事件进一步传播。


//当文档准备就绪时调用函数
/*
传递函数给whenReady(),当文档解析完毕且为操作准备就绪时，
函数将作为文档对象的方法调用
DOMContentLoaded，readystatechange或load事件发生时会触发注册函数
一旦文档准备就绪，所有函数都将被调用，任何传递给whenReady()的函数都将立即调用
*/

var whenReady = (function () {
    var funcs = []; //当获得事件时，要运行的函数
    var ready = false;  //当触发事件处理程序时，切换到true

    //当文档准备就绪时，调用事件处理程序
    function handler(e) {
        //如果已经运行过一次，只需要返回
        if (ready) return;

        //如果发生readystatechange事件
        //但其状态不是"complete"的话，那么文档尚未准备好
        if (e.type === "readystatechange" && document.readyState !== "complete")
            return;

        //运行所有注册函数
        //注意每次都要计算funcs.length
        //以防这些函数的调用可能会导致注册更多的函数
        for (var i = 0; i < funcs.length; i++) {
            funcs[i].call(document);

            //现在设置ready标识为true，并移除所有函数
            ready = true;
            funcs = null;
        }
    }
    //为接收到的任何事件注册处理程序
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", handler);
        window.attachEvent("onload", handler);
    }
    return function whenReady(f) {
        if (ready) f.call(document); //若准备完毕，只需要运行它
        else funcs.push(f);     //否则，加入队列等候
    }
}());


//鼠标点击事件
//拖动文档元素
/*
Drag.js:拖动绝对定位的HTML元素
这个模块定义一个drag()函数，它用于mousedown事件处理程序的调用
随后的mousemove事件将移动指定元素，mouseup事件将终止拖动
这些实现能同标准和IE两种事件模型一起工作
它需要用到本书其他地方介绍的getScrollOffsets()方法

参数：

elementToDrag:接收mousedown事件的元素或某些包含元素
它必须是绝对定位的元素
它的style.left和style.top值将随着用户的拖动而改变

event:mousedown事件对象
*/
function drag(elementToDrag, event) {
    //初始鼠标位置，转换为文档坐标
    var scroll = getScrollOffsets();
    var startX = event.clientX + scroll.x;
    var startY = event.clientY + scroll.y;

    //在文档坐标下，带拖动元素的初始位置
    //因为elementTODrag是绝对定位的。
    //所以我们可以假设它的offsetParent就是文档的body元素
    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;

    //计算mousedown事件和元素左上角之间的距离
    //我们将它另存为鼠标移动的距离
    var deltaX = startX - origX;
    var deltaY = startY - origY;

    //注册用于相应接着mousedown事件发生的Mousemove和mouseup事件的事件处理程序
    if (document.addEventListener) { //用于标准事件模型
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    } else if (document.attachEvent) {   //用于IE5~IE8的事件模型
        //在IE事件模型中
        //捕获事件是通过调用元素上的setCapture()捕获它们
        elementToDrag.setCapture();
        elementToDrag.attachEvent('onmousemove', moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);

        //作为mouseup事件看待鼠标捕获的丢失
        elementToDrag.attachEvent("onlosecapture", upHandler);
    }
    //我们处理了这个事件，不让任何其他元素看到它
    if (event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true;
    //现在阻止任何默认操作
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;

    //当元素正在被拖动时，这就是捕获mousemove事件的处理程序
    //它用于移动这个元素
    function moveHandler(e) {
        if (!e) e = window.event;    //在IE事件模型中
        //移动这个元素到当前鼠标位置
        //通过滚动条的位置和初始单击的偏移量来调整
        var scroll = getScrollOffsets();
        elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
        elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
        //同时不让任何其他元素看到这个事件
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }
    //这是捕获在拖动结束时发生的最终mouseup事件的处理程序
    function upHandler(e) {
        if (!e) e = window.event;
        //注销捕获事件处理程序
        if (document.removeEventListener) {
            document.removeEventListener("moseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        } else if (document.datachEvent) {
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmousemove", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        }
        //并且不让事件进一步传播
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
    }
}

//下面的代码展示了在HTML文件中如何使用drag()
{
    /*
<script src="getScrollOffsets.js"></script>
<!-- drag() 需要这个 -->
<script src="Drag.js"></script>
<!-- 定义drag()-->
<!--要拖动的元素-->
<div style="position:absolute;left:100px;top:100px;width:240px;background-color:white;border:solid black;">
    <div style="background-color:gray;border-bottom:dotted black;padding:3px;font-family:sans-serif;" onmousedown="drag(this.parentNode,event;">
    拖动我
    </div>
    <p>这是一个测测试。</p>
    <p>kkk</p>
    <p>kk</p>
*/}

//查询窗口滚动条位置
function getScrollOffsets(w) {
    //使用指定的窗口，如果不带参数则使用当前窗口
    w = w || window;

    //除了IE8及更早的版本以外，其他浏览器都能用
    if (w.pageXOffset != null) return { x: w.pageXOffset, y: w.pageYOffset };

    //对标准模式下的IE（或任何浏览器）
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop };

    //对怪异模式下的浏览器
    return { x: d.body.scrollLeft, y: d.body.scrollTop };

}

//定义一个函数显示当前时间
function displayTime() {
    var elt = document.getElementById("clock");
    var now = new Date();
    elt.innerHTML = now.toLocaleTimeString();
    setTimeout(displayTime, 1000);       //一秒后再次执行
}
window.onload = displayTime;    //当onload事件发生时开始显示时间


//javascript:URL可以用在可以使用常规URL的任意地方：比如<a>标记的href属性，<form>的action属性，甚至window.open()方法以阻止事件的继续传播。
//的参数
<a href="javascript:new Date().toLocaleTimeString();">
    What time is it?
</a>

//javascript程序的执行由两个阶段：
//在第一阶段，载入文档内容，并执行<script>元素里的代码。
//当文档载入完成，并且所有脚本执行完成后，javascript执行就进入它的第二阶段
//事件驱动阶段
//事件驱动阶段里发生的第一个事件是load事件。

//异步载入并执行一个指定URL中的脚本
function loadasync(url) {
    var head = document.getElementsByTagName("head")[0];
    var s = document.createElement("script");
    s.src = url;
    head.appendChild(s);
}

window.onload = function () { };
document.getElementById("button1").onclick = function () { };
function handleResponse() { }
request.onreadystatechange = handleResponse;

//onLoad()当文档载入完成时调用一个函数
function onLoad(f) {
    if (onLoad.loaded)   //如果文档已经载入完成
        window.setTimeout(f, 0); //将f放入异步队列，并尽快执行它
    else if (window.addEventListener)   //注册事件的标准方法
        window.addEventListener("load", f, false);
    else if (window.attachEvent)    //IE8以及更早的IE版本
        window.attachEvent("onload", f);
}
onLoad.loaded = false;  //给onLoad设置一个标志，用来指示文档是否载入完成
onLoad(function () { onLoad.loaded = true; });    //注册一个函数，当文档载入文成时设置这个标志

document.styleSheets[0].cssRules[0].cssText

//客户端javascript时间线
//1.document.readyState = loading
//async属性的<script>开始下载
//文档完成解析document.readyState = interactive
//执行所有defer属性的脚本，按照它们在文档里的出现顺序执行
//程序执行由同步脚本执行转换到了异步事件驱动阶段
//等待其他内容载入，例如图片等
//document.reayState = complete
//触发window对象的load事件
//调用异步事件

//兼容性处理的方法之一：功能测试
if (element.addEventListener) {
    element.addEventListener("keydown", handler, false);
    element.addEventListener("keypress", handler, false);
} else if (element.attachEvent) {
    element.attachEvent("onkeydown", handler);
    element.attachEvent("onkeypress", handler);
} else {
    element.onkeydown = element.onkeypress = handler;
}


//IE的条件注释
//<!--[if IE]>...<![endif]-->

//三种不严格的同源策略
//1.对于使用多个子域的大站点
//可以设置包含脚本的domain的值，如果设置成相同的，那么这两个窗体就可以不再受同源策略的影响
document.domain = xxx.com;

//使用XMLHttpRequest
//第一部分：指定请求
//1.实例化XMLHttpRequest对象
var request = new XMLHttpRequest();
//也可以重用已存在的XMLHttpRequest,但是这将会终止之前通过给对象挂起的任何请求。

//2.调用XMLHttpRequest对象的open()方法指定这个请求的两个必须部分：方法和URL
request.open("GET",     //开始一个HTTP GET 请求
    "data.csv");    //URL的内容

//3.如果有请求头的话，请求进程的下一个步骤是设置它
request.setRequestHeader("Content-Type", "text/plain");
//如果对相同的头调用setRequestHeader()多次，新值不会取代之前指定的值，相反，HTTP请求将包含这个头的多个副本或者这个头将
//指定多个值。

//4.指定可选的请求主体并向服务器发送它
request.send(null);
//GET请求绝对没有主体，所有应该传递null或者省略这个参数。
//POST请求通常拥有主体，同时它应该匹配使用setRequestHeader()指定的"Content-Type"头

//XMLHttpRequest实现通常直到调用send()方法才开始启动网络。

//用POST方法发送纯文本给服务器
function postMessage(msg) {
    var request = new XMLHttpRequest();
    request.open("POST", "/log.php");
    //请求主体发送纯文本消息
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send(msg);
    //请求完成，我们将忽略任何响应和任何错误
}

//第二部分：取得响应
//XMLHttpRequest对象的属性和方法的使用：
//status和statusText以数字和文本的形式返回HTTP状态码
//getResponseHeader()和getAllResponseHeader()能查询响应头部
//响应主体可以从responseText属性中得到文本形式，从responseXML属性中得到Document形式的

//readyState指定HTTP请求的状态
//readystatechange事件，监听readyState属性的改变

//获取HTTP响应的onreadystatechange
function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.match(/^text/))     //确保响应是文本
                callback(request.responseText);     //把它传递给回调函数
        }
    };
    request.send(null);     //立即发送请求
}

//同步响应
//getTextSync() 发起同步的HTTP GET 请求以获得指定URL的内容
//返回响应文本，或如果请求不成功或响应不是文本就报错
function getTextSync(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false)   //传递false实现同步
    request.send(null); //立即发送请求

    //如果请求不是200OK,就报错
    if (request.status !== 200) throw new Error(request.statusText);

    //如果类型错误，就报错
    var type = request.getResponseHeader("Content-Type");
    if (!type.match(/^text/))
        throw new Error("Expected textual response;got:" + type);
    return request.responseText;
}

//避免使用同步请求(即open()的第三个参数指定false),因为客户端javascript是单线程的，当send()方法阻塞时，
//通常会导致整个浏览器UI冻结。如果连接的服务器响应慢，那么用户的浏览器将冻结。

//响应的解码
//解析HTTP响应

//发起HTTP GET响应以获取指定URL的内容
//当响应到达时，把它已解析后的XML Document对象，解析后的JSON对象，或者字符串形式传递给回调函数
function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");

            //检查类型，这样我们不能在将来得到HTML文档
            if (type.indexOf("xml") !== -1 && request.responseXML)
                callback(request.responseXML);
            else if (type === "application/json")
                callback(JSON.parse(request.responseText));
            else
                callback(request.responseText); //字符串响应
        }
    };
    request.send(null); //立即发送请求
}

//编码请求主体

//1.表单编码的请求
//表单数据编码格式有一个正式的MIME类型：
application / x - www - form - urlencoded
//当使用POST方法提交这种顺序的表单数据时，必须设置"Content-Type"请求头为这个值。

//用于HTTP请求的编码对象
/*编码对象的属性，
如果他们是来自HTML表单的名/值对，使用application/x-www-form-urlencoded格式*/
function encodeFormData(data) {
    if (!data) return " ";   //一直返回字符串
    var pairs = []      //保存名=值对
    for (var name in data) {
        if (!data.hasOwnproperty(name)) continue;    //跳过继承属性
        if (typeof data[name] === "function") continue;  //跳过方法
        var value = data[name].toString();
        name = encodeURIComponent(name.replace("%20", "+"));     //编码名字
        value = encodeURIComponent(value.replace("%20", "+"));       //编码值
        pairs.push(name + "=" + value);     //记住名=值对
    }
    return pairs.join("&"); //返回使用"&"连接的名/值对。
}

//使用表单编码书籍发起一个HTTP POST请求
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);      //调用回调函数
    };
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(encodeFormData(data));     //发送表单编码的数据
}

//当提交表单的目的仅仅是只读查询，使用GET请求更合适
function getData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url + "?" + encodeFormData(data))      //通过添加的编码数据获取指定的url
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);
    };
    request.send(null);
}

//使用JSON编码主体来发起HTTP POST请求
function postJSON(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
}

//使用HTTP POST 请求上传文件
whenReady(function () {
    var elts = document.getElementsByTagName('input');
    for (var i = 0; i < elts.length; i++) {
        var input = elts[i];
        if (input.type !== "file") continue;
        var url = input.getAttribute("data-uploadto");
        if (!url) continue;
        input.addEventListener("change", function () {
            var file = this.files[0];   //假设单个文件选择
            if (!file) return        //如果没有文件，不做任何事
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.send(file);     //把文件作为主体发送
        }, false);
    }
});

//使用POST方法发送multipart/form-data请求主体
function postFormData(url, data, callback) {
    if (typeof FormData === "undefined")
        throw new Error("FormData is not implemented");
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && callback)
            callback(request);
    }
    for (var name in data) {
        if (!data.hasOwnproperty(name)) continue;
        var value = data[name];
        if (typeof value === "function") continue;
        //每个属性变成请求的一个部分
        //这里允许File对象
        formdata.append(name, value);    //作为一部分添加名/值对。
    }
    //在multipart/form-data请求主体中发送名/值对
    //每对都是请求的一个部分，注意，当传入formdata对象时
    //send()会自动设置Content-Type头
    request.send(formdata);
}

//HTTP进度事件
//新的事件
//调用send()时，触发单个loadstart事件，加载服务器响应时，发生progress事件，通常每个50毫秒左右，可以返回用户请求的进度。
//当事件完成，会触发load事件
//progress事件有用的属性
//type  timestamp   loaded(目前传输的字节数值)   total(自Content-Length头传输的数据的整体长度，如果不知道则为0)
//如果知道内容长度则lengthComputable属性为true,否则为false.
request.onprogress = function () {
    if (e.lengthComputable) {
        progress.innerHTML = Math.round(100 * e.loaded / e.total) + "% Complete";
    }
}


//一个完成的请求不一定是成功的请求，应该检查XMLHttpRequest对象的status状态码来确定，
//request.readyState 可以指示请求完成的进度，
//request.status可以确认请求是否成功

//请求无法完成的3种情况,对应3种事件
//1.超时——timeout
//2.中止——abort
//3.重定向——error

//可以通过XMLHttpRequest对象的addEventListener()方法为这些progress事件中的每个都注册处理程序，

//使用这些事件属性是否存在来测试浏览器是否支持progress事件：
if ("onprogress" in (new XMLHttpRequest())) {
    //支持progress事件
}

//实现超时
/*
*发起HTTP GET请求获取指定URL的内容
*如果响应成功到达，传入responseText给回调函数
*如果响应在timeout毫秒内没有到达，中止这个请求
*浏览器可能是在abort()后触发"readystatechange"
*如果是部分请求结果到达，甚至可能设置status属性
*所以需要设置一个标记，当部分且超时的响应到达时不会调用回调函数
*如果使用Load事件就没有这个风险
*/

function timedGetText() {
    var request = new XMLHttpRequest();
    var timedout = false;
    var timer = setTimeout(function () {     //如果触发启动一个计时器
        timedout = true;    //设置标记
        request.abort();    //然后中止请求
    }, timeout); //中止请求的时长
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState !== 4) return;    //忽略未完成的请求
        if (timedout) return;     //忽略中止请求
        clearTimeout(timer);    //取消等待的超时
        if (request.status === 200)
            callback(request.responseText)
    };
    request.send(null);     //立即发送请求
}

//测试XMLHttpRequest的withCredentials属性是否存在，是测试浏览器是否支持CORS的一种方法

//使用script元素发送JSONP请求
//根据指定的URL发送一个JSONP请求
//然后把解析得到的响应数据传递给回调函数
//在URL中添加一个名为jsonp的查询函数，用于指定该请求的回调函数的名称
function getJSONP(url, callback) {
    //为本次请求创建一个唯一的回调函数名称
    var cbnum = "cb" + getJSONP.counter++;   //每次自增计数器
    var cbname = "getJSONP" + cbnum; //作为JSONP函数的属性

    //将回调函数名称以表单编码的形式添加到URL的查询部分中
    //使用jsonp作为参数名，一些支持JSONP的服务
    //可能使用其他的参数名，比如callback
    if (url.indexOf("?") === -1) //URL没有查询部分
        url += "?jsonp" + cbname;   //作为查询部分添加参数
    else //
        url += "&jsonp" + cbname;   //作为新的参数添加它

    //创建script元素用于发送请求
    var script = document.createElement("script");
    //定义将被脚本执行的回调函数
    getJSONP[cbnum] = function (response) {
        try {
            callback(response);     //处理响应数据
        } finally {     //即使回调函数或相应抛出错误
            delete getJSONP[cbnum];     //删除该函数
            script.parentNode.removeChild(script);

        }
    };
    //立即触发HTTP请求
    script.src = url        // 设置脚本的URL
    document.body.appendChild(script);
}
getJSONP.counter = 0;   //用于创建唯一回调函数名称的计数器




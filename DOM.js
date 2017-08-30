//可移植的文档遍历函数
//返回元素e的第n层祖先元素
function parent(e, n) {
    if (n === undefined) n = 1;
    while (n-- && e) e = e.parentNode;
    if (!e || e.nodeType !== 1) return null;
    return e;
}

//一个自动生成的目录表
//这个模块注册一个可在页面加载完成后自动运行的匿名函数。
onload(function () {
    var toc = document.getElementById("TOC");
    if (!toc) {
        toc = document.createElement('div');
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }
    //查找所有的标题元素
    var headings;
    if (document.querySelectorAll)
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    else
        headings = findHeadings(document.body, []);
    function findHeadings(root, sects) {
        for (var c = root.firstChild; c != null; c = c.nextSibling) {
            if (c.nodeType !== 1) continue;
            if (c.tagName.length == 2 && c.tagName.charAt(0) == "H")
                sects.push(c);
            else
                findHeadings(c, sects);
        }
        return sects;
    }
    //初始化一个数组来保持跟踪章节号
    var sectionNumbers = [0, 0, 0, 0, 0, 0];
    //现在，循环已找到的标题元素
    for (var h = 0; h < headings.length; h++) {
        var heading = headings[h];
        //跳过在TOC容器中的标题元素
        if (heading.parentNode == toc) continue;
        //判定标题的级别
        var level = parseInt(heading.tagName.charAt(1));
        if (isNaN(level) || level < 1 || level > 6) continue;

        //对于该标题级别增加sectionNumber对应的数字
        //重置所有标题比它级别低的数字为零
        sectionNumbers[level - 1]++;
        for (var i = level; i < 6; i++) sectionNumbers[i] = 0;
        //将所有标题级别的章节号组合产生一个章节号。如2.3.1
        var sectionNumber = sectionNumbers.slice(0, level).join(".")
        //为标题级别增加章节号
        //把数字放在<span>中，使得其可以用样式修饰
        var span = document.createElement("span");
        span.className = "TOCSectNum";
        span.innerHTML = sectionNumber;
        heading.insertBefore(span, heading.firstChild);

        //用命名的锚点家标题包起来，一边为他增加了链接
        var anchor = document.createElement("a");
        anchor.name = "TOC" + sectionNumber;
        heading.parentNode.insertBefore(anchor, heading);
        anchor.appendChild(heading);

        //现在为该节创建一个链接
        var link = document.createElement("a");
        link.href = "#TOC" + sectionNumber;
        link.innerHTML = heading.innerHTML;

        //将链接放在一个div中，div用基于级别名字的样式修饰
        var entry = document.createElement("div");
        entry.className = "TOCEntry TOCLevel" + level;
        entry.appendChild(link);

        //该div添加到TOC容器中
        toc.appendChild(entry);
    }
}
)


//重置前的提示
{/*
<form onreset="return confirm('really erase All input and start over?')">
    <button type="reset">Clear and Start Over </button>
</form>
*/}

//为Select元素增加一个新的选项，首先用Option（）构造函数创建一个Option对象，然后将其添加到option[]属性中。
var zaire = new Option("Zaire", 'zaire', false, false);
var countries = document.address.country;
countries.options[countries.options.length] = zaire

var title = document.title;
var write = document.write()

//查询选取的文本
function getSelectedText() {
    if (window.getSelection)
        return window.getSelection().toString();
    else if (document.selection)    //IE特有的技术
        return document.selection.createRange().text;
}

//一个HTML元素创建一个可编辑的区域
{/*
<div id="editor" contenteditable>
    Click to editor
</div>
*/}

//使得iframe内部的文档可编辑
{/*
<iframe id="editor" src="about:blank"></iframe>
<script>
    onLoad(function(){
        var editor = document.getElementById("editor");
        editor.contentDocument.designMode = "on";
    })
</script>
*/}





//document.styleSheets[]数组的元素是CSSStyleSheet对象，CSSStyleSheet对象有一个cssRules[]数组，它包含
//样式表的所有规则
var firstRule = document.stylesheets[0].cssRules[0];

document.stylesheets[0].insertRule("H1 {text-weight:bold;}", 0);

//遍历样式表的规则
var ss = document.styleSheets[0];   //得到第一个样式表
var rules = ss.cssRules ? ss.cssRules : ss.rules;   //得到样式表规则
for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    if (!rule.selectorText) continue;    //跳过@import和非样式规则
    var selector = rule.selectorText;   //选择器
    var ruleText = rule.sytle.cssText;  //文本形式的样式

    //如果规则应用在h1元素上，也将其应用在h2元素上
    //注意：仅当选择器在字面上为“h1”时这才起作用
    if (selector == 'h1') {
        if (ss.insertRule) ss.insertRule("h2 {" + ruleText + "}", rules.length);
        else if (ss.addRule) ss.addRule('h2', ruleText, rules.length);
    }
    //如果规则设置了text-decoration属性，则将其删除
    if (rule.style.textDecoration) {
        if (ss.deleteRule) ss.deleteRule(i);
        else if (ss.removeRule) ss.removeRule(i);
        i--;    //调整循环索引，因为以上的规则i+1现在即为规则i
    }
}

//对文档添加一个样式表，用指定的样式填充它
function assStyles(styles) {
    var styleElt, styleSheet;
    if (document.createStyleSheet) {
        styleSheet = document.createStyleSheet();
    } else {
        var head = document.getElementsByTagName('head')[0]
        styleElt = document.createElement('style');
        head.appendChild(styleElt);

        //新的样式表应该是最后一个
        styleSheet = document.stylesheets[document.styleSheets.length - 1]
    }
    //向其中插入样式
    if (typeof styles === "string") {
        //参数是样式表文本
        if (styleElt) styleElt.innerHTML = styles;
        else styleSheet.cssText = styles;   //IE API
    } else {
        //参数是带插入的单独的规则的对象
        var i = 0;
        for (selector in styles) {
            if (styleSheet.insertRule) {
                var rule = selector + "{" + styles[selector] + "}";
                styleSheet.insertRule(rue, i++);
            } else {
                styleSheet.addRule(selector, styles[selector], i++);
            }
        }
    }
}

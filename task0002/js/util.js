/**
 * Created by liangxiaoyu on 16/3/4.
 */
function isArray(arr){
    return Object.prototype.toString.call(arr) === '[object Array]'
}
function isFunction(fn){
    return Object.prototype.toString.call(fn) === '[object Function]'
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var clone = src;
    //处理数组
    if (src instanceof Array) {
        var copy = [];
        for (var i = 0; i < src.length; i++) {
            copy[i] = cloneObject(src[i])
        }
        return copy;
    }
    //处理对象
    if (src instanceof Object) {
        var copy = {}
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                copy[key] = cloneObject(src[key])
            }
        }
        return copy;
    }
//处理日期
    if (src instanceof Date) {
        clone = new Date(src.getDate());
        return clone;
    }
    return clone;
}
/*var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
    */
//2.3对数组实现去重操作



/*function uniqArray(arr){
    var lists= [];

    for(var i = 0;i < arr.lengh;i++)
    {
        if(arr[i] !== ''&&lists.indexOf(arr[i]) < 0) lists.push(arr[i])
    }

    return lists
}
*/
function deleteblank(arr){
    var results = [];
    for(var i = 0;i < arr.length;i++)
    {
        if(arr[i].match(/\s+/) || arr[i] === "")
           continue;
        else{
            results.push(arr[i]);
        }

    }
    return results;
}
function uniqArray(arr){
    var obj = {};
    var lists = [];
    for(var i = 0;i < arr.length;i++){
        var key = arr[i];
        if(!obj[key])
        {
            lists.push(key);
            obj[key] = true;
        }
    }
    return lists
}
/*var a =[1,3,5,7,3,5];

var b = uniqArray(a);
console.log(b);*/
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function trim(str){
  return str.replace(/^\s+|\s+$/g,'');
}
//var str = '   hi!  '
//str = trim(str);
//console.log(str)
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr,fn){
    for(var i in arr){
        fn(arr[i],i);
    }
}
//var arr = ['java', 'c', 'php', 'html'];
//function output(item) {
//    console.log(item)
//}
//each(arr, output);  // java, c, php, html

// 使用示例
/*var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html*/
//获取一个对象里面第一层元素的数量,返回一个整数
function getObjectLength(obj) {
    var count = 0;
    for(var attr in obj){
        if(obj.hasOwnProperty(attr)){
            count ++;
        }
    }
    return count;
}
/*var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj));*/
// 判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.search(/^\w+([-+\.]?\w+)*@(\w+)+[\.]\w{2,7}([\.][a-z]{2,7})?$/i) !== -1;
}
/*var test = "liangxiaoyu0129@163.com.cn";
result = isEmail(test);
console.log(result)*/
function isMobilePhone(phone){
    return phone.search(/^(13[0-9]|15[012356789]|17[678]|14[57])[0-9]{8}/) !== -1;
}
/*var phone = "15202833"
resule = isMobilePhone(phone);
console.log(resule);*/
//3.DOM

function addClass(element,newClassName)
{
    var oldClassName = element.className;
    element.className = oldClassName === "" ? newClassName:oldClassName + " " + newClassName;
}
function hasClassName(element,classname){
    var name = element.className.match(/\S+/g) || [];
    if(name.indexOf(classname) !== -1){
        return true;
    }
    return false;
}
function removeClass(element,oldClassName){
    if (hasClassName(element,oldClassName)){
        element.className = trim(element.className.replace(oldClassName,''));
    }
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
//解决思路直接判断父节点是否相同即可
function isSiblingNode(element,siblingNode){
         return element.parentNode === siblingNode.parentNode;
}
//根据选择器查找元素 返回父节点的第一个子节点
function $(selector){
    if(!selector){
        return null;
    }
    if(selector === document)
        return document;
   selector = selector.trim();//去掉空格
     // selector = trim(selector);
    if(~selector.indexOf(" ")){
        var selectorArray = selector.split("/\s+/");//根据空格把属性分割开
        var rootScope = myQuery(selectorArray[0])
        var result = [];
        for(var i= 1;i < selectorArray.length;i++)
          for(var j=0;j < rootScope.length;j++)
          {
              result.push(myQuery(selectorArray[i],rootScope[j]))
          }
          console.log(result);
        return result[0][0];//返回第一个节点

    }
    else{
        return myQuery(selector,document)[0];
    }
}
function myQuery(selector,root){
    var allChildren  = null;//初始化所有子节点
    var result = [];
    var content = selector.substr(1);//去掉标识符后的所有字符
    var currAttr = null;
    root = root || document;
    switch(selector[0]){
        case "#":
            result.push(root.getElementById(content));
            break;
        case ".":
            //先获取所有元素
            //allChildren = root.getElementsByTagName("*");
            //for(var i = 0;i < allChildren.length;i++)
            //{
            //    currAttr = allChildren[i].getAttribute("class");
            //    //如果是多个属性的
            //    if(currAttr != null){
            //        var currAttrs = currAttr.split("/\s+/");
            //        for(var j = 0;j < currAttrs.length;j++)//按照属性查找
            //        {
            //            if(content === currAttrs[j])
            //            {
            //                result.push(allChildren[i]);
            //                console.log(result);
            //            }
            //        }
            //    }
            //}
            var els = root.getElementsByClassName(content);
            for(var i = 0,k = els.length; i < k; i++ ) {
                result.push(els[i]);
            }

            break;
        case "[":
            //allChildren = root.getElementsByTagName("*");
            if(content.search("=") == -1){
                //遍历所有节点,然后找是否有属性
                //只有属性没有值的情况下
                allChildren = root.getElementsByTagName("*");
                for(var i = 0;i < allChildren.length;i++)
                {
                    if(allChildren[i].getAttribute(selector.slice(1,-1)!== null))
                    { result.push(allChildren[i]);}
                }

            }
            else{
                //分离等号前后内容
                allChildren = root.getElementsByTagName("*");
                var pattern = /\[(.+)=(.+)\]/;//=并不是关键字
                var currAttrStr = selector.match(pattern);
                var key = currAttrStr[0];
                var value = currAttrStr[1];
                for(var i = 0;i < allChildren.length;i++)
                {
                    if(allChildren[i].getAttribute(key) === value)
                    { result.push(allChildren[i]);}
                }
            }
            break;
        default://tag
            result = root.getElementsByTagName(selector);
            break;
    }
    return result;
}
function addEvent(element,event,listener){
    if(element.addEventListener)
    {
        element.addEventListener(event,listener);
    }
    else if(element.attachEvent){
        element.attachEvent('on'+event,listener);
    }
    
}
function removeEvent(element,event,listener){
    if(element.removeEventListener){
        element.removeEventListener(event,listener);
    }
    else if(element.detachEvent){
        element.detachEvent(event,listener);
    }
}
//实现对click事件的绑定
function addClickEvent(element,listener){
    addEvent(element,"click",listener);
}
function addEnterEvent(element,listener){
    addEvent(element,"keyup",function(event){
        event = event || window.event;
        if(event.keyCode == 13){
            listener();
        }
    });
}
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.delegate = delegateEvent;
function clickListener(event){
    console.log("hello world");
}
//事件代理
function delegateEvent(element,tag,eventName,listener)//事件委托
{
    // var event = event || window.event;
    addEvent($(element),eventName,function(event){
        var event  = event || window.event;
        var target = event.target || event.srcElement;
        if(target && target.tagName.toLowerCase() == tag.toLowerCase())
        {
            listener.apply(target,event);//this改为target
        }
    })

}
//BOM相关知识
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var s = navigator.userAgent.toLowerCase();
    console.log(s);
    //使用正则表达式
    var ie = s.match(/msie([\d.]+)/)|| s.match(/rv:([\d.]+)/);
    if(ie){
        return ie[1];
    }
    else return false;
}


// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    var cookie = cookieName + '='+encodeURIComponent(cookieValue);
    var expires = ";expires="+exdate.toUTCString();
    cookie += expires;
    document.cookie = cookie;
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement

       var c_start = document.cookie.indexOf(cookieName),c_end = 0;;
       if(c_start != -1)
       {
           c_start += cookieName.length + 1;//找到value的起始地址
           c_end = document.cookie.indexOf(";",c_start);
           var value = document.cookie.substring(c_start,c_end);
           cvalue = decodeURIComponent(value);
           console.log(cvalue);
       }

    else{return "";}
}
//6.1 封装一个ajax方法
function ajax(url,options)
{

    var method = options.type || 'GET';
    var data = options.data || null;
    method = method.toUpperCase();
    var args = '';//data的处理
    var myurl = '';
    if(typeof data === "string")
    {
        args = data;
    }
    else if(typeof data === "object")
    {
        var arr = new Array();
        for(var key in data){
            v = data[key];
            arr.push(key+'='+v);
        }
        args = arr.join("&");
    }
    myurl = url+ (url.indexOf('?') == -1?'?':'&')+args;
    //创建xmlhttprequest对象
    var xmlhttp;
    xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    //xmlhttp.open(method,url,true);
    if(method === 'GET')//判断method
    {
        xmlhttp.open(method,myurl,true);
         xmlhttp.send(null)

    }
    //如果是post方法
    else if(method === 'POST'){
        xmlhttp.open(method,url,true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(args);
    }
    xmlhttp.onreadystatechang = function(){
        if(xmlhttp.readyState === 4)
          if(xmlhttp.status === 200){
              if(options.onsuccess)
              {
                  options.onsuccess(xmlhttp.requestText,xmlhttp.requestXML);
              }
              else if(options.onfail){
                  options.onfail();
              }
          }
    }
}
//ajax(
//    'http://localhost:63342',
//    {
//        data: {
//            name: 'simon',
//            password: '123456'
//        },
//        onsuccess: function (responseText, xhr) {
//            console.log(responseText);
//        },
//        onfail: function (){
//
//            console.log("failed");
//
//        }
//    }
//);
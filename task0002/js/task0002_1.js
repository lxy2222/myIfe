$.click($("button"),function(){

    var content = $("textarea").value;
    content = trim(content);//去掉空格
    var contentArr = new Array();
    contentArr = content.split(/\n|\s+|,|，|;|；|、/);
    var resultArr = deleteblank(uniqArray(contentArr));
    //取show和warn的内容
    var showContent = $(".show");
    var warnContent = $(".warn");
    showContent.innerHTML = '';//初值
    if(resultArr.length > 10 || resultArr.length <=0)
    {
        showContent.style.display ='none';
        warnContent.style.display = 'block';
    }
    else
    {
        warnContent.style.display = 'none';
        var checkStr = "";
        for(var i=0;i < resultArr.length;i++) {
            checkStr = '<br><input type="checkbox"><lable>' + resultArr[i] + '</lable>';
            showContent.innerHTML += checkStr;

        }
        //要获取的是
        //showContent.innerHTML = checkStr;
        showContent.style.display = "block";


    }
})
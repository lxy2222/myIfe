var imgListDiv =$(".imageBox");
var timerInner = null;
var timer = null;
var activeID = 1;

var circleArr = $(".icoBox").getElementsByTagName("a");
var imgWidth = $("img").offsetWidth;

function startMove(target){
    clearInterval(timerInner);
    timerInner = setInterval(function(){
        var speed = (target - imgListDiv.offsetLeft)/6;
        speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
        //console.log(speed);
        imgListDiv.style.left = imgListDiv.offsetLeft + speed + "px";
    },30);

}
var next = 0;

function rotate(clickID){
    if(clickID){  //如果点击了
        next = clickID;
    }
    else{ //如果没有点击
        next = activeID < 4 ? activeID + 1 : 1;
    }
    //
    //removeClass(circleArr[activeID-1],"active");
    //addClass(circleArr[next-1],"active");
    circleArr[activeID-1].className = '';
    circleArr[next-1].className = 'active';
    //如果哪个id点中了之后,就移动相应的距离
    startMove("-"+(next-1)*imgWidth);
    activeID = next;//循环轮播

}
timer = setInterval(rotate,3000);
for(var i = 0;i < circleArr.length;i++)
{
    circleArr[i].index = i+1;
    console.log(circleArr[i].index);
}
//点击事件使用事件代理
$.delegate(".icoBox", "a","click",function(){
    clearInterval(timer);
    var clickID = this.index;

    console.log(clickID);
    rotate(clickID);
    timer = setInterval(rotate,3000);
})
//var imgListDiv = $(".imageBox");
//var timerInner = null;
//var timer = null;
//var activeID = 1;
//var nextID = 0;
//var imageWidth = $("img").offsetWidth;
//var circleArr = $(".icoBox").getElementsByTagName('a');
//var intervalTime = 3000;
//
//for (var i = 0; i < circleArr.length; i++) {
//    circleArr[i].index = i + 1;
//}
//
//function startMove(target) {
//    clearInterval(timerInner);
//    timerInner = setInterval(function() {
//        var speed = (target - imgListDiv.offsetLeft) / 6;
//        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//
//        imgListDiv.style.left = imgListDiv.offsetLeft + speed + "px";
//    }, 30);
//}
//
//function rotate(clickID) {
//    if (clickID) {
//        nextID = clickID;
//    } else {
//        nextID = activeID <= 4 ? activeID + 1 : 1;
//    }
//
//    removeClass(circleArr[activeID - 1], "active");
//    addClass(circleArr[nextID - 1], "active");
//
//    startMove("-" + (nextID - 1) * imageWidth);
//    activeID = nextID;
//}
//
//timer = setInterval(rotate, intervalTime);
//
//$.delegate(".icoBox", "a", "click", function() {
//    clearInterval(timer);
//    var clickID = this.index;
//    rotate(clickID);
//    timer = setInterval(rotate, intervalTime);
//});

//先定位
//由于拖拽是拖拽大的block中的小block
$.delegate(".left-block","div","mousedown",startDrag);
$.delegate(".right-block","div","mousedown",startDrag);
var oleft = $(".left-block");
var oright = $(".right-block");
function getPosition(element)
{
    var pos = {};
    pos.x = element.getBoundingClientRect().left+Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
    pos.y = element.getBoundingClientRect().top+Math.max(document.documentElement.scrollTop,document.body.scrollTop);
    return pos;
}
function startDrag(event){
    event = event || window.event;
    var target = event.target || event.srcElement;
    if(target.className.toLocaleLowerCase() !== "move")
    {
        return;
    }
    //记录鼠标的位置
    var disX = event.offsetX;
    var disY = event.offsetY;
    //记录当前的位置
    //var divX = target.offsetX;
    //var divY = target.offsetY;
    //拖拽的动作
    target.style.border = "1px solid #000000";
    target.style.opacity = 0.5;


    var clientX = target.clientX;
    var clientY = target.clientY;


    //移动的时候从父元素中移除
    var parent = target.parentNode;
    parent.removeChild(target);
//判断是否超出区域
    if(outofScreen(event)){
        target.parentNode.removeChild(target);
        parent.appendChild(target);
        if(parent.className.search("left-block")!== -1)
        {
            oleft.appendChild(target);
            target.style.left = 1 + "px";

        }
        else if(parent.className.search("right-box")!== -1){
            oright.appendChild(target);
            target.style.left = oright.offsetLeft + 1 + "px";
        }

    }
    $(".drag-block").appendChild(target);
    target.style.top = clientY + 'px';
    target.style.left = clientX + 'px';
    document.onmousemove = function(event){
        var ev = event|| window.event;
        //移动
        target.style.left = ev.clientX - disX+'px';
        target.style.top = ev.clientY - disY+'px';
    }

    document.onmouseup = function(event){
          document.onmousemove = null;
          document.onmousedown = null;
          target.style.opacity = 1;
          target.style.border = "none";
          target.style.borderBottom ="1px solid #000000";
          //判断是否已经移到了目标区域
          var event = event || window.event;
          target.parentNode.removeChild(target);
          //parent.removeChild(target);
          if(isIntheArea(event.clientX,event.clientY,oleft)){
              oleft.appendChild(target);
              //把边框的距离考虑到
              target.style.left = 1 + "px";
          }else if(isIntheArea(event.clientX,event.clientY,oright))
          {
              oright.appendChild(target);
              target.style.left = oright.offsetLeft + 1 + "px";
          }
          //如果不在目标区域内那么
         else{
              //要移动的这个元素
             parent.appendChild(target);
             if(parent.className.search("left-block")!== -1)
             {
                 target.style.left = 1 + "px";
             }
              else if(parent.className.search("right-block")!== -1)
             {
                 target.style.left = oright.offsetLeft + 1 + "px";
             }

          }

    }


}
//判断是否超出屏幕范围
function outofScreen(e){
    var e = event || window.event;
    var maxW = document.documentElement.clientWidth;
    var maxH = document.documentElement.clientHeight;
    var x = e.clientX,
        y = e.clientY;
    return x <= 0 || x > maxW || y <= 0 || y > maxH;

}
//x,y当前鼠标的坐标,block:块的名称
function isIntheArea(x,y,block)
{
    var x0 = getPosition(block).x;
    var x1 = getPosition(block).x+block.offsetWidth;
    var y0 = getPosition(block).y;
    var y1 = getPosition(block).y + block.offsetHeight;
    return x>x0 && x < x1 && y > y0 && y < y1;

}
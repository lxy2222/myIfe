/**
 * {string}title 浮层标题
 * {string}content 浮层内容
 * {Function}confirmback点击确定按钮后的回调函数
 */
function Surface(title, content, confirmback) {
	var shade = document.createElement('div');//创建遮罩层
	shade.className = "shade";
	var surface = document.createElement('div');
	surface.className = 'surface';
	surface.innerHTML = "<header id='Header'>"+title+"</header><article><p>"+content+"</p></article><footer><button class='surface-button' id='cancel'>取消</button><button class='surface-button' id='confirm'>确定</button></footer>";
	shade.appendChild(surface);
	document.body.appendChild(shade);//加入到body中
	//创造浮层之后就要绑定事件了
	//判断目标是不是在浮层上，否则关闭
	shade.addEventListener('click', function(ev){
		 var target= ev.target || ev.srcElement;
		 if(target === this)
		 {
		 	this.parentNode.removeChild(this);
		 }
         
	});
	//给两个按钮加事件
	document.getElementById("confirm").addEventListener('click', function(){
		shade.parentNode.removeChild(shade);
		confirmback();
	});
    document.getElementById("cancel").addEventListener('click', function(){
    	shade.parentNode.removeChild(shade);
    	confirmback();
    });
    //设定为只能在头部区域拖拽
    var oHeader = document.getElementById('Header');
    oHeader.onmousedown = function(ev) {
    	event = ev || window.event;
    	//光标按下时光标和面板的距离
    	disX = event.clientX - surface.offsetLeft;
    	disY = event.clientY - surface.offsetTop;
    	document.onmousemove = function(ev)
    	{
               event = ev || window.event;
   //             l = event.clientX - disX;
			//     h = event.clientY - disY;
			// 	winW = document.documentElement.clientWidth || document.body.clientWidth;
			// 	winH = document.documentElement.clientHeight || document.body.clientHeight;
			// 	maxW = winW - surface.offsetWidth;
			// 	maxH = winH - surface.offsetHeight;
			// 	if(l < 0)
			// 	{
			// 		l = 0;
			// 	}
			// 	else if(l > maxW)
			// 	{
			// 		l = maxW;
			// 	}
			// 	if(h < 0)
			// 	{
			// 		h = 0;
			// 	}
			// 	else if(h > maxH)
			// 	{
			// 		h = maxH;
			// 	}
			// surface.style.left = l + 'px';
			// surface.style.top  = h + 'px';
			fndown(event,disX,disY);

    	};
    	//释放鼠标
    	document.onmouseup = function(){
    		document.onmousemove = null;
    		document.onmouseup = null;
    	};
    };
     return shade;
}
function fndown(e,posX,posY) {
	event = e || window.event;
	l = event.clientX - posX;
	h = event.clientY - posY;
	var oDrag = document.getElementsByClassName('surface')[0];
	winW = document.documentElement.clientWidth || document.body.clientWidth;
	winH = document.documentElement.clientHeight || document.body.clientHeight;
	maxW = winW - oDrag.offsetWidth;
	maxH = winH - oDrag.offsetHeight;
	if(l < 0)
	{
		l = 0;
	}
	else if(l > maxW)
	{
		l = maxW;
	}
	if(h < 0)
	{
		h = 0;
	}
	else if(h > maxH)
	{
		h = maxH;
	}
	console.log(oDrag);
	oDrag.style.left = l + 'px';
	oDrag.style.top = h + 'px';
}
document.querySelector('#showSurface').addEventListener('click', function(){
	Surface('这是一个浮出层','我是内容',function(){});
});
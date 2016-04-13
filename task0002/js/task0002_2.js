var clock;
$.click($("button"),function(){
    clearInterval(clock);
    var inputValue = $("input").value;
    var showDiv = $(".show");
    //每次点击一次button就要清一次时间
    var pattern = /^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[0,1]))$/;
    if(pattern.test(inputValue)) {
        var futureTime = new Date(inputValue);
        var futureTimeArr = inputValue.split("-");
        clock = setInterval(count,1000);
        function count() {
            var currentTime = new Date();
            var timeMinus = futureTime - currentTime;
            if (timeMinus < 0) {
                clearInterval(clock);
                showDiv.innerHTML = "请输入未来的某一天";
                return;
            }
            else if (timeMinus === 0) {
                clearInterval(clock);
                showDiv.innerHTML = "距离" + futureTimeArr[0] + "年" + futureTimeArr[1] + "月" + futureTimeArr[2] + "日还有0天0小时0分0秒";
                return;
            }
            else {
                var day = Math.floor(timeMinus / 1000 / 3600 / 24);
                var afterDay = timeMinus - day * 1000 * 3600 * 24;
                var hour = Math.floor(afterDay / 1000 / 3600);
                var afterhour = timeMinus - day * 1000 * 3600 * 24 - hour * 1000 * 3600;
                var minute = Math.floor(afterhour / 1000 / 60);
                var afterminute = timeMinus - day * 1000 * 3600 * 24 - hour * 1000 * 3600 - minute * 1000 * 60;
                var second = Math.floor(afterminute / 1000);
                showDiv.innerHTML = "距离" + futureTimeArr[0] + "年" + futureTimeArr[1] + "月" + futureTimeArr[2] + "日还有" + day + "日" + hour + "时" + minute + "分" + second + "秒";

            }
        }
    }
    else{
        showDiv.innerHTML = "请输入正确的时间格式";
    }

})
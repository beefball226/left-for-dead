$(function() {
    var video = $("video")[0];
    var bar = $("#bar");
    var barIn = $("#barin");
    var barS = $("#bar span");
    var play = $("#play");
    var stop = $("#stop");
    video.addEventListener("canplay", function() {
        var timeAll = video.duration;
        //点击播放按钮
        play.click(function() {
            stop.fadeIn(50);
            $(this).fadeOut(50);
            video.play();
        });
        stop.click(function() {
                stop.fadeOut(50);
                play.fadeIn(50);
                video.pause();
            })
            //鼠标经过进度条的时候进度条出现
        bar.hover(
            function() {
                $(this).animate({
                    height: "5px"
                }, 50);
                barIn.animate({
                    height: "5px"
                }, 50);
                barS.fadeIn(50);
            },
            function() {
                $(this).animate({
                    height: "2px"
                }, 50);
                barIn.animate({
                    height: "2px"
                }, 50);
                barS.fadeOut(50);
            });
        //当点击进度条时进度条进入鼠标位置
        bar.click(function(e) {
            // var length = e.pageX - bar.offset().left;
            // barIn.css("width", length + "px");
            // barS.css("left", length - barS.width() / 2 + "px");
            // video.currentTime = barIn.width() / bar.width() * timeAll;
            var mouse = parseInt(e.pageX - $(this).offset().left);
            if (mouse < 7.5) {
                mouse = 7.5
            }
            if (mouse > bar.width() - 7.5) {

                mouse = bar.width() - 7.5

            }
            barS.css("left", mouse + "px" - barS.width() / 2);
            barIn.css("width", mouse + "px");


            console.log(mouse);
            video.currentTime = barIn.width() / bar.width() * timeAll;
        });
        //同步视频播放与进度条
        video.addEventListener("timeupdate", function() {
            var timeNow = video.currentTime;
            barIn.css("width", timeNow / timeAll * bar.width() + "px");
            barS.css("left", timeNow / timeAll * bar.width() + "px");
        })
    })












})
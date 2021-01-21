$(function() {
    var video = $("video")[0];
    var player = $("#player");
    var play = $("#play");
    var stop = $("#stop");
    var bar = $("#bar");
    var barS = $("#bar span");
    var barIn = $("#barin");
    var timer = $("#timer");
    var full = $("#full");
    var soundIn = $("#onin span");
    var onIn = $("#onin");
    var sound = $("#sound");
    var soundOn = $("#soundon");
    var speed = $("#speed span");
    var speedBig = $("#speed");
    var speedIn = $("#speedin");
    var speedL = $("#speed li");
    var speedAll = [2, 1, .7, .5, .2];


    // console.log(video.currentTime);
    // var video = $("video");
    //鼠标经过视频进度条时进度条变大，圆点出现

    //时间同步
    //获取视频总时间
    video.addEventListener("canplay", function() {
        //获取总时长
        video.removeEventListener("canplay", arguments.callee);
        var vid = video.duration;

        if (video.paused) {
            play.fadeIn();
            stop.fadeOut();

        } else {
            play.fadeOut();
            stop.fadeIn();
        }



        bar.hover(function() {
                bar.animate({ height: "5px" }, 50);
                barIn.animate({ height: "5px" }, 50);
                barS.fadeIn(50);
            },
            function() {
                bar.animate({ height: "2px" }, 50);
                barIn.animate({ height: "2px" }, 50);
                barS.fadeOut(50);
            })
        barIn.hover(function() {
                    bar.animate({ height: "5px" }, 50);
                    barIn.animate({ height: "5px" }, 50);
                    barS.fadeIn(50);
                },
                function() {
                    bar.animate({ height: "2px" }, 50);
                    barIn.animate({ height: "2px" }, 50);
                    barS.fadeOut(50);
                })
            //鼠标点击进度条时圆点和已播放进度条跳到相应位置
        bar.click(function(e) {
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
            video.currentTime = barIn.width() / bar.width() * vid;
        })
        video.addEventListener("ended", function() {
                play.fadeIn();
                stop.fadeOut();

            })
            //鼠标点击播放按钮的时候切换图标
        play.click(function() {
            $(this).fadeOut();
            stop.fadeIn();
            video.play();
        })
        stop.click(function() {
            play.fadeIn();
            $(this).fadeOut();
            video.pause();
        })




        //获取视频总时长 
        //视频的秒数
        //视频的分钟数
        // console.log(video);
        function setTime() {
            var nvid = video.currentTime;
            var vidSec = parseInt(video.duration % 60);
            var vidMin = parseInt(video.duration / 60);
            var curSec = parseInt(nvid % 60);
            var curMin = parseInt(nvid / 60);
            var time = (curMin + ":" + curSec + "/" + vidMin + ":" + vidSec);
            // console.log(nvid);
            return time;
        }


        //全屏按钮
        full.click(function() {
            video.webkitRequestFullscreen();
        })

        //当视频发生改变时执行函数
        video.addEventListener('timeupdate', function() {
            //已播放进度条
            barIn.css("width", video.currentTime / vid * bar.width())
                //小圆圈
            barS.css("left", video.currentTime / vid * bar.width() - barS.width() / 2)

            //定位进度按钮
            // setHandle();
            //设置进度条
            // setPress();
            //设置时间
            var times = setTime();
            timer.html(times);

        })

        //鼠标移入音量键时音量框弹出
        sound.hover(
            function() {
                soundOn.fadeIn(50);
            },
            function() {
                soundOn.fadeOut(50);
            }
        )

        //鼠标点击时音量进度条变化
        onIn.click(function(e) {
                var souPos = parseInt(e.pageY - $(this).offset().top);
                if (souPos < 5) {
                    souPos = 5;
                }
                if (souPos > onIn.height() - 5) {

                    souPos = onIn.height() - 5;

                }
                soundIn.css("top", souPos - soundIn.height() / 2 + "px");
                video.volume = (1 - souPos / parseInt(onIn.height())).toFixed(1);

                if (video.volume == 0) {

                    $("#close").fadeIn(50);
                    $("#open").fadeOut(50);
                } //{
                if (video.volume > 0) {

                    $("#open").fadeIn(50);
                    $("#close").fadeOut(50);
                }

            })
            //鼠标点击小喇叭时改变状态
            //点击开始视频播放，图标变为暂停
        $("#open").click(function() {
            $("#open").fadeOut(50);
            $("#close").fadeIn(50);
            video.volume = 0;

        });
        //点击暂停视频停止，图标变为开始
        $("#close").click(function(e) {
            var souPos = parseInt(e.pageY - $(this).offset().top);
            $("#close").fadeOut(50);
            $("#open").fadeIn(50);
            video.volume = (1 - souPos / parseInt(onIn.height())).toFixed(1);
        })
        console.log(video.defaultPlaybackRate);
        //鼠标经过倍速是弹出倍速框
        speed.hover(function() {
                    $(this).css("color", "red");

                },
                function() {
                    $(this).css("color", "white");

                })
            //鼠标经过4

        speedBig.hover(function() {
                $(speedIn).fadeIn(50);


            }, function() {
                $(speedIn).fadeOut(50);

            })
            //点击倍速图标时切换倍速
            // console.log(speedL[i]);
            //遍历
        $.each(speedL, function() {
            var i = $(this).index();
            console.log($(this).index());
            console.log(i);
            //点击同下标li时转变为指定速度
            $(speedL).eq(i).click(function() {
                    video.playbackRate = speedAll[i];
                    console.log($(speedAll).eq(i));
                })
                //鼠标经过时字体颜色改变
            $(speedL).eq(i).hover(function() {
                    $(this).css("color", "red");

                },
                function() {
                    $(this).css("color", "white");



                })

        })
    })
})
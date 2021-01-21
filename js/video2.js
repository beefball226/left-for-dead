$(function() {
    var video = $("video")[0];
    var bar = $("#bar");
    var barIn = $("#barin");
    var barS = $("#bar span");
    var play = $("#play");
    var stop = $("#stop");
    var sound = $("#sound");
    var soundOn = $("#soundon");
    var onIn = $("#onin");
    var onInS = $("#onin span");
    var open = $("#open");
    var close = $("#close");
    video.addEventListener("canplay", function() {
        video.removeEventListener("canplay", arguments.callee);
        var timeAll = video.duration;
        play.click(function() {
            $(this).fadeOut();
            stop.fadeIn();
            video.play();
        })
        stop.click(function() {
            $(this).fadeOut();
            play.fadeIn();
            video.pause();
        })
        bar.hover(function() {
            bar.animate({ height: "5px" }, 50);
            barIn.animate({ height: "5px" }, 50);
            barS.fadeIn();

        }, function() {
            bar.animate({ height: "2px" }, 50);
            barIn.animate({ height: "2px" }, 50);
            barS.fadeOut();
        })
        bar.click(function(e) {
            var mouse = e.pageX - bar.offset().left;
            barIn.css("width", mouse);
            barS.css("left", mouse - barS.width() / 2);
            video.currentTime = barIn.width() / bar.width() * timeAll;
            if (mouse < 7.5) {
                mouse = 7.5
            }
            if (mouse > barIn.width() - 7.5) {

                mouse = barIn.width() - 7.5

            }
        })
        sound.hover(function() {
            soundOn.fadeIn(50);
        }, function() {
            soundOn.fadeOut(50);
        })
        open.click(function() {
            open.fadeOut();
            close.fadeIn();
            video.vomule = 0;
        })
        close.click(function() {
            close.fadeOut();
            open.fadeIn();
        })
        onIn.click(function(e) {
            var soundMouse = pageY - onIn.offset.height();




        })





        video.addEventListener("timeupdate", function() {
            barIn.css("width", video.currentTime / timeAll * bar.width());
            barS.css("left", video.currentTime / timeAll * bar.width() - barS.width() / 2);
        })











    })











})
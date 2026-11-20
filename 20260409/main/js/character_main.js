$(function () {


    //角色介紹_tab 
    $(".character .nav_box_1 .nav_tab").click(function () {
        var list = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".character .tab_content").eq(list).addClass("active").siblings().removeClass("active");
    });




    //---------主角團_swiper---------//
    //人頭選項
    page17NavSwiper_1 = new Swiper('.page17NavSwiper_1', {
        spaceBetween: 10,
        slidesPerView: 3,
        slideToClickedSlide: true,
        allowTouchMove: false,
        loop: true,
        loopedSlides: 4,
    });


    //大圖
    page17Swiper1 = new Swiper('.content_box_1 .page17Swiper', {
        effect: 'fade',
        loop: true,
        centeredSlides: true,
        slidesPerView: 1,
        slideToClickedSlide: true,
        allowTouchMove: false,
        loopedSlides: 4,

        allowTouchMove: false,
        /*simulateTouch: false,*/

        /*autoplay: {
            delay: 2000,
            disableOnInteraction: true,
        },*/

        navigation: {
            nextEl: '.content_box_1 .page17Next',
            prevEl: '.content_box_1 .page17Prev',
        },
        on: {
            init: function () {
                swiperAnimateCache(this);
                swiperAnimate(this);
            },
            slideChangeTransitionEnd: function () {
                swiperAnimate(this);
            },
        },

    });

    page17Swiper1.controller.control = page17NavSwiper_1;
    page17NavSwiper_1.controller.control = page17Swiper1









    //---------怪盜偶像_swiper---------//
    //人頭選項
    page17NavSwiper_2 = new Swiper('.content_box_2 .page17NavSwiper_2', {
        spaceBetween: 10,
        slidesPerView: 3,
        slideToClickedSlide: true,
        allowTouchMove: false,
        loop: true,
        loopedSlides: 13,
    });


    //大圖
    page17Swiper2 = new Swiper('.content_box_2 .page17Swiper_2', {
        effect: 'fade',
        loop: true,
        centeredSlides: true,
        slidesPerView: 1,
        slideToClickedSlide: true,
        allowTouchMove: false,
        loopedSlides: 13,

        allowTouchMove: false,
        /*simulateTouch: false,*/

        /*autoplay: {
            delay: 2000,
            disableOnInteraction: true,
        },*/

        navigation: {
            nextEl: '.content_box_2 .page17Next2',
            prevEl: '.content_box_2 .page17Prev2',
        },


    });

    page17Swiper2.controller.control = page17NavSwiper_2;
    page17NavSwiper_2.controller.control = page17Swiper2









    //---------心之怪盜團_swiper---------//
    //人頭選項
    page17NavSwiper_3 = new Swiper('.content_box_3 .page17NavSwiper_3', {
        spaceBetween: 10,
        slidesPerView: 3,
        slideToClickedSlide: true,
        allowTouchMove: false,
        loop: true,
        loopedSlides: 8,
    });


    //大圖
    page17Swiper3 = new Swiper('.content_box_3 .page17Swiper_3', {
        effect: 'fade',
        loop: true,
        centeredSlides: true,
        slidesPerView: 1,
        slideToClickedSlide: true,
        allowTouchMove: false,
        loopedSlides: 8,

        allowTouchMove: false,
        /*simulateTouch: false,*/

        /*autoplay: {
            delay: 2000,
            disableOnInteraction: true,
        },*/

        navigation: {
            nextEl: '.content_box_3 .page17Next3',
            prevEl: '.content_box_3 .page17Prev3',
        },


    });

    page17Swiper3.controller.control = page17NavSwiper_3;
    page17NavSwiper_3.controller.control = page17Swiper3









    // 重製
    $(".ch_tab_arr").on("click", function () {
        setTimeout(function () {
            $('.chara_rie_1').removeClass("hide").addClass("show");
            $('.chara_rie_2').removeClass("show").addClass("hide");
            $(".mark_role").removeClass("show").addClass("hide");
            $(".ch_info_box").fadeIn();
            $(".info_show_btn").fadeOut();
            $(".role_change").removeClass("on");
        }, 500);
    });


    // 切換服裝
    $(".role_change").on("click", function () {

        $(this).toggleClass("on");
        if ($(this).hasClass("on")) {
            $(this).siblings(".chara_rie_1").removeClass("show").addClass("hide");
            $(this).siblings(".chara_rie_2").removeClass("hide").addClass("show");
            $(this).siblings(".ch_info_box").find(".mark_role").removeClass("hide").addClass("show");

        } else {
            $(this).siblings(".chara_rie_1").removeClass("hide").addClass("show");
            $(this).siblings(".chara_rie_2").removeClass("show").addClass("hide");
            $(this).siblings(".ch_info_box").find(".mark_role").removeClass("show").addClass("hide");
        }
    });


    // 顯示隱藏人物介紹
    $(".info_hide_btn").on("click", function () {
        $(".info_show_btn").fadeIn();
        $(".ch_info_box").fadeOut();
    });

    $(".info_show_btn").on("click", function () {
        $(".ch_info_box").fadeIn();
        $(".info_show_btn").fadeOut();
    });




    //語音
    $(function () {
        // 获取背景音乐元素
        const musicBg = document.getElementById("bg_music");
    
        // 阻止多个音频同时播放
        $('audio').on('play', function () {
            $('audio').not(this).each(function () {
                this.pause();
                /*this.currentTime = 0;*/
            });
        });
    
        // 处理点击.cv_audio时的行为
        $(".cv_audio").click(function () {
            const vocalCv = $(this).find('.vocal_cv')[0]; // 获取当前.cv_audio下的.vocal_cv元素
            const wasMusicPlaying = !musicBg.paused; // 检查背景音乐是否在播放
    
            // 暂停其他的.vocal_cv元素
            $('.vocal_cv').not(vocalCv).each(function () {
                this.pause();
                this.currentTime = 0;
            });
    
            // 播放当前点击的语音
            vocalCv.play();
    
            // 如果背景音乐正在播放，则暂停
            if (wasMusicPlaying) {
                musicBg.pause();
            }
    
            // 当语音播放完成时
            vocalCv.onended = function () {
                // 如果背景音乐原本是播放状态，恢复播放
                if (wasMusicPlaying) {
                    musicBg.play();
                }
            };
        });
    });
    
      
      



})
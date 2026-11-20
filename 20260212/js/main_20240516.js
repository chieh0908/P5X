$(function () {

  //網頁讀取時_bs彈窗出現
  //$(window).on('load', function () {
  $(document).ready(function () {
    $('#site_in_modal').modal('show');
  });

  //直接用JS關閉bs彈窗
  /*$("#site_in_modal .dw_btn_close").click(function () {
    $('#site_in_modal').modal('hide'); //bs彈窗關閉
  });*/



  // wow.js
  new WOW().init();


  // 導航 PC
  $("nav .content.pc .menu").on("click", function () {
    $("body, html").animate({
      scrollTop: $($.attr(this, "href")).offset().top - 150
    }, 200);
    return false;
  });

  // 導航 MOB
  $("nav .content.mob .menu").on("click", function () {
    $(".menu_mob").addClass("on");
  });
  $(".menu_mob .pop_close").on("click", function () {
    $(".menu_mob").removeClass("on");
  });
  $("nav .content.mob a").on("click", function () {
    $("body, html").animate({
      scrollTop: $($.attr(this, "href")).offset().top - 150
    }, 200);
    $(".menu_mob").removeClass("on");
    return false;
  });


  // music
  const musicBg = document.getElementById("bg_music");
  const btnMusic = $(".btn_music");
  let isPlayMusic = false;
  let isMusicPaused = false;
  let isLityOpen = false;
  let isMusicInLity = false;
  let isPausedDueToVisibilityChange;

  const startMusic = () => {
    musicBg.play();
    btnMusic.removeClass("off");
    isPlayMusic = true;
    isMusicPaused = false;
    isMusicInLity = false;
  };
  const pauseMusic = () => {
    musicBg.pause();
    btnMusic.addClass("off");
    isPlayMusic = false;
    isMusicPaused = true;
    isMusicInLity = false;
  };
  const toggleMusic = () => {
    isPlayMusic ? pauseMusic() : startMusic();
  };

  const onVisibilityChange = () => {
    const isHidden = document.hidden;
    if (isHidden) {
      isPausedDueToVisibilityChange = musicBg.paused;
      pauseMusic();
    } else {
      if (!isPausedDueToVisibilityChange) {
        startMusic();
      }
    }
  };

  const onLityOpen = () => {
    isLityOpen = true;
    if (isPlayMusic) {
      pauseMusic();
      isMusicInLity = true;
    }
  };

  const onLityClose = () => {
    isLityOpen = false;
    if (isMusicInLity) {
      startMusic();
      isMusicInLity = false;
    } else if (isPausedDueToVisibilityChange) {
      pauseMusic();
      isPausedDueToVisibilityChange = false;
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  $(document).on("lity:open", onLityOpen);
  $(document).on("lity:close", onLityClose);
  btnMusic.on("click", toggleMusic);

  $("body").one("click", (e) => {
    if (!isPlayMusic) {
      startMusic();
    }
  });




  // fixed_bg
  if (window.innerWidth <= 750) {
    $(".fixed_bg").remove();
  } else {
    $(".fixed_bg").append(
      '<video loop autoplay muted src="https://images1.iwplay.com.tw/image/p5x/main/media/p5x_bgstar_20230301.mp4"></video>'
    );
  }



  // btn
  $(".btn_prelogin").addClass("fadein");

  // news_tab
  $(".news_list li").click(function () {
    var list = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".news_list_item").eq(list).addClass("active").siblings().removeClass("active");
  });

  // news_content
  $("#latest").load("https://www.p5x.com.tw/news/indexS.html");
  $("#news_info").load("https://www.p5x.com.tw/news/indexS_1.html");
  $("#event").load("https://www.p5x.com.tw/news/indexS_3.html");
  $("#system").load("https://www.p5x.com.tw/news/indexS_2.html");

  // banner
  const now = new Date();
  $(".banner").load("https://www.p5x.com.tw/CmsBanner/ubanner_A.html", function () {
    let innerList = document.querySelectorAll(`#ubanner_A > div > .carousel-inner > div`);
    let indicatorsList = document.querySelectorAll(`#ubanner_A > div > .carousel-indicators > li`);
    for (let i = 0; i < innerList.length; i++) {
      let onTime = new Date(innerList[i].getAttribute("on"));
      let offTime = new Date(innerList[i].getAttribute("off"));
      if (now < onTime || now > offTime) {
        if (innerList[i].classList.contains("active")) {
          innerList[i + 1].classList.add("active");
          indicatorsList[i + 1].classList.add("active");
        }
        innerList[i].remove()
        indicatorsList[i].remove()
      }
    }
  });








  // 校園生活
  var school_wrap = new Swiper(".school_wrap", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    allowTouchMove: false,
    watchOverflow: true,
    navigation: {
      prevEl: ".school .swiper-button-prev",
      nextEl: ".school .swiper-button-next",
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



  // 異世界之旅
  var metaverse_wrap = new Swiper(".metaverse_wrap", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    allowTouchMove: false,
    watchOverflow: true,
    navigation: {
      prevEl: ".metaverse .swiper-button-prev",
      nextEl: ".metaverse .swiper-button-next",
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

  // 返回頂端
  $(window).scroll(function () {
    var t = $(window).scrollTop();
    var h = $(window).height();
    if (t > 900) {
      $(".go_top").stop(true, true).fadeIn();
    } else {
      $(".go_top").stop(true, true).fadeOut();
    }
  });
  $(".go_top").on("click", function () {
    $("body, html").animate({
      scrollTop: 0
    }, 200);
  });

  // gameinfo
  /*$(".gameinfo").load("https://ids.iwplay.com.tw/common/p5x/gameinfo.html", function () {
      $(".google_play").attr("href", text.google_play);
      $(".app_store").attr("href", text.app_store);
      $(".apk").attr("href", text.apk);
    }
  );*/

  // footer
  $("footer").load("https://ids.iwplay.com.tw/includ/footer/12b_p5x.html");

  // aside
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 350) {
      $('.noke_flex_sp').addClass('scroll')
    } else {
      $('.noke_flex_sp').removeClass('scroll')
    }
  });

  // 彈出框：大圖
  $(".thumbnail_box").on("click", function () {
    var link = $(this).attr("link");
    $(".pop_bigPic_cont img").attr("src", link);
    $("#pop_bigPic").fadeIn();
  });
  // 關閉視窗
  $(".pop_close").on("click", function () {
    $(this).closest(".pop").fadeOut();
  });

});
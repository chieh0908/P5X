$(function () {
  //角色介紹_tab
  $(".character .nav_box_1 .nav_tab").click(function () {
    var list = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".character .tab_content")
      .eq(list)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  //---------主角團_swiper---------//
  //人頭選項
  page17NavSwiper_1 = new Swiper(".page17NavSwiper_1", {
    spaceBetween: 10,
    slidesPerView: 3,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loop: true,
    loopedSlides: 6,
  });

  //大圖
  page17Swiper1 = new Swiper(".content_box_1 .page17Swiper", {
    effect: "fade",
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loopedSlides: 6,
    allowTouchMove: false,
    navigation: {
      nextEl: ".content_box_1 .page17Next",
      prevEl: ".content_box_1 .page17Prev",
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
  page17NavSwiper_1.controller.control = page17Swiper1;





  //---------怪盜偶像_swiper---------//

  // 安全取得 slide 數量（保留，之後可能需要用到）
  const swiper2SlideCount = document.querySelectorAll('.content_box_2 .page17Swiper_2 .swiper-slide').length;

  // 人頭選項 Swiper（取消 loop）
  page17NavSwiper_2 = new Swiper(".content_box_2 .page17NavSwiper_2", {
    spaceBetween: 10,
    slidesPerView: 3,
    slideToClickedSlide: false,
    allowTouchMove: false,
    loop: false,
    watchOverflow: true,
  });

  // 大圖 Swiper（取消 loop）
  page17Swiper2 = new Swiper(".content_box_2 .page17Swiper_2", {
    effect: "fade",
    loop: false,
    centeredSlides: false,
    slidesPerView: 1,
    slideToClickedSlide: true,
    allowTouchMove: false,
    watchOverflow: true,
    navigation: {
      nextEl: ".content_box_2 .page17Next2",
      prevEl: ".content_box_2 .page17Prev2",
    },
  });

  // 兩個 Swiper 互控維持
  page17Swiper2.controller.control = page17NavSwiper_2;
  page17NavSwiper_2.controller.control = page17Swiper2;



  // 只要在 tab 2 init 後放即可
  (function mapNavToMainForTab2() {
    const mainSlides = Array.from(document.querySelectorAll('.content_box_2 .page17Swiper_2 .swiper-slide'));
    // 建立：數字 -> 大圖索引 的對映（例如 10 => 你現在的第 N 張）
    const num2mainIdx = new Map(mainSlides.map((el, idx) => {
      const cls = Array.from(el.classList).find(c => c.startsWith('page17Slider_'));
      return [parseInt(cls.split('_')[1], 10), idx];
    }));

    // 代理 Nav 的點擊，依 r_數字 找到大圖對應索引
    document.querySelectorAll('.content_box_2 .page17NavSwiper_2 .swiper-slide').forEach(slide => {
      slide.addEventListener('click', () => {
        const rClass = Array.from(slide.classList).find(c => c.startsWith('r_'));
        const num = parseInt(rClass.split('_')[1], 10);
        const target = num2mainIdx.get(num);
        if (typeof target === 'number') page17Swiper2.slideTo(target);
      });
    });
  })();



  // 點擊「怪盜偶像」標籤時：更新尺寸 + 強制回到第 1 張（index 0）
  $(".nav_2.nav_tab").on("click", function () {
    setTimeout(() => {
      page17Swiper2.update();
      page17NavSwiper_2.update();
      page17Swiper2.updateSize();
      page17Swiper2.slideTo(0, 0); // ← 取代原本的 slideToLoop(23)
    }, 100);
  });



  //---------心之怪盜團_swiper---------//
  //人頭選項
  page17NavSwiper_3 = new Swiper(".content_box_3 .page17NavSwiper_3", {
    spaceBetween: 10,
    slidesPerView: 3,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loop: true,
    loopedSlides: 10,
  });
  //大圖
  page17Swiper3 = new Swiper(".content_box_3 .page17Swiper_3", {
    effect: "fade",
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loopedSlides: 10,
    allowTouchMove: false,
    navigation: {
      nextEl: ".content_box_3 .page17Next3",
      prevEl: ".content_box_3 .page17Prev3",
    },
  });

  page17Swiper3.controller.control = page17NavSwiper_3;
  page17NavSwiper_3.controller.control = page17Swiper3;





  //---------S.E.E.S_swiper---------//
  //人頭選項
  page17NavSwiper_4 = new Swiper(".content_box_4 .page17NavSwiper_4", {
    spaceBetween: 10,
    slidesPerView: 3,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loop: true,
    loopedSlides: 10,
  });
  //大圖
  page17Swiper4 = new Swiper(".content_box_4 .page17Swiper_4", {
    effect: "fade",
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loopedSlides: 10,
    allowTouchMove: false,
    navigation: {
      nextEl: ".content_box_4 .page17Next4",
      prevEl: ".content_box_4 .page17Prev4",
    },
  });

  page17Swiper4.controller.control = page17NavSwiper_4;
  page17NavSwiper_4.controller.control = page17Swiper4;


  //---------天鵝絨房間_swiper (Tab 5)---------//
  //人頭選項
  page17NavSwiper_5 = new Swiper(".content_box_5 .page17NavSwiper_5", {
    spaceBetween: 10,
    slidesPerView: 3,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loop: true,
    loopedSlides: 10,
  });
  //大圖
  page17Swiper5 = new Swiper(".content_box_5 .page17Swiper_5", {
    effect: "fade",
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loopedSlides: 10,
    allowTouchMove: false,
    navigation: {
      nextEl: ".content_box_5 .page17Next5",
      prevEl: ".content_box_5 .page17Prev5",
    },
  });

  page17Swiper5.controller.control = page17NavSwiper_5;
  page17NavSwiper_5.controller.control = page17Swiper5;

  $(".nav_5.nav_tab").on("click", function () {
    setTimeout(() => {
      page17Swiper5.update();
      page17NavSwiper_5.update();
      page17Swiper5.slideTo(0, 0); 
    }, 100);
  });


  // 點擊「怪盜偶像」標籤，自動切換新版本角色
  /*$(".nav_2.nav_tab").on("click", function () {
    setTimeout(() => {
      page17Swiper2.update();
      page17NavSwiper_2.update();
      page17Swiper2.updateSize(); // 確保顯示區尺寸正確
  
      const targetIndex = 23;
      page17Swiper2.slideToLoop(targetIndex); // loop 模式下的安全切換
    }, 100); // 延遲以確保 Swiper 初始化完成
  });*/

  // $(".nav_4.nav_tab").on("click", function () {
  //   setTimeout(() => {
  //     page17Swiper4.slideTo(0, 0); // ← 取代原本的 slideToLoop(23)
  //   }, 100);
  // });

  //查找P5X角色索引
  $(".ch_tab_arr").on("click", function () {
    // console.log(page17Swiper1.activeIndex);
    // console.log(page17Swiper2.activeIndex);
    // console.log(page17Swiper3.activeIndex);
  });




  //::::::重製第三類型的人::::::
  $(
    ".ch_tab_arr, .nav_box_1, .page17NavSwiper_1, .page17NavSwiper_2, .page17NavSwiper_3"
  ).on("click", function () {
    setTimeout(function () {
      // 情況 A: chara_rie_1 和 chara_rie_2 存在，但沒有 chara_rie_3
      $(
        ".swiper-slide:has(.chara_rie_1):has(.chara_rie_2):not(:has(.chara_rie_3))"
      ).each(function () {
        $(this).find(".chara_rie_1").removeClass("hide").addClass("show");
        $(this).find(".chara_rie_2").removeClass("show").addClass("hide");
      });

      // 情況 B: chara_rie_1、chara_rie_2 和 chara_rie_3 同時存在
      $(
        ".swiper-slide:has(.chara_rie_1):has(.chara_rie_2):has(.chara_rie_3)"
      ).each(function () {
        $(this).find(".chara_rie_1").removeClass("show").addClass("hide");
        $(this).find(".chara_rie_2").removeClass("show").addClass("hide");
        $(this).find(".chara_rie_3").removeClass("hide").addClass("show");
      });

      // 人格面具不同背景顯示切換
      $(
        ".page17Swiper .page17Slider_4,.page17Swiper .page17Slider_5,.page17Swiper .page17Slider_6, .page17Swiper_2 .page17Slider_6, .page17Swiper_2 .page17Slider_7"
      ).each(function () {
        if ($(this).find(".chara_rie_3.show").length) {
          $(this).find(".role1-1-bg").removeClass("show").addClass("hide");
        } else {
          $(this).find(".role1-1-bg").removeClass("hide").addClass("show");
        }
      });


      // 三階段按鈕設定
      $(".role_change_type").removeClass("type_a type_b");

      // 其他通用設定
      $(".role_change").removeClass("on");
      $(".mark_role").removeClass("show").addClass("hide");
      $(".ch_info_box").fadeIn();
      $(".info_show_btn").fadeOut();
    }, 500);
  });


  // 切換服裝
  $(".role_change").on("click", function () {
    $(this).toggleClass("on");
    if ($(this).hasClass("on")) {
      $(this).siblings(".chara_rie_1").removeClass("show").addClass("hide");
      $(this).siblings(".chara_rie_2").removeClass("hide").addClass("show");
      $(this)
        .siblings(".ch_info_box")
        .find(".mark_role")
        .removeClass("hide")
        .addClass("show");
    } else {
      $(this).siblings(".chara_rie_1").removeClass("hide").addClass("show");
      $(this).siblings(".chara_rie_2").removeClass("show").addClass("hide");
      $(this)
        .siblings(".ch_info_box")
        .find(".mark_role")
        .removeClass("show")
        .addClass("hide");
    }
  });


  // ::::::重製有第三類型切換服裝::::::
  $(".role_change_type").on("click", function () {
    var $this = $(this);
    var currentType = $this
      .attr("class")
      .split(" ")
      .find((cls) => cls.startsWith("type_"));
    var nextType =
      currentType === "type_a"
        ? "type_b"
        : currentType === "type_b"
          ? ""
          : "type_a";

    $this.removeClass(currentType);

    if (nextType) {
      $this.addClass(nextType);
    }

    $this
      .siblings(".chara_rie_1")
      .toggleClass("show", nextType === "type_a")
      .toggleClass("hide", nextType !== "type_a");
    $this
      .siblings(".chara_rie_2")
      .toggleClass("show", nextType === "type_b")
      .toggleClass("hide", nextType !== "type_b");
    $this
      .siblings(".chara_rie_3")
      .toggleClass("show", !nextType)
      .toggleClass("hide", !!nextType);

    $this
      .siblings(".ch_info_box")
      .find(".mark_role")
      .toggleClass("show", nextType === "type_b")
      .toggleClass("hide", nextType !== "type_b");

    // 人格面具不同背景顯示切換
    var $slider = $this.closest(
      ".page17Swiper .page17Slider_4,.page17Swiper .page17Slider_5, .page17Swiper .page17Slider_6, .page17Swiper_2 .page17Slider_6, .page17Swiper_2 .page17Slider_7"
    );
    if ($slider.find(".chara_rie_3.show").length) {
      $slider.find(".role1-1-bg").removeClass("show").addClass("hide");
    } else {
      $slider.find(".role1-1-bg").removeClass("hide").addClass("show");
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

  //角色語音及背景音樂
  $(function () {
    // 获取背景音乐元素
    const musicBg = document.getElementById("bg_music");

    // 阻止多个音频同时播放
    $("audio").on("play", function () {
      $("audio")
        .not(this)
        .each(function () {
          this.pause();
          /*this.currentTime = 0;*/
        });
    });

    // 处理点击.cv_audio时的行为
    $(".cv_audio").click(function () {
      const vocalCv = $(this).find(".vocal_cv")[0]; // 获取当前.cv_audio下的.vocal_cv元素
      const wasMusicPlaying = !musicBg.paused; // 检查背景音乐是否在播放

      // 暂停其他的.vocal_cv元素
      $(".vocal_cv")
        .not(vocalCv)
        .each(function () {
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
});
